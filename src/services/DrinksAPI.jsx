export const filterByDrinkIngredient = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const { drinks } = await response.json();
  console.log(drinks);
  return drinks;
};

export const filterByDrinkName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const { drinks } = await response.json();
  console.log(drinks);
  return drinks;
};

export const filterByDrinkLetter = async (letter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const { drinks } = await response.json();
  console.log(drinks);
  return drinks;
};

export const buttonsCategoryDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const { drinks } = await response.json();
  console.log(drinks);
  return drinks;
};

export const filterByDrinkCategory = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await response.json();
  console.log(drinks);
  return drinks;
};

export const filterByDrinkID = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  console.log(drinks);
  return drinks;
};

export const randomDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const drinks = await response.json();
  console.log(drinks);
  return drinks;
};

export default filterByDrinkIngredient;
