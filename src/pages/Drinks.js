import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

const Drinks = () => {
  const LENGTH_ARRAY = 12;
  const { searchValues } = useContext(MyContext);
  return (
    <div>
      <Header title="Drinks" search />
      {searchValues != null && searchValues.length === 1
      && <Redirect to={ `/drinks/${searchValues[0].idDrink}` } />}

      {searchValues != null && searchValues.length > 1
    && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
      <div key={ card.idDrink } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{card.strDrink}</p>
        <img
          src={ card.strDrinkThumb }
          alt={ card.strDrink }
          data-testid={ `${index}-card-img` }
        />
      </div>
    ))}

      {searchValues === null
    && global.alert('Sorry, we haven\'t found any recipes for these filters.')}
    </div>
  );
};

export default Drinks;
