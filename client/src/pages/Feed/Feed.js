import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MOVIE_FEED } from '../../utils/queries';
import { Link } from 'react-router-dom';
import './feed.scss';

const feedStyles = {
  gridContainer: {
    justifyItems: 'center',
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: '1fr',
  },
  gridItem: {
    display: 'grid',
    position: 'relative',
    backgroundColor: 'var(--color-bg-variant)',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '1rem',
  },
  gridImage: {
    borderRadius: '.5rem',
    border: '1px solid #ddd',
    padding: '5px',
    maxWidth: '50%',
    height: 'auto',
  },
};

const Feed = () => {
  const { loading, data } = useQuery(QUERY_MOVIE_FEED);
  const users = data?.users || [];

  return (
    <>
      <h1 className="moovySpace">MoovySpace</h1>
      <p className="recentText">Recent Activity</p>
      <div className="feedGridContainer" style={feedStyles.gridContainer}>
        {loading ? (
          <div className="loader">
            <div className="loader__filmstrip"></div>
            <p className="loader__text">loading</p>
          </div>
        ) : (
          users.map((user) => {
            if (user.savedMovies.length) {
              return (
                <div className="reel">
                  <div className="movie_card_feed single">
                    <div className="info_section">
                      <div className="movie_header">
                        <img
                          className="locandina"
                          src={`https://image.tmdb.org/t/p/w300${
                            user.savedMovies.at(-1).image
                          }`}
                        />
                        <h1 id="movieTitle">{user.savedMovies.at(-1).title}</h1>
                        <div id="movieUser">
                          <Link to={`/profiles/${user.username}`}>
                            {' '}
                            {user.username}{' '}
                          </Link>{' '}
                          <p className="userText">
                            {' '}
                            recently saved{' '}
                            <strong>
                              {user.savedMovies.at(-1).title}
                            </strong> and {user.savedMovies.length - 1} other
                            movies to their collection{' '}
                          </p>
                        </div>
                      </div>
                      <div className="movie_desc">
                        <p className="description">
                          {user.savedMovies.at(-1).description}
                        </p>
                        <a
                          href={`https://www.youtube.com/watch?v=${
                            user.savedMovies.at(-1).trailer
                          }`}
                          target="_blank"
                          rel="noreferrer"
                          className="trailerBtn"
                        >
                          {' '}
                          Watch the trailer on Youtube!
                        </a>
                      </div>
                      <div className="movie_social">
                        <ul>
                          <li id="createdAt">
                            {user.savedMovies.at(-1).createdAt}{' '}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <img
                      className="blur_back"
                      src={`https://image.tmdb.org/t/p/original${
                        user.savedMovies.at(-1).backdrop
                      }`}
                    ></img>
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>
    </>
  );
};

export default Feed;
