import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';

import './index.scss';
let backdrop1;
let backdrop2;
let backdrop3;

function FavoriteMovies(props) {
  const { favoriteMovies } = props;

  const defaultBackGround =
    'https://image.tmdb.org/t/p/original' + favoriteMovies[2].backdrop;

  const handleBackground = (e) => {
    backdrop1 =
      'https://image.tmdb.org/t/p/original' + favoriteMovies[0].backdrop;
    backdrop2 =
      'https://image.tmdb.org/t/p/original' + favoriteMovies[1].backdrop;
    backdrop3 =
      'https://image.tmdb.org/t/p/original' + favoriteMovies[2].backdrop;

    if (e.target.id === 'item1') {
      if (favoriteMovies[0].backdrop) {
        document.getElementById(
          'backdrop'
        ).style.cssText += `background-image:url(${backdrop1})`;
      } else {
        document.getElementById('backdrop').style.backgroundColor = 'red';
      }
    } else if (e.target.id === 'item2') {
      if (favoriteMovies[1].backdrop) {
        document.getElementById(
          'backdrop'
        ).style.cssText += `background-image:url(${backdrop2})`;
      } else {
        document.getElementById('backdrop').style.backgroundColor = 'blue';
      }
    } else if (e.target.id === 'item3') {
      if (favoriteMovies[2].backdrop) {
        document.getElementById(
          'backdrop'
        ).style.cssText += `background-image:url(${backdrop3})`;
      } else {
        document.getElementById('backdrop').style.backgroundColor = 'green';
      }
    }
  };

  return (
    <section
      className="projectSection"
      id="backdrop"
      style={{ backgroundImage: `url(${defaultBackGround})` }}
    >
      <div className="posterContainer">
        <input
          type="radio"
          name="slider"
          id="item1"
          onClick={handleBackground}
          defaultChecked
        ></input>
        <input
          type="radio"
          name="slider"
          id="item2"
          onClick={handleBackground}
          defaultChecked
        ></input>
        <input
          type="radio"
          name="slider"
          id="item3"
          onClick={handleBackground}
          defaultChecked
        ></input>
        <div className="cards">
          <label className="card" htmlFor="item1" id="project1">
            <img
              src={`https://image.tmdb.org/t/p/w500${favoriteMovies[0].image}`}
              alt={favoriteMovies[0].title}
            ></img>
          </label>
          <label className="card" htmlFor="item2" id="project2">
            <img
              src={`https://image.tmdb.org/t/p/w500${favoriteMovies[1].image}`}
              alt={favoriteMovies[1].title}
            ></img>
          </label>
          <label className="card" htmlFor="item3" id="project3">
            <img
              src={`https://image.tmdb.org/t/p/w500${favoriteMovies[2].image}`}
              alt={favoriteMovies[2].title}
            ></img>
          </label>
        </div>
        <div className="infoContainer" id="infoContainer">
          <div className="upperpart">
            <div className="infoarea" id="test">
              <label className="projectinfo" id="projectinfo1">
                <div className="title">{favoriteMovies[0].title}</div>
                <div className="subline">
                  <div className="liveLink">
                    <a
                      href={`https://www.youtube.com/watch?v=${favoriteMovies[0].trailer}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch {favoriteMovies[0].title} Trailer
                    </a>
                  </div>
                  <VideocamIcon className="cameraIcon" />
                </div>
              </label>
              <label className="projectinfo" id="projectinfo2">
                <div className="title">{favoriteMovies[1].title}</div>
                <div className="subline">
                  <div className="liveLink">
                    <a
                      href={`https://www.youtube.com/watch?v=${favoriteMovies[1].trailer}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch {favoriteMovies[1].title} Trailer
                    </a>
                  </div>
                  <VideocamIcon className="cameraIcon" />
                </div>
              </label>
              <label className="projectinfo" id="projectinfo3">
                <div className="title">{favoriteMovies[2].title}</div>
                <div className="subline">
                  <div className="liveLink">
                    <a
                      href={`https://www.youtube.com/watch?v=${favoriteMovies[2].trailer}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch {favoriteMovies[2].title} Trailer
                    </a>
                  </div>
                  <VideocamIcon className="cameraIcon" />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FavoriteMovies;
