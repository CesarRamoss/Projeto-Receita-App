import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Icons from '../components/Icons';
import MyContext from '../context/MyContext';
import { filterByDrinkID } from '../services/DrinksAPI';

const DrinksInProgress = () => {
  const { searchValues, setsearchValues } = useContext(MyContext);
  const [ingredient, setingredient] = useState([]);
  const [toggleButton, settoggleButton] = useState(true);
  const [measure, setmeasure] = useState([]);
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

  const saveRecipes = () => {
    if (JSON.parse(localStorage.getItem('doneRecipes'))) {
      const itens = JSON.parse(localStorage.getItem('doneRecipes'));
      const allItens = [...itens, searchValues[0]];
      localStorage.setItem('doneRecipes', JSON.stringify(allItens));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify(searchValues));
    }
    history.push('/done-recipes');
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
            style={ { width: '100%' } }
            data-testid="recipe-photo"
            alt={ card.idDrink }
            src={ card.strDrinkThumb }
          />
          <div className="main_details">
            <h2 data-testid="recipe-title">{card.strDrink}</h2>
            <div className="title_details">
              <p data-testid="recipe-category">{card.strAlcoholic}</p>
              <Icons id={ card.idDrink || card.idMeal } />
            </div>
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
        </div>
      ))}
      <button
        type="button"
        className="button_details"
        data-testid="finish-recipe-btn"
        disabled={ toggleButton }
        onClick={ saveRecipes }
      >
        Finish Recipe
        {' '}

      </button>
    </div>

  );
};

export default DrinksInProgress;
