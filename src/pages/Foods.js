import React, { useContext, useEffect, useState } from 'react';
import '../css/Main.css';
import SyncLoader from 'react-spinners/SyncLoader';
import { Redirect, useHistory } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import { filterByName } from '../services/MealsAPI';

const Foods = () => {
  const LENGTH_ARRAY = 12;
  const history = useHistory();
  const { searchValues, setsearchValues, explore, setexplore } = useContext(MyContext);
  const [loading, setloading] = useState(true);
  const renderInitialFoods = async () => {
    const result = await filterByName('');
    setsearchValues(result);
    setloading(false);
  };

  useEffect(() => {
    if (explore !== 'food') {
      renderInitialFoods();
    } else {
      setloading(false);
    }
    setexplore('');
  }, []);

  return (
    <div>
      <div className="header_group">
        <Header title="Foods" search />
        {searchValues != null && searchValues.length === 1
    && <Redirect to={ `/foods/${searchValues[0].idMeal}` } />}
        <Buttons />
      </div>
      <div className="card">
        {loading
          ? (
            <div className="loading">
              <SyncLoader
                color="#F5A623"
                loading={ loading }
                size={ 15 }
              />
            </div>
          )
          : searchValues != null && searchValues.length > 1
    && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
      <div
        className="card_main"
        key={ index }
      >

        <input
          className="card_img"
          type="image"
          src={ card.strMealThumb }
          alt={ card.strMeal }
          onClick={ () => history.push(`/foods/${card.idMeal}`) }
        />
        <p
          className="card_text"
        >
          {card.strMeal}

        </p>
      </div>
    ))}

        {searchValues === ''
       && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
         <div key={ index }>

           <input
             className="card_img"
             type="image"
             src={ card.strMealThumb }
             alt={ card.strMeal }
           />
           <p
             className="card_text"
           >
             {card.strMeal}

           </p>
         </div>
       ))}
      </div>

      {searchValues === null
    && global.alert('Sorry, we haven\'t found any recipes for these filters.')}
      <Footer />
    </div>
  );
};

export default Foods;
