import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
// import FavoriteMovies from '../components/FavoriteMovies';

const Profile = () => {
	// const [savedMovies, setSavedMovies] = useState([])

	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME);

	const user = data?.me || data?.user || {};

	console.log(user);

	// const movieData = user.savedMovies.map((movie) => ({
	// 	movieId: movie.movieId,
	// 	title: movie.title,
	// 	description: movie.description,
	// 	image: `https://image.tmdb.org/t/p/w500${movie.image}`,
	// 	trailer: movie.trailer
	// }));

	// setSavedMovies(movieData)

	// console.log(movieData);

	// navigate to personal profile page if username is yours
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Navigate to="/profile" />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user?.username) {
		return <h4>You need to be logged in to see this. Use the navigation links above to sign up or log in!</h4>;
	}

	return (
		<div>
			<div className="flex-row justify-center mb-3">
				<h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
					Viewing {userParam ? `${user.username}'s` : 'your'} profile.
				</h2>

				<div className="col-12 col-md-10 mb-5"></div>
				{!userParam && (
					<div className="profileContainer">
						<h1>Favorite Movies</h1>
						{/* <div className="carousel">
							
							{user.favoriteMovies.map((favorite) => (
								<div className="movieCard">
								<div className="moviePoster">
									<img
										alt="movie poster"
										src={`https://image.tmdb.org/t/p/w500${favorite.image}`}
										width="200px"
									/>
								</div>
								<h1 className="movieTitle">{favorite.title}</h1>
							</div>
						))}
						</div> */}
						{/* <FavoriteMovies favoriteMovies={user.favoriteMovies}  /> */}

						<h1>Liked Movies</h1>
						<div className="carousel">
							{user.likedMovies.map((liked) => (
								<div className="movieCard" key={liked.title}>
									<div className="moviePoster">
										<img
											alt="movie poster"
											src={`https://image.tmdb.org/t/p/w500${liked.image}`}
											width="200px"
										/>
									</div>
									<h1 className="movieTitle">{liked.title}</h1>
								</div>
							))}
						</div>

						<h1>Saved Movies</h1>
						<div className="carousel">
							{user.savedMovies.map((movie) => (
								<div className="movieCard" key={movie.title}>
									<div className="moviePoster">
										<img
											alt="movie poster"
											src={`https://image.tmdb.org/t/p/w500${movie.image}`}
											width="200px"
										/>
									</div>
									<h1 className="movieTitle">{movie.title}</h1>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
