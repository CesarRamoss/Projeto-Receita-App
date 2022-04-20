import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { randomDrink } from '../services/DrinksAPI';

const ExploreDrinks = () => {
  const history = useHistory();
  const [drinkRandom, setdrinkRandom] = useState([]);

  const fetchDrink = async () => {
    const { drinks } = await randomDrink();
    setdrinkRandom(drinks);
    console.log(drinks);
  };

  useEffect(() => {
    fetchDrink();
  }, []);

  return (
    <div>
      <Header title="Explore Drinks" />
      <section className="buttons_profile">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient

        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={
            () => history.push(`/drinks/${drinkRandom[0].idDrink}`)
          }
        >
          Surprise me!

        </button>
      </section>
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
