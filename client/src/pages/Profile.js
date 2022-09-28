import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import FavoriteMovies from '../components/FavoriteMovies';
import LikedMovies from '../components/LikedMovies';
import WatchListMovies from '../components/WatchListMovies';
import './profile.css';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }
  if (loading) {
    return (
      <div className="loader">
        <div className="loader__filmstrip"></div>
        <p className="loader__text">loading</p>
      </div>
    );
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links below to
        sign up or log in!
      </h4>
    );
  }

  console.log(user);
  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2
          className="col-12 col-md-10 bg-dark text-light p-3 mb-5"
          id="profile-header"
        >
          {userParam
            ? `You're on ${user.username}'s profile`
            : `Your top movie picks`}
        </h2>
        <div className="col-12 col-md-10 mb-5"></div>
        <div>
          {user.favoriteMovies.length > 0 ? (
            <FavoriteMovies favoriteMovies={user.favoriteMovies} />
          ) : (
            <div className="errorMessage">
              <h2>Other users favorite movies coming...</h2>
            </div>
          )}

          {user.likedMovies.length > 0 ? (
            <div>
              <LikedMovies likedMovies={user.likedMovies}></LikedMovies>
              <h2 className="movie-headers">Liked Movies</h2>
            </div>
          ) : (
            <div className="errorMessage"></div>
          )}

          {user.savedMovies.length > 0 ? (
            <div>
              <WatchListMovies savedMovies={user.savedMovies} />
              <h2 className="movie-headers">Watch Later Movies</h2>
            </div>
          ) : (
            <div className="errorMessage"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
