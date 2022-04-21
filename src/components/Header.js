import React, { useContext, useState } from 'react';
import '../css/Header.css';
import 'animate.css';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';
import profileIcon from '../images/profile.png';
import Book from '../images/book.png';
import SearchIcon from '../images/search.png';
import { filterByIngredient, filterByLetter, filterByName } from '../services/MealsAPI';
import { filterByDrinkIngredient,
  filterByDrinkLetter, filterByDrinkName } from '../services/DrinksAPI';
import MyContext from '../context/MyContext';

/* eslint-disable  */
const Header = ({ title, search, icon }) => {
  const { setsearchValues } = useContext(MyContext);
  const { url } = useRouteMatch();
  const history = useHistory();
  const [displaySearch, setdisplaySearch] = useState(false);
  const [itemCheck, setitemCheck] = useState('');
  const [inputText, setinputText] = useState('');

  const toggleSearch = () => (setdisplaySearch(!displaySearch));

  const verifyCheck = ({ target }) => {
    setitemCheck(target.id);
  };

  const filter = async (func, input) => {
    const result = await func(input);
    setsearchValues(result);
  };

  const switchFoods = () => {
    switch (itemCheck) {
    case 'ingredient':
      return filter(filterByIngredient, inputText);

    case 'name':
      return filter(filterByName, inputText);

    case 'letter':
      return inputText.length === 1
        ? filter(filterByLetter, inputText)
        : global.alert('Your search must have only 1 (one) character');

    default:
      // console.log('');
    }
  };
  /* eslint-disable  */

  const switchDrinks = () => {
    switch (itemCheck) {
    case 'ingredient':
      return filter(filterByDrinkIngredient, inputText);

    case 'name':
      return filter(filterByDrinkName, inputText);

    case 'letter':
      return inputText.length === 1
        ? filter(filterByDrinkLetter, inputText)
        : global.alert('Your search must have only 1 (one) character');

    default:
              // console.log('');
    }
  };

  const inputName = ({ target }) => (setinputText(target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.includes('foods')) {
      switchFoods();
    } else {
      switchDrinks();
    }
  };

  return (
    <>
      <div className="header">
        <input
          type="image"
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
        />
        <span data-testid="page-title">{title}</span>
        {icon ? <img          
          src={ Book }
          alt="profile"
        /> : null}

        {search
          ? (
            <input            
              type="image"
              src={ SearchIcon }
              alt="profile"
              data-testid="search-top-btn"
              onClick={ toggleSearch }
            />) : null}
      </div>
      {displaySearch
      && (
        <div className="input_search animate__animated animate__fadeIn">
          <form onSubmit={ handleSubmit }>
            <input
              type="text"
              placeholder="Type your search"
              className="form_search"
              onChange={ inputName }
            />
            <div className="inputs_form">
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
            </div>
          </form>
        </div>)}
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
  icon: PropTypes.icon,
}.isRequired;
export default Header;
