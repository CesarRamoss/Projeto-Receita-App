import React, { useContext, useEffect } from 'react';
import '../css/Main.css';
import { Redirect, useHistory } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import { filterByDrinkName } from '../services/DrinksAPI';

const Drinks = () => {
  const LENGTH_ARRAY = 12;
  const history = useHistory();
  const { searchValues, setsearchValues, explore, setexplore } = useContext(MyContext);

  const renderInitialDrinks = async () => {
    const result = await filterByDrinkName('');
    setsearchValues(result);
  };

  useEffect(() => {
    if (explore !== 'drink')renderInitialDrinks();
    setexplore('');
  }, []);

  return (
    <div>
      <div className="header_group">
        <Header title="Drinks" search />
        <Buttons />
      </div>
      {searchValues != null && searchValues.length === 1
      && <Redirect to={ `/drinks/${searchValues[0].idDrink}` } />}
      <div className="card">
        {searchValues != null && searchValues.length > 1
    && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
      <div key={ card.idDrink } className="card_main">

        <input
          className="card_img"
          type="image"
          src={ card.strDrinkThumb }
          alt={ card.strDrink }
          data-testid={ `${index}-card-img` }
          onClick={ () => history.push(`/drinks/${card.idDrink}`) }
        />
        <p className="card_text">{card.strDrink}</p>
      </div>
    ))}
        {searchValues === '' && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
          <div key={ card.idDrink } data-testid={ `${index}-recipe-card` }>

            <input
              className="card_img"
              type="image"
              src={ card.strDrinkThumb }
              alt={ card.strDrink }
              data-testid={ `${index}-card-img` }
              onClick={ () => history.push(`/drinks/${card.idDrink}`) }
            />
            <p className="card_text">{card.strDrink}</p>
          </div>
        ))}
      </div>
      {searchValues === null
    && global.alert('Sorry, we haven\'t found any recipes for these filters.')}
      <Footer />
    </div>
  );
};

export default Drinks;
