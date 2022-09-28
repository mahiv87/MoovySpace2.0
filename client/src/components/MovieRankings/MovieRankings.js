import React, { useState, useEffect } from 'react';
import './MovieRankings.css';
import { AppContext } from '../../App';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
// Update to grab actual mutations for movie rankings
import { ADD_USER, FAVORITE_MOVIE } from '../../utils/mutations';
import rater from 'rater-js';

const MovieRankings = () => {
  var myRating = rater({
    max: 5,
    starSize: 16,
    ratingText: '{rating}/{maxRating}',
    step: undefined,
    element: document.querySelector('#rater'),
    rateCallback: function rateCallback(rating, done) {
      this.setRating(rating);
      done();
    },
  });
  return <div id="rater"></div>;
};

export default MovieRankings;
