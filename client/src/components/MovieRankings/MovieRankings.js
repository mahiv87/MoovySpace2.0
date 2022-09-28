import React, { useState, useEffect } from 'react';
import './MovieRankings.css';
import { AppContext } from '../../App';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
// Update to grab actual mutations for movie rankings
import { ADD_USER, FAVORITE_MOVIE } from '../../utils/mutations';

const MovieRankings = () => {};

export default MovieRankings;
