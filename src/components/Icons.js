import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../images/blackHeartIcon.svg';
import MyContext from '../context/MyContext';

const Icons = () => {
  const [showMessage, setshowMessage] = useState(false);
  const { searchValues } = useContext(MyContext);
  const [toggleFav, settoggleFav] = useState(false);
  const { url } = useHistory();
  const ShareTo = () => {
    // ref pesquisa: navigator.clipboard.writeText('Copy this text to clipboard')
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setshowMessage(true);
  };

  const verifyFav = () => {
    // return toggleFav && localStorage.setItem('teste', JSON.stringify(searchValues));
    if (toggleFav === false) {
      localStorage.setItem('favoriteRecipes', JSON.stringify({
        id: searchValues[0].idMeal,
      }));
    }
    console.log(searchValues);
    settoggleFav(!toggleFav);
  };

  return (
    <div>
      <input
        data-testid="share-btn"
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
