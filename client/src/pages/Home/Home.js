import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AppContext } from '../../App';
import './mainPage.scss';
import Trailer from '../../components/Trailer/Trailer.js';
import { LIKE_MOVIE, SAVE_MOVIE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { getSavedMovieIds, getLikedMovieIds } from '../../utils/localStorage';

const Home = () => {
  const [saveMovie] = useMutation(SAVE_MOVIE);
  const [likeMovie] = useMutation(LIKE_MOVIE);
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  const [likedMovieIds, setLikedMovieIds] = useState(getLikedMovieIds());

  const searchContext = useContext(AppContext);
  let posterImage =
    'https://image.tmdb.org/t/p/w500' + searchContext.details.poster_path;
  let movieBackdrop =
    'https://image.tmdb.org/t/p/w500' + searchContext.details.backdrop_path;

  const movieId = searchContext.details.id;
  const movieTitle = searchContext.details.original_title;
  const movieDescription = searchContext.details.overview;
  const moviePoster = searchContext.details.poster_path;
  const movieTrailer = searchContext.trailer;

  const movieData = {
    movieId: movieId,
    title: movieTitle,
    description: movieDescription,
    image: moviePoster,
    backdrop: movieBackdrop,
    trailer: movieTrailer,
  };

  const handleSaveMovie = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveMovie({
        variables: { movie: movieData },
        update(cache, { data: { saveMovie } }) {
          try {
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: saveMovie },
            });
          } catch (err) {
            console.error(err);
          }
        },
      });
      setSavedMovieIds([...savedMovieIds, movieData.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikeMovie = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await likeMovie({
        variables: { movie: movieData },
        update(cache, { data: { likeMovie } }) {
          try {
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: likeMovie },
            });
          } catch (err) {
            console.error(err);
          }
        },
      });
      setLikedMovieIds([...likedMovieIds, movieData.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="movieContainer">
      <div>
        <div className="movie_card single">
          <div className="info_section">
            <div className="movie_header">
              <img className="locandina" src={posterImage} />
              <h1 id="movieTitle">{searchContext.details.title}</h1>
              <p className="text">{searchContext.details.overview}</p>
              {Auth.loggedIn() && (
                <div>
                  <button
                    disabled={savedMovieIds?.some(
                      (savedMovieId) => savedMovieId === movieData.movieId
                    )}
                    onClick={handleSaveMovie}
                    className="btn btn-primary"
                  >
                    {savedMovieIds?.some(
                      (savedMovieId) => savedMovieId === movieData.movieId
                    )
                      ? 'This movie has been add to your Watch List!'
                      : 'Add to Watch List'}
                  </button>
                  <button
                    disabled={likedMovieIds?.some(
                      (likedMovieId) => likedMovieId === movieData.movieId
                    )}
                    onClick={handleLikeMovie}
                    className="btn btn-primary"
                  >
                    {likedMovieIds?.some(
                      (likedMovieId) => likedMovieId === movieData.movieId
                    )
                      ? 'This movie has been liked!'
                      : 'Like Movie'}
                  </button>
                </div>
              )}
            </div>
            <div className="movie_desc">
              <div className="trailerContainer">
                {searchContext.trailer ? (
                  <Trailer
                    className="trailer"
                    embedId={searchContext.trailer}
                  />
                ) : (
                  <p> VIDEO TRAILER IS NOT AVAILABLE</p>
                )}
              </div>
            </div>
          </div>
          <img className="blur_back" src={movieBackdrop}></img>
        </div>
      </div>
    </main>
  );
};

export default Home;

{
  /* <div id="moviePoster">
				<img src={posterImage} alt="Movie Poster" />
			</div>
			<div className="movieDetails">
				<h1>{searchContext.details.title}</h1>
				<p>{searchContext.details.overview}</p>
				<div className="trailerContainer">
					{searchContext.trailer ? (
						<Trailer className="trailer" embedId={searchContext.trailer} />
					) : (
						<p> VIDEO TRAILER IS NOT AVAILABLE</p>
					)}
				</div> */
}
