import React, { useContext, useState } from 'react';
import './SearchBar.css';
import { AppContext } from '../../App';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { top100Films } from '../../utils/constants';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Handler for input changes to the search form
const SearchBar = (props) => {
  const { errors, setAPIErrors } = props;
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

  const [search, setSearch] = useState('');
  const [titleOptions, setTitleOptions] = useState(
    top100Films.map((option) => option.title)
  );

  const findTitles = (query) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then((response) => {
        let newTitleOptions = response.data.results.map(
          (option) => option.original_title
        );
        setTitleOptions(newTitleOptions);
      });
  };

  const searchContext = useContext(AppContext);

  const handleInputChange = (e) => {
    if (e.target.value) {
      setSearch(e.target.value);
    }
  };

  const resetTitles = top100Films.map((option) => option.title);

  const handleSelect = (e) => setSearch(e.target.value);

  const handleTitleSuggestion = (e) => {
    if (e.target.value !== '' && e.target.value.length >= 3) {
      setSearch(e.target.value);
      findTitles(e.target.value);
    } else {
      setTitleOptions(resetTitles);
    }
  };

  // Handler for what happens when the search form is submitted
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAPIErrors(null);
    await searchContext.searchMovie(search);
  };

  return (
    <div>
      <form id="searchArea">
        <Autocomplete
          id="searchBar"
          onChange={handleInputChange}
          freeSolo
          style={{ color: 'white' }}
          options={titleOptions}
          onSelect={handleSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              id="searchBox"
              label="Search For A Movie..."
              style={{ color: 'white' }}
              onChange={handleTitleSuggestion}
              value={search}
            />
          )}
        />
        {errors && <p style={{ color: 'red' }}>{errors}</p>}
        <button id="searchBtn" onClick={handleFormSubmit}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
