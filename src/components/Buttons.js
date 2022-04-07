import React, { useContext, useState } from 'react';
import '../css/Header.css';
import { useRouteMatch } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { buttonsCategoryDrink, filterByDrinkCategory,
  filterByDrinkName } from '../services/DrinksAPI';
import { buttonsCategory, filterByCategory, filterByName } from '../services/MealsAPI';

const Buttons = () => {
  const NUMBER_BUTTONS = 5;
  const { setsearchValues } = useContext(MyContext);
  const [valueButton, setvalueButton] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [itemButton, setitemButton] = useState('');
  const { url } = useRouteMatch();

  const renderByClick = async (value) => {
    if (value === itemButton) {
      // funcao toggle para trazer o conteudo filtrado ou todos
      if (toggle && url.includes('foods')) {
        const result = await filterByName('');
        setsearchValues(result);
        settoggle(false);
      } if (toggle && url.includes('drinks')) {
        const result = await filterByDrinkName('');
        setsearchValues(result);
        settoggle(false);
      }
    }
  };

  const handleClick = async ({ target }) => {
    if (url.includes('foods')) {
      const result = await filterByCategory(target.innerText);
      setsearchValues(result);
      renderByClick(target.innerText);
    } else {
      const result = await filterByDrinkCategory(target.innerText);
      setsearchValues(result);
      renderByClick(target.innerText);
    }
    settoggle(true);
    setitemButton(target.innerText);
  };

  const handleByAll = async () => {
    if (url.includes('drinks')) {
      const result = await filterByDrinkName('');
      setsearchValues(result);
    } else {
      const result = await filterByName('');
      setsearchValues(result);
    }
  };

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
    <div className="header_buttons">
      <button
        className="button_header"
        type="button"
        data-testid="All-category-filter"
        onClick={ handleByAll }
      >
        All
      </button>
      {valueButton.slice(0, NUMBER_BUTTONS).map((item) => (
        <button
          className="button_header"
          key={ item.strCategory }
          type="button"
          data-testid={ `${item.strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {item.strCategory}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
