import React from 'react';
import '../css/Profile.css';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = () => {
  const emailStorage = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" icon />
      <div className="email_profile">
        <h2>
          {' '}
          {emailStorage.email}
          {' '}
        </h2>
      </div>
      <section className="buttons_profile">
        <button
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes

        </button>
        <button
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <button
          type="button"
          onClick={ handleLogout }
        >
          Logout

        </button>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
