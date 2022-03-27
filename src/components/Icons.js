import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
// import favoriteIconBlack from '../images/blackHeartIcon.svg';

const Icons = () => {
  const [showMessage, setshowMessage] = useState(false);
  const { url } = useHistory();
  const ShareTo = () => {
    // ref pesquisa: navigator.clipboard.writeText('Copy this text to clipboard')
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setshowMessage(true);
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
        src={ favoriteIcon }
        alt="favorite"
      />
      {
        showMessage
      && <p>Link copied!</p>
      }
    </div>

  );
};

export default Icons;
