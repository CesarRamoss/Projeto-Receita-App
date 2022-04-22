import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Explore = () => {
  const history = useHistory();

  return (
    <div>
      <Header title="Explore" icon />
      <section className="buttons_profile">
        <button
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods

        </button>
        <button
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks

        </button>
      </section>
      <Footer />
    </div>
  );
};

export default Explore;
