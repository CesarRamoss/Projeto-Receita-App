import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Icons from '../components/Icons';
import MyContext from '../context/MyContext';
import { filterByID } from '../services/MealsAPI';

const FoodsInProgress = () => {
  const { searchValues, setsearchValues } = useContext(MyContext);
  const [ingredient, setingredient] = useState([]);
  const [measure, setmeasure] = useState([]);
  const [toggleButton, settoggleButton] = useState(true);
  const { params } = useRouteMatch();
  const history = useHistory();

  const verifyAllCheck = () => {
    let qtde = 0;
    const checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach((item) => {
      if (item.checked) {
        qtde += 1;
      }
    });
    return qtde === checkbox.length ? settoggleButton(false) : settoggleButton(true);
  };

  const putStrike = (index) => {
    const item = document.getElementById(`elem${index}`).style;
    if (item.textDecoration === '') {
      item.textDecoration = 'line-through';
    } else {
      item.textDecoration = '';
    }
    verifyAllCheck();
  };

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
    const result = await filterByID(params.id);
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
        <div key={ card.idMeal }>
          <img
            data-testid="recipe-photo"
            alt={ card.idMeal }
            src={ card.strMealThumb }
          />
          <p data-testid="recipe-title">{card.strMeal}</p>
          <p data-testid="recipe-category">{card.strCategory}</p>
          <Icons />
          <h4>Ingredients</h4>
          <ul>
            {ingredient.filter((item) => item !== null && item.length > 0)
              .map((ingred, index) => (
                <div key={ index } id={ `elem${index}` }>
                  <label htmlFor={ `item${index}` }>
                    <input
                      id={ `item${index}` }
                      className="checkbox"
                      type="checkbox"
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      onClick={ () => putStrike(index) }
                    />
                    {ingred}
                    -
                    <span data-testid={ `${index}-ingredient-name-and-measure` }>
                      {measure[index]}
                    </span>
                  </label>
                </div>
              ))}
          </ul>
          <h4>Instructions</h4>
          <p data-testid="instructions">{card.strInstructions}</p>

        </div>
      ))}
      <button
        type="button"
        style={ { position: 'fixed', bottom: '0' } }
        data-testid="finish-recipe-btn"
        disabled={ toggleButton }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
        {' '}

      </button>
    </div>
  );
};

export default FoodsInProgress;
