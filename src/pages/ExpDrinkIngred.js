import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import { filterByDrinkIngredient, listIngredient } from '../services/DrinksAPI';

const ExpDrinkIngred = () => {
  const { setsearchValues, setexplore } = useContext(MyContext);
  const LENGTH_ARRAY = 12;
  const history = useHistory();
  const [ingredients, setingredients] = useState([]);

  const renderDetails = async () => {
    const itens = await listIngredient();
    setingredients(itens);
  };

  const redirectFoodIngred = async (ingredient) => {
    const result = await filterByDrinkIngredient(ingredient);
    setsearchValues(result);
    setexplore('drink');
    history.push('/drinks');
  };

  useEffect(() => {
    renderDetails();
  }, []);

  return (
    <div>
      <div className="header_group">
        <Header title="Explore Ingredients" />
      </div>
      <div className="card" style={ { paddingTop: '50px' } }>
        {ingredients != null && ingredients.slice(0, LENGTH_ARRAY).map((card) => (
          <div key={ card.strIngredient1 } className="card_main">
            <input
              className="card_img"
              alt="ingredient"
              type="image"
              src={
                `https://www.thecocktaildb.com/images/ingredients/${card.strIngredient1}-Small.png`
              }
              onClick={ () => redirectFoodIngred(card.strIngredient1) }
            />
            <p className="card_text">{card.strIngredient1}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ExpDrinkIngred;
