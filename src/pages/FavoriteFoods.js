import React, { useEffect, useState } from 'react';
import '../css/Favorite.css';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Icons from '../components/Icons';

const FavoriteFoods = () => {
  const [favorites, setfavorites] = useState([]);
  const [originalStorage, setoriginalStorage] = useState([]);
  const history = useHistory();

  const renderDetails = () => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
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

  // useEffect(() => {
  //   const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   setfavorites(favoriteStorage);
  // }, [JSON.parse(localStorage.getItem('favoriteRecipes'))]);

  useEffect(() => {
    renderDetails();
  }, []);

  return (
    <div>
      <section className="header_group">
        <Header title="Favorite Recipes" />
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
          <div key={ index } className="card_favorite">
            <input
              className="img_favorite"
              type="image"
              src={ item.strMealThumb || item.strDrinkThumb }
              alt="recipe"
              onClick={ () => redirectTo(item.idDrink || item.idMeal) }
            />
            <section className="favorite_details">
              <h2>{item.strMeal || item.strDrink}</h2>
              <div style={ { margin: '10px 0' } }>
                <p>{item.strCategory}</p>
                <p>{item.strArea || item.strAlcoholic}</p>
              </div>
              <Icons id={ item.idDrink || item.idMeal } />
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteFoods;
