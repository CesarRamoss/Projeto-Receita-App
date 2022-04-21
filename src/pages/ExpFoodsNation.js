import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import { filterByName,
  filterNationalities, listNationalities } from '../services/MealsAPI';

const ExpFoodsNation = () => {
  const LENGTH_ARRAY = 12;
  const history = useHistory();
  const { searchValues, setsearchValues } = useContext(MyContext);
  const [nationalities, setnationalities] = useState([]);
  const [option] = useState([]);

  const allNations = async () => {
    const nations = await listNationalities();
    setnationalities(nations);
  };

  const filterNation = async (e) => {
    const filtered = await filterNationalities(e.target.value);
    setsearchValues(filtered);
  };

  const renderInitialFoods = async () => {
    const result = await filterByName('');
    setsearchValues(result);
    allNations();
  };

  useEffect(() => {
    renderInitialFoods();
  }, []);
  return (
    <div>
      <div className="header_group">
        <Header title="Explore Nationalities" />
        <select className="select_nation" onChange={ filterNation }>
          {nationalities.map((area) => (
            <option
              key={ area.strArea }
              value={ option.value }
            >
              {area.strArea}

            </option>
          ))}
        </select>
      </div>

      <div className="card">

        {searchValues != null && searchValues.length > 1
  && searchValues.slice(0, LENGTH_ARRAY).map((card, index) => (
    <div
      className="card_main"
      key={ index }
      data-testid={ `${index}-recipe-card` }
    >
      <input
        className="card_img"
        type="image"
        src={ card.strMealThumb }
        alt={ card.strMeal }
        data-testid={ `${index}-card-img` }
        onClick={ () => history.push(`/foods/${card.idMeal}`) }
      />
      <p
        className="card_text"
        data-testid={ `${index}-card-name` }
      >
        {card.strMeal}

      </p>
    </div>
  ))}

      </div>

      <Footer />
    </div>
  );
};

export default ExpFoodsNation;
