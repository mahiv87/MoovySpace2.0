import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../App';
import { useMutation } from '@apollo/client';
import { ADD_USER, FAVORITE_MOVIE } from '../../utils/mutations';

import { useAnimation, motion } from 'framer-motion';

import leftSpotLight from '../../images/leftSpotLight.png';
import rightSpotLight from '../../images/rightSpotLight.png';

import Auth from '../../utils/auth';
import './Signup.css';

export default function Signup() {
	//Grabbing the ID's of each input field to check if the user filled it out before the animation
	const userName = document.getElementById('userName');
	const password = document.getElementById('password');
	const email = document.getElementById('email');

	const favoriteMovie1 = document.getElementById('favoriteMovie1');
	const favoriteMovie2 = document.getElementById('favoriteMovie2');
	const favoriteMovie3 = document.getElementById('favoriteMovie3');

	var windowSize = window.width;

	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
		firstFavMovie: '',
		secondFavMovie: '',
		thirdFavMovie: ''
	});

	const [addUser, { error, data }] = useMutation(ADD_USER);
	const [favoriteMovie] = useMutation(FAVORITE_MOVIE);

	const searchContext = useContext(AppContext);

	// Saves movieData to favorite movies
	const handleFavoriteMovie = async (movieData) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			await favoriteMovie({
				variables: { movie: movieData }
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = async (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value
		});
	};

	// Returns both responses as movieData object
	const createDataInputObj = async (input) => {
		const { details, trailer } = await searchContext.searchMovie(formState[input]);

		let posterImage = 'https://image.tmdb.org/t/p/w500' + details.poster_path;
		let movieBackdrop = 'https://image.tmdb.org/t/p/w500' + details.backdrop_path;

		const movieId = details.id;
		const movieTitle = details.original_title;
		const movieDescription = details.overview;
		const moviePoster = details.poster_path;
		const movieTrailer = trailer;

		const movieData = {
			movieId: movieId,
			title: movieTitle,
			description: movieDescription,
			image: moviePoster,
			backdrop: movieBackdrop,
			trailer: movieTrailer
		};

		return movieData;
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await addUser({
				variables: { ...formState }
			});

			Auth.login(data.addUser.token);

			const movieData1 = await createDataInputObj('firstFavMovie');
			await handleFavoriteMovie(movieData1);
			const movieData2 = await createDataInputObj('secondFavMovie');
			await handleFavoriteMovie(movieData2);
			const movieData3 = await createDataInputObj('thirdFavMovie');
			await handleFavoriteMovie(movieData3);

			window.location.assign('/');

			console.log(data);
		} catch (e) {
			console.error(e);
		}
	};

	//Giving each function the animation state
	const leftSpotLightAnimation = useAnimation();
	const rightSpotLightAnimation = useAnimation();
	const cameraAnimation = useAnimation();
	//Initialize the animation to be off the screen
	const startLeftSpotLight = {
		hidden: {
			x: '-100vw'
		}
	};
	const startRightSpotLight = {
		hidden: {
			x: '100vw'
		}
	};

	const startCamera = {
		hidden: {
			x: '-100vw'
		}
	};

	//Functions for the animation
	async function leftSequence() {
		await leftSpotLightAnimation.start({
			x: '-20vw',
			transition: {
				//different types can be applied such as 'tween' or 'inertia'
				type: 'spring',
				stiffness: '30'
			}
		});
	}

	async function rightSequence() {
		await rightSpotLightAnimation.start({
			//Changing the x value will change the position of the spot light
			x: '10vw',
			transition: {
				//Stiffness will change how much 'springiness' is applied
				type: 'spring',
				stiffness: '30'
			}
		});
	}

	async function cameraSequence() {
		await cameraAnimation.start({
			x: '-15vw',
			transition: {
				type: 'spring',
				stiffness: '30'
			}
		});
	}
	if (userName && userName.value && email.value && password.value && windowSize > '500px') {
		leftSequence();
		rightSequence();
	}

	if (favoriteMovie1 && favoriteMovie1.value && favoriteMovie2.value && favoriteMovie3.value && windowSize > '500px') {
		cameraSequence();
	}

	return (
		<main className="form">
			<div>
				{data ? (
					<p>
						Success! You may now head <Link to="/">back to the homepage.</Link>
					</p>
				) : (
					<form onSubmit={handleFormSubmit}>
						<div className="userInfoForm">
							{/* Set each div to their variant and call the animations when called */}
							{/* Each div will have a starting position and end position with the animation being handled by the framer motion library */}
							<motion.div variants={startLeftSpotLight} animate={leftSpotLightAnimation} initial="hidden">
								<img id="leftSpotLight" src={leftSpotLight} alt={leftSpotLight} />
							</motion.div>
							<motion.div variants={startRightSpotLight} animate={rightSpotLightAnimation} initial="hidden">
								<img id="rightSpotLight" src={rightSpotLight} alt={rightSpotLight} />
							</motion.div>
							<input
								id="userName"
								className="form-input"
								placeholder="Your username"
								name="username"
								type="text"
								value={formState.name}
								onChange={handleChange}
							/>
							<input
								id="email"
								className="form-input"
								placeholder="Your email"
								name="email"
								type="email"
								value={formState.email}
								onChange={handleChange}
							/>
							<input
								id="password"
								className="form-input"
								placeholder="******"
								name="password"
								type="password"
								value={formState.password}
								onChange={handleChange}
							/>
						</div>
						<h4>Top 3 Movies</h4>
						<div className="userInfoForm">
							<motion.div variants={startCamera} animate={cameraAnimation} initial="hidden">
								<div className="loader">
									<div className="loader__container">
										<div className="loader__film">
											<img
												className="loader__film-img"
												src="https://www.dropbox.com/s/o4p5i3nfw92rhfz/film.png?raw=1"
												alt=""
											/>
											<img
												className="loader__film-img"
												src="https://www.dropbox.com/s/o4p5i3nfw92rhfz/film.png?raw=1"
												alt=""
											/>
										</div>
										<div className="camera-body">
											<img
												className="loader__camera"
												src="https://www.dropbox.com/s/348z6yvtt9hbos2/camera.png?raw=1"
												alt=""
											/>
										</div>
									</div>
								</div>
							</motion.div>
							<input
								id="favoriteMovie1"
								className="form-input"
								placeholder="Ex: The Other Guys"
								name="firstFavMovie"
								type="text"
								value={formState.firstFavMovie}
								onChange={handleChange}
							/>
							<input
								id="favoriteMovie2"
								className="form-input"
								placeholder="Ex: Forrest Gump"
								name="secondFavMovie"
								type="text"
								value={formState.secondFavMovie}
								onChange={handleChange}
							/>
							<input
								id="favoriteMovie3"
								className="form-input"
								placeholder="Ex: Cars"
								name="thirdFavMovie"
								type="text"
								value={formState.thirdFavMovie}
								onChange={handleChange}
							/>
						</div>
						<div className="signUp">
							<button id="action-btn" className="btn btn-block btn-primary" style={{ cursor: 'pointer' }} type="submit">
								Action! 🎥
							</button>
						</div>
					</form>
				)}
			</div>
		</main>
	);
}
