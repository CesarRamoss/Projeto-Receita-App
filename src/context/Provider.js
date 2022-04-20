import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const Provider = ({ children }) => {
  const [searchValues, setsearchValues] = useState([]);
  const [doneRecipes, setdoneRecipes] = useState([]);
  const [favoriteRecipes, setfavoriteRecipes] = useState([]);
  const [recipeinprogress, setrecipeinprogress] = useState([]);
  const value = {
    searchValues,
    setsearchValues,
    doneRecipes,
    setdoneRecipes,
    recipeinprogress,
    setrecipeinprogress,
    favoriteRecipes,
    setfavoriteRecipes,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>);
};

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default Provider;
