import React from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const Provider = ({ children }) => {
  const value = {};

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>);
};

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default Provider;
