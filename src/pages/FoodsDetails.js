import React, { useContext, useEffect, useState } from 'react';
import '../css/Details.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Icons from '../components/Icons';
import Recomendations from '../components/Recomendations';
import MyContext from '../context/MyContext';
import { filterByID } from '../services/MealsAPI';

const FoodsDetails = () => {
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

  const replaceVideo = (link) => {
    const re = '/watch?v=';
    const string = link !== undefined && link.replace(re, '/embed/');
    return string;
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
            className="img_details"
            data-testid="recipe-photo"
            alt={ card.idMeal }
            src={ card.strMealThumb }
          />
          <div className="main_details">
            <h2 data-testid="recipe-title">{card.strMeal}</h2>
            <div className="title_details">
              <p data-testid="recipe-category">{card.strCategory}</p>
              <Icons />
            </div>
            <h4>Ingredients</h4>
            <ul className="ingredient_details">
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
            <h4>Instructions</h4>
            <p className="instructions_details">{card.strInstructions}</p>

            <iframe
              className="video_details"
              title="My Video"
              width="500"
              height="500"
              src={ replaceVideo(card.strYoutube) }
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      ))}
      <Recomendations />
      <button
        className="button_details"
        type="button"
        style={ { position: 'fixed', bottom: '0' } }
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/foods/${params.id}/in-progress`) }
      >
        Start Recipe
        {' '}

      </button>
    </div>
  );
};

export default FoodsDetails;
