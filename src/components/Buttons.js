import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { buttonsCategoryDrink } from '../services/DrinksAPI';
import { buttonsCategory } from '../services/MealsAPI';

const Buttons = () => {
  const NUMBER_BUTTONS = 5;
  const [valueButton, setvalueButton] = useState([]);
  const { url } = useRouteMatch();

  const renderButtonsFood = async () => {
    const result = await buttonsCategory();
    setvalueButton(result);
  };

  const renderButtonsDrink = async () => {
    const result = await buttonsCategoryDrink();
    setvalueButton(result);
  };

  useState(() => (url.includes('foods')
    ? renderButtonsFood() : renderButtonsDrink()), []);

  return (
    <div>
      {valueButton.slice(0, NUMBER_BUTTONS).map((item, index) => (
        <div key={ index }>
          <button type="button" data-testid={ `${item.strCategory}-category-filter` }>
            {item.strCategory}
          </button>
        </div>
      ))}

    </div>
  );
};

export default Buttons;
