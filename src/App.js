import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Drinks from './pages/Drinks';
import DrinksDetails from './pages/DrinksDetails';
import DrinksInProgress from './pages/DrinksInProgress';
import Foods from './pages/Foods';
import FoodsDetails from './pages/FoodsDetails';
import FoodsInProgress from './pages/FoodsInProgress';
import Login from './pages/Login';
import Provider from './context/Provider';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExpFoodIngred from './pages/ExpFoodIngred';
import ExpDrinkIngred from './pages/ExpDrinkIngred';
import ExpFoodsNation from './pages/ExpFoodsNation';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteFoods from './pages/FavoriteFoods';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Route component={ Login } path="/" exact />
        <Route component={ Foods } path="/foods" exact />
        <Route component={ Drinks } path="/drinks" exact />
        <Route component={ FoodsDetails } path="/foods/:id" exact />
        <Route component={ DrinksDetails } path="/drinks/:id" exact />
        <Route component={ FoodsInProgress } path="/foods/:id/in-progress" exact />
        <Route component={ DrinksInProgress } path="/drinks/:id/in-progress" exact />
        <Route component={ Explore } path="/explore" exact />
        <Route component={ ExploreFoods } path="/explore/foods" exact />
        <Route component={ ExploreDrinks } path="/explore/drinks" exact />
        <Route component={ ExpFoodIngred } path="/explore/foods/ingredients" exact />
        <Route component={ ExpDrinkIngred } path="/explore/drinks/ingredients" exact />
        <Route component={ ExpFoodsNation } path="/explore/foods/nationalities" exact />
        <Route component={ Profile } path="/profile" exact />
        <Route component={ DoneRecipes } path="/done-recipes" exact />
        <Route component={ FavoriteFoods } path="/favorite-recipes" exact />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
