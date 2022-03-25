import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const Provider = ({ children }) => {
  const [searchValues, setsearchValues] = useState([]);
  const value = {
    searchValues,
    setsearchValues,
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
