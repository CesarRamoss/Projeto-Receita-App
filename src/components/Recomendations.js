import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { filterByDrinkName } from '../services/DrinksAPI';
import { filterByName } from '../services/MealsAPI';

const Recomendations = () => {
  const MAX_CARROUSEL = 6;
  const { url } = useRouteMatch();
  const [recomended, setrecomended] = useState([]);

  const recomendedFoods = async () => {
    const result = await filterByName('');
    setrecomended(result);
  };

  const renderButtonsDrink = async () => {
    const result = await filterByDrinkName('');
    setrecomended(result);
  };

  useState(() => (url.includes('drinks')
    ? recomendedFoods() : renderButtonsDrink()), []);

  return (
    <div>
      <p>Recommended</p>
      <div
        style={ { display: 'flex', overflow: 'auto' } }
      >
        {url.includes('drinks') && recomended.slice(0, MAX_CARROUSEL)
          .map((card, index) => (
            <figure
              key={ card.idMeal }
              style={ { margin: '0 0 40px' } }
              data-testid={ `${index}-recomendation-card` }
            >
              <input
                style={ { width: '50vw' } }
                type="image"
                alt={ card.idMeal }
                src={ card.strMealThumb }
              />
              <figcaption
                data-testid={ `${index}-recomendation-title` }
              >
                {card.strMeal}

              </figcaption>
              <figcaption>{card.strCategory}</figcaption>
            </figure>
          ))}
        {url.includes('foods') && recomended.slice(0, MAX_CARROUSEL)
          .map((card, index) => (
            <figure
              key={ card.idDrink }
              style={ { margin: '0 0 40px' } }
              data-testid={ `${index}-recomendation-card` }
            >
              <input
                style={ { width: '50vw' } }
                type="image"
                alt={ card.idDrink }
                src={ card.strDrinkThumb }
              />
              <figcaption
                data-testid={ `${index}-recomendation-title` }
              >
                {card.strDrink}

              </figcaption>
              <figcaption>{card.strCategory}</figcaption>
            </figure>
          ))}
      </div>
    </div>
  );
};

export default Recomendations;
