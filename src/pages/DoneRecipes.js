import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

const DoneRecipes = () => {
  const [favorites, setfavorites] = useState([]);
  const [originalStorage, setoriginalStorage] = useState([]);
  const history = useHistory();

  const renderDetails = () => {
    const favoriteStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setfavorites(favoriteStorage);
    setoriginalStorage(favoriteStorage);
  };

  const filterByDrink = () => {
    const array = [];
    originalStorage.map((item) => {
      const resultDrinks = item.idDrink && array.push(item);
      console.log(resultDrinks);
      return setfavorites(array);
    });
  };

  const filterByFood = () => {
    const array = [];
    originalStorage.map((item) => {
      const resultDrinks = item.idMeal && array.push(item);
      console.log(resultDrinks);
      return setfavorites(array);
    });
  };

  const redirectTo = (id) => (id[0] === '1'
    ? history.push(`/drinks/${id}`)
    : history.push(`/foods/${id}`));

  useEffect(() => {
    renderDetails();
  }, []);

  return (
    <div>
      <section className="header_group">
        <Header title="Done Recipes" />
        <div className="header_buttons">
          <button
            className="button_header"
            type="button"
            onClick={ renderDetails }
          >
            All

          </button>
          <button
            type="button"
            className="button_header"
            onClick={ filterByFood }
          >
            Food

          </button>
          <button
            type="button"
            className="button_header"
            onClick={ filterByDrink }
          >
            Drinks

          </button>
        </div>
      </section>
      <div className="card container">
        {favorites.map((item, index) => (
          <div key={ index }>
            <input
              className="img_details"
              type="image"
              src={ item.strMealThumb || item.strDrinkThumb }
              alt="recipe"
              onClick={ () => redirectTo(item.idDrink || item.idMeal) }
            />
            <h2>{item.strMeal || item.strDrink}</h2>
            <div style={ { margin: '10px 0' } }>
              <p>{item.strCategory}</p>
              <p>{item.strArea || item.strAlcoholic}</p>
              <p>{item.strTags}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoneRecipes;
