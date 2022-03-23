import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const Header = ({ title, search }) => {
  const history = useHistory();
  const [displaySearch, setdisplaySearch] = useState(false);

  const toggleSearch = () => (setdisplaySearch(!displaySearch));

  return (
    <div>
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      />
      <span data-testid="page-title">{title}</span>
      {search
        ? (
          <input
            type="image"
            src={ SearchIcon }
            alt="profile"
            data-testid="search-top-btn"
            onClick={ toggleSearch }
          />) : null}
      {displaySearch
      && <input type="text" data-testid="search-input" />}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;
export default Header;
