export const getSavedMovieIds = () => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : [];

  return savedMovieIds;
};

export const saveMovieIds = (movieIdArr) => {
  if (movieIdArr.length) {
    localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('saved_movies');
  }
};

export const removeMovieId = (movieId) => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : null;

  if (!savedMovieIds) {
    return false;
  }

  const updatedSavedMovieIds = savedMovieIds?.filter(
    (savedMovieId) => savedMovieId !== movieId
  );
  localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));

  return true;
};

export const getLikedMovieIds = () => {
  const likedMovieIds = localStorage.getItem('liked_movies')
    ? JSON.parse(localStorage.getItem('liked_movies'))
    : [];

  return likedMovieIds;
};

export const likeMovieIds = (movieIdArr) => {
  if (movieIdArr.length) {
    localStorage.setItem('liked_movies', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('liked_movies');
  }
};

export const removeLikedMovieId = (movieId) => {
  const likedMovieIds = localStorage.getItem('liked_movies')
    ? JSON.parse(localStorage.getItem('liked_movies'))
    : null;

  if (!likedMovieIds) {
    return false;
  }

  const updatedLikedMovieIds = likedMovieIds?.filter(
    (likedMovieId) => likedMovieId !== movieId
  );
  localStorage.setItem('liked_movies', JSON.stringify(updatedLikedMovieIds));

  return true;
};
