import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import { filterByIngredient, filterByLetter, filterByName } from '../services/MealsAPI';

const Header = ({ title, search }) => {
  const history = useHistory();
  const [displaySearch, setdisplaySearch] = useState(false);
  const [itemCheck, setitemCheck] = useState('');
  const [inputText, setinputText] = useState('');

  const toggleSearch = () => (setdisplaySearch(!displaySearch));

  const verifyCheck = ({ target }) => {
    setitemCheck(target.id);
  };

  const inputName = ({ target }) => (setinputText(target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (itemCheck) {
    case 'ingredient':
      filterByIngredient(inputText);
      break;
    case 'name':
      filterByName(inputText);
      break;
    case 'letter':
      return inputText.length === 1
        ? filterByLetter(inputText)
        : global.alert('Your search must have only 1 (one) character');

    default:
      // console.log('');
    }
  };

  return (
    <div>
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      />
      <span data-testid="page-title">{title}</span>
      {search
        ? (
          <input
            type="image"
            src={ SearchIcon }
            alt="profile"
            data-testid="search-top-btn"
            onClick={ toggleSearch }
          />) : null}
      {displaySearch
      && (
        <div>
          <form onSubmit={ handleSubmit }>
            <input type="text" data-testid="search-input" onChange={ inputName } />
            <label htmlFor="ingredient">
              <input
                name="food"
                id="ingredient"
                type="radio"
                data-testid="ingredient-search-radio"
                required="required"
                onClick={ verifyCheck }
              />
              Ingredient
            </label>
            <label htmlFor="name">
              <input
                name="food"
                id="name"
                type="radio"
                data-testid="name-search-radio"
                onClick={ verifyCheck }
              />
              Name
            </label>
            <label htmlFor="letter">
              <input
                name="food"
                id="letter"
                type="radio"
                data-testid="first-letter-search-radio"
                onClick={ verifyCheck }
              />
              First letter
            </label>
            <button type="submit" data-testid="exec-search-btn">Search</button>
          </form>
        </div>)}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;
export default Header;
