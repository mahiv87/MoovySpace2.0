import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($movie: inputMovie!) {
    saveMovie(movie: $movie) {
      _id
      username
      email
      savedMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
      likedMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
      favoriteMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
    }
  }
`;

export const LIKE_MOVIE = gql`
  mutation likeMovie($movie: inputMovie!) {
    likeMovie(movie: $movie) {
      _id
      username
      email
      savedMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
      likedMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
      favoriteMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
    }
  }
`;
export const FAVORITE_MOVIE = gql`
  mutation favoriteMovie($movie: inputMovie!) {
    favoriteMovie(movie: $movie) {
      _id
      username
      email
      favoriteMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: Int!) {
    removeMovie(movieId: $movieId) {
      username
      email
      savedMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
    }
  }
`;
export const UNLIKE_MOVIE = gql`
  mutation unlikeMovie($movieId: Int!) {
    unlikeMovie(movieId: $movieId) {
      username
      email
      likedMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
    }
  }
`;
export const UNFAVORITE_MOVIE = gql`
  mutation unfavoriteMovie($movieId: Int!) {
    unfavoriteMovie(movieId: $movieId) {
      username
      email
      favoriteMovies {
        movieId
        title
        description
        image
        backdrop
        trailer
        createdAt
      }
    }
  }
`;
