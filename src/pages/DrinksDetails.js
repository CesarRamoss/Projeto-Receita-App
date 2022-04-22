import React, { useContext, useEffect, useState } from 'react';
import '../css/Details.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Icons from '../components/Icons';
import Recomendations from '../components/Recomendations';
import MyContext from '../context/MyContext';
import { filterByDrinkID } from '../services/DrinksAPI';

const DrinksDetails = () => {
  const { searchValues, setsearchValues } = useContext(MyContext);
  const [ingredient, setingredient] = useState([]);
  const [measure, setmeasure] = useState([]);
  const { params } = useRouteMatch();
  const history = useHistory();

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
            className="img_details"
            alt={ card.idDrink }
            src={ card.strDrinkThumb }
          />
          <div className="main_details">
            <h2>{card.strDrink}</h2>
            <div className="title_details">
              <p>{card.strAlcoholic}</p>
              <Icons id={ card.idDrink || card.idMeal } />
            </div>
            <h4>Ingredients</h4>
            <ul className="ingredient_details">
              {ingredient.filter((item) => item !== null && item.length > 0)
                .map((ingred, index) => (
                  <li
                    key={ index }
                  >
                    {ingred}
                    {' '}
                    -
                    <span>
                      {measure[index]}
                    </span>

                  </li>
                ))}
            </ul>
            <h4>Instructions</h4>
            <p className="instructions_details">{card.strInstructions}</p>
          </div>
        </div>
      ))}
      <Recomendations />
      <button
        className="button_details"
        type="button"
        style={ { position: 'fixed', bottom: '0' } }
        onClick={ () => history.push(`/drinks/${params.id}/in-progress`) }
      >
        Start Recipe
        {' '}

      </button>
    </div>
  );
};

export default DrinksDetails;
