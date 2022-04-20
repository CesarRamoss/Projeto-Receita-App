import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../images/blackHeartIcon.svg';
import MyContext from '../context/MyContext';

const Icons = (id) => {
  const [showMessage, setshowMessage] = useState(false);
  const { searchValues } = useContext(MyContext);
  const [toggleFav, settoggleFav] = useState(false);
  const { url } = useHistory();
  const ShareTo = () => {
    // ref pesquisa: navigator.clipboard.writeText('Copy this text to clipboard')
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setshowMessage(true);
  };

  const toggleIcon = () => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const itens = JSON.parse(localStorage.getItem('favoriteRecipes'));

      itens.map((item) => Number(item.idMeal || item.idDrink)
       === Number(Object.values(id)) && settoggleFav(true));
    }
  };

  const verifyFav = () => {
    if (toggleFav === false) {
      if (JSON.parse(localStorage.getItem('favoriteRecipes'))
      && searchValues.length > 0) {
        const itens = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const allItens = [...itens, searchValues[0]];
        localStorage.setItem('favoriteRecipes', JSON.stringify(allItens));
      }
    } else {
      const itens = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const list = itens.filter((item) => Number(item.idMeal)
      !== Number(Object.values(id)));
      localStorage.setItem('favoriteRecipes', JSON.stringify(list));
    }
    settoggleFav(!toggleFav);
  };

  useEffect(() => {
    toggleIcon();
  }, []);

  return (
    <div>
      <input
        className="icon_img"
        type="image"
        src={ shareIcon }
        alt="share"
        onClick={ ShareTo }
      />
      <input
        data-testid="favorite-btn"
        className="favorite"
        type="image"
        src={ toggleFav ? favoriteIconBlack : favoriteIcon }
        alt="favorite"
        onClick={ verifyFav }
      />
      {
        showMessage
      && <p>Link copied!</p>
      }
    </div>

  );
};

export default Icons;
