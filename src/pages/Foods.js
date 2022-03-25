import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

const Foods = () => {
  const LENGTH_ARRAY = 12;
  const { searchValues } = useContext(MyContext);

  return (
    <div>
      <Header title="Foods" search />
      {searchValues != null && searchValues.length === 1
    && <Redirect to={ `/foods/${searchValues[0].idMeal}` } />}

      {searchValues != null && searchValues.length > 1
    && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
      <div key={ card.idMeal } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{card.strMeal}</p>
        <img
          src={ card.strMealThumb }
          alt={ card.strMeal }
          data-testid={ `${index}-card-img` }
        />
      </div>
    ))}

      {searchValues === null
    && global.alert('Sorry, we haven\'t found any recipes for these filters.')}
    </div>
  );
};

export default Foods;
