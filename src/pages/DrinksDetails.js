import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Icons from '../components/Icons';
import Recomendations from '../components/Recomendations';
import MyContext from '../context/MyContext';
import { filterByDrinkID } from '../services/DrinksAPI';

const DrinksDetails = () => {
  const { searchValues, setsearchValues } = useContext(MyContext);
  const [ingredient, setingredient] = useState([]);
  const [measure, setmeasure] = useState([]);
  const { params } = useRouteMatch();

  const filterAllIngredients = () => {
    searchValues.map((item) => {
      const verify = Object.keys(item)
        .filter((value) => value.includes('strIngredient'));
      const results = verify.map((keys) => item[keys]);
      setingredient(results);
      return results;
    });
  };

  const filterAllMeasures = () => {
    searchValues.map((item) => {
      const verify = Object.keys(item)
        .filter((value) => value.includes('strMeasure'));
      const results = verify.map((keys) => item[keys]);
      setmeasure(results);
      return results;
    });
  };

  const renderDetails = async () => {
    const result = await filterByDrinkID(params.id);
    setsearchValues(result);
  };

  useEffect(() => {
    filterAllIngredients();
    filterAllMeasures();
  }, [searchValues]);

  useEffect(() => {
    renderDetails();
  }, []);

  return (
    <div>
      { searchValues.map((card) => (
        <div key={ card.idDrink }>
          <img
            data-testid="recipe-photo"
            alt={ card.idDrink }
            src={ card.strDrinkThumb }
          />
          <p data-testid="recipe-title">{card.strDrink}</p>
          <p data-testid="recipe-category">{card.strAlcoholic}</p>
          <Icons />
          <p>Ingredients</p>
          <ul>
            {ingredient.filter((item) => item !== null && item.length > 0)
              .map((ingred, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingred}
                  {' '}
                  -
                  <span data-testid={ `${index}-ingredient-name-and-measure` }>
                    {measure[index]}

                  </span>

                </li>
              ))}
          </ul>
          <p data-testid="instructions">{card.strInstructions}</p>

        </div>
      ))}
      <Recomendations />
      <button
        type="button"
        style={ { position: 'fixed', bottom: '0' } }
        data-testid="start-recipe-btn"
      >
        Start Recipe
        {' '}

      </button>
    </div>
  );
};

export default DrinksDetails;
