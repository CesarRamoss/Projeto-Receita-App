import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import { filterByName } from '../services/MealsAPI';

const Foods = () => {
  const LENGTH_ARRAY = 12;
  const { searchValues, setsearchValues } = useContext(MyContext);

  const renderInitialFoods = async () => {
    const result = await filterByName('');
    setsearchValues(result);
  };

  useEffect(() => {
    renderInitialFoods();
  }, []);

  return (
    <div>
      <Header title="Foods" search />
      {searchValues != null && searchValues.length === 1
    && <Redirect to={ `/foods/${searchValues[0].idMeal}` } />}
      <Buttons />

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

      {searchValues === ''
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
      <Footer />
    </div>
  );
};

export default Foods;
