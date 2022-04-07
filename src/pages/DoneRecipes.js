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
      <section>
        <Header title="Done Recipes" />
        <button type="button" onClick={ renderDetails }>All</button>
        <button type="button" onClick={ filterByFood }>Food</button>
        <button type="button" onClick={ filterByDrink }>Drinks</button>
      </section>
      {favorites.map((item, index) => (
        <div key={ index }>
          <input
            type="image"
            src={ item.strMealThumb || item.strDrinkThumb }
            alt="recipe"
            onClick={ () => redirectTo(item.idDrink || item.idMeal) }
          />
          <p>{item.strMeal || item.strDrink}</p>
          <p>{item.strCategory}</p>
          <p>{item.strArea || item.strAlcoholic}</p>
          <p>{item.strTags}</p>
        </div>
      ))}
    </div>
  );
};

export default DoneRecipes;
