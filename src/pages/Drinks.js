import React, { useContext, useEffect, useState } from 'react';
import '../css/Main.css';
import SyncLoader from 'react-spinners/SyncLoader';
import { Redirect, useHistory } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import { filterByDrinkName } from '../services/DrinksAPI';

const Drinks = () => {
  const LENGTH_ARRAY = 12;
  const history = useHistory();
  const [loading, setloading] = useState(true);
  const { searchValues, setsearchValues, explore, setexplore } = useContext(MyContext);

  const renderInitialDrinks = async () => {
    const result = await filterByDrinkName('');
    setsearchValues(result);
    setloading(false);
  };

  useEffect(() => {
    if (explore !== 'drink') {
      renderInitialDrinks();
    } else {
      setloading(false);
    }
    setexplore('');
  }, []);

  return (
    <div>
      <div className="header_group">
        <Header title="Drinks" search />
        <Buttons />
      </div>
      {searchValues != null && searchValues.length === 1
      && <Redirect to={ `/drinks/${searchValues[0].idDrink}` } />}
      <div className="card">
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
          : searchValues != null && searchValues.length > 1
    && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
      <div key={ index } className="card_main">

        <input
          className="card_img"
          type="image"
          src={ card.strDrinkThumb }
          alt={ card.strDrink }
          onClick={ () => history.push(`/drinks/${card.idDrink}`) }
        />
        <p className="card_text">{card.strDrink}</p>
      </div>
    ))}
        {searchValues === '' && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
          <div key={ index }>

            <input
              className="card_img"
              type="image"
              src={ card.strDrinkThumb }
              alt={ card.strDrink }
              onClick={ () => history.push(`/drinks/${card.idDrink}`) }
            />
            <p className="card_text">{card.strDrink}</p>
          </div>
        ))}
      </div>
      {searchValues === null
    && global.alert('Sorry, we haven\'t found any recipes for these filters.')}
      <Footer />
    </div>
  );
};

export default Drinks;
