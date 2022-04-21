import React from 'react';
import '../css/Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drink.png';
import exploreIcon from '../images/mealworld.png';
import mealIcon from '../images/food.png';

const Footer = () => {
  const history = useHistory();
  return (
    <div className="footer" style={ { position: 'fixed', bottom: 0 } }>
      <input
        type="image"
        src={ drinkIcon }
        alt="Drink Icon"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <input
        type="image"
        src={ exploreIcon }
        alt="Explore Icon"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="Meal Icon"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
      />

    </div>
  );
};

export default Footer;
