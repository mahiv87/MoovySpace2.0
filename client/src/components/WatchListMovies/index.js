import React, { useState, useEffect } from 'react';
import './index.scss';
import Carousel from '../WatchedCarousel';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function WatchListMovies(props) {
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  const [currentWidth, setCurrentWidth] = useState(
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    //Looking at the width of the users view port
  );

  const [count, setCount] = useState(currentWidth > 800 ? 5 : 3);

  const [iterable, setIterable] = useState(
    new Array(Math.ceil(user.savedMovies.length / count))
  );

  const [watchedSection, setWatchedSection] = useState(1);
  const handleNav = (dest) => {
    setWatchedSection(dest);
  };

  const handleResize = () => {
    setCurrentWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);
  //This is constantly looking for the width and setting it
  //After it is set, it will useEffect

  useEffect(() => {
    if (currentWidth > 800) {
      //5 cards in carousel
      setCount(5);
    } else if (currentWidth > 600) {
      //4 cards in carousel
      setCount(4);
    } else if (currentWidth > 500) {
      //3 cards in carousel
      setCount(3);
    } else if (currentWidth > 400) {
      setCount(2);
    }
    setIterable(new Array(Math.ceil(user.savedMovies.length / count)).fill(0));
  }, [currentWidth]);
  //Constantly looking at the width of the users view port
  //And adjusting the cards count in the carousel

  return (
    <div className="watchWrapper">
      {iterable.map((element, i) => (
        <div key={uuidv4()} id={`watchSection${i + 1}`}>
          {i === 0 && (
            <section key={uuidv4()}>
              <a
                href={`#watchSection${iterable.length - 1}`}
                onClick={() => handleNav(iterable.length - 1)}
              >
                <ArrowBackIosIcon />
              </a>
              {user.savedMovies.map(
                (item, j) =>
                  j < count * (i + 1) &&
                  j >= count * i && <Carousel key={uuidv4()} item={item} />
              )}
              <a
                href={`#watchSection${i + 2}`}
                onClick={() => handleNav(i + 2)}
              >
                <ArrowForwardIosIcon />
              </a>
            </section>
          )}

          {i === iterable.length - 1 && i !== 0 && (
            <section key={uuidv4()}>
              <a href={`#watchSection${i}`} onClick={() => handleNav(i)}>
                <ArrowBackIosIcon />
              </a>
              {user.savedMovies.map(
                (item, j) =>
                  j < count * (i + 1) &&
                  j >= count * i && <Carousel key={uuidv4()} item={item} />
              )}
              <a href="#watchSection1" onClick={() => handleNav(1)}>
                <ArrowForwardIosIcon />
              </a>
            </section>
          )}

          {i !== iterable.length - 1 && i !== 0 && (
            <section key={uuidv4()}>
              <a href={`#watchSection${i}`} onClick={() => handleNav(i)}>
                <ArrowBackIosIcon />
              </a>
              {user.savedMovies.map(
                (item, j) =>
                  j < count * (i + 1) &&
                  j >= count * i && <Carousel key={uuidv4()} item={item} />
              )}
              <a
                href={`#watchSection${i + 2}`}
                onClick={() => handleNav(i + 2)}
              >
                <ArrowForwardIosIcon />
              </a>
            </section>
          )}
        </div>
      ))}
    </div>
  );
}

export default WatchListMovies;
