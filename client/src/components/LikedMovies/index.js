import React, { useState, useEffect } from 'react';
import './index.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import Carousel from '../LikedCarousel';

function LikedMovies(props) {
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const { likedMovies } = props;
  console.log('hello');

  const [currentWidth, setCurrentWidth] = useState(
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    //Looking at the width of the users view port
  );

  const [count, setCount] = useState(currentWidth > 800 ? 5 : 3);

  const [iterable, setIterable] = useState(
    new Array(Math.ceil(user.likedMovies.length / count))
  );

  const handleResize = () => {
    setCurrentWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);
  //This is constantly looking for the width and setting it
  //After it is set, it will useEffect

  useEffect(() => {
    let newCount = 1; // num cards in carousel
    if (currentWidth > 800) {
      newCount = 5;
    } else if (currentWidth > 600) {
      newCount = 4;
    } else if (currentWidth > 500) {
      newCount = 3;
    } else if (currentWidth > 400) {
      newCount = 2;
    }
    setCount(newCount);
    setIterable(
      new Array(Math.ceil(user.likedMovies.length / newCount)).fill(0)
    );
  }, [currentWidth]);
  //Constantly looking at the width of the users view port
  //And adjusting the cards count in the carousel

  return (
    <div className="likedWrapper">
      {iterable.map((element, i) => (
        <div key={uuidv4()} id={`likedSection${i + 1}`}>
          {i === 0 && (
            <section key={uuidv4()}>
              <a href={`#likedSection${iterable.length - 1}`}>
                <ArrowBackIosIcon />
              </a>
              {likedMovies.map(
                (item, j) =>
                  j < count * (i + 1) &&
                  j >= count * i && <Carousel key={uuidv4()} item={item} />
              )}
              <a href={`#likedSection${i + 2}`}>
                <ArrowForwardIosIcon />
              </a>
            </section>
          )}

          {i === iterable.length - 1 && i !== 0 && (
            <section key={uuidv4()}>
              <a href={`#likedSection${i}`}>
                <ArrowBackIosIcon />
              </a>
              {likedMovies.map(
                (item, j) =>
                  j < count * (i + 1) &&
                  j >= count * i && <Carousel key={uuidv4()} item={item} />
              )}
              <a href="#likedSection1">
                <ArrowForwardIosIcon />
              </a>
            </section>
          )}

          {i !== iterable.length - 1 && i !== 0 && (
            <section key={uuidv4()}>
              <a href={`#likedSection${i}`}>
                <ArrowBackIosIcon />
              </a>
              {likedMovies.map(
                (item, j) =>
                  j < count * (i + 1) &&
                  j >= count * i && <Carousel key={uuidv4()} item={item} />
              )}
              <a href={`#likedSection${i + 2}`}>
                <ArrowForwardIosIcon />
              </a>
            </section>
          )}
        </div>
      ))}
    </div>
  );
}

export default LikedMovies;
