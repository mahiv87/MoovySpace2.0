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
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5"></div>

        <div className="">
          {user.favoriteMovies.length > 0 ? (
            <FavoriteMovies favoriteMovies={user.favoriteMovies} />
          ) : (
            <div className="errorMessage">
              <h2>Add your favorite movies to view them here!</h2>
            </div>
          )}

          {user.likedMovies.length > 0 ? (
            <LikedMovies likedMovies={user.likedMovies} />
          ) : (
            <div className="errorMessage">
              <h2>Like some movies, you delinquent!</h2>
            </div>
          )}

          {user.savedMovies.length > 0 ? (
            <WatchListMovies savedMovies={user.savedMovies} />
          ) : (
            <div className="errorMessage">
              <h2>Watch something, scoundrel!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
