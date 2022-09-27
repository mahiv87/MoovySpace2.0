import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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

export const QUERY_ME = gql`
  query me {
    me {
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

export const QUERY_MOVIE_FEED = gql`
  query users {
    users {
      _id
      username
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
