import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import { filterByIngredient, listIngredient } from '../services/MealsAPI';

const ExploreFoodsIngredient = () => {
  const { setsearchValues, setexplore } = useContext(MyContext);
  const LENGTH_ARRAY = 12;
  const history = useHistory();
  const [ingredients, setingredients] = useState([]);
  const [loading, setloading] = useState(true);

  const renderDetails = async () => {
    const itens = await listIngredient();
    setingredients(itens);
    setloading(false);
  };

  const redirectFoodIngred = async (ingredient) => {
    const result = await filterByIngredient(ingredient);
    setsearchValues(result);
    setexplore('food');
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
        {loading
          ? (
            <div className="loading">
              <SyncLoader
                color="#F5A623"
                loading={ loading }
                size={ 15 }
                className="teste"
              />
            </div>
          )
          : ingredients != null && ingredients.slice(0, LENGTH_ARRAY).map((card) => (
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
