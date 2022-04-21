import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import { filterByIngredient, listIngredient } from '../services/MealsAPI';

const ExploreFoodsIngredient = () => {
  const { setsearchValues } = useContext(MyContext);
  const LENGTH_ARRAY = 12;
  const history = useHistory();
  const [ingredients, setingredients] = useState([]);

  const renderDetails = async () => {
    const itens = await listIngredient();
    setingredients(itens);
  };

  const redirectFoodIngred = async (ingredient) => {
    const result = await filterByIngredient(ingredient);
    setsearchValues(result);
    history.push('/foods');
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
          <div key={ card.idIngredient } className="card_main">
            <input
              className="card_img"
              alt="ingredient"
              type="image"
              src={ `https://www.themealdb.com/images/ingredients/${card.strIngredient}-Small.png` }
              onClick={ () => redirectFoodIngred(card.strIngredient) }
            />
            <p className="card_text">{card.strIngredient}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ExploreFoodsIngredient;
