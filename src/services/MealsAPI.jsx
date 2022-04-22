export const filterByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const { meals } = await response.json();
  return meals;
};

export const filterByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const { meals } = await response.json();
  return meals;
};

export const filterByLetter = async (letter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const { meals } = await response.json();
  return meals;
};

export const buttonsCategory = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await response.json();
  return meals;
};

export const filterByCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const { meals } = await response.json();
  return meals;
};

export const filterByID = async (ID) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
  const { meals } = await response.json();
  return meals;
};

export const randomFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const meals = await response.json();
  return meals;
};

export const listIngredient = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const { meals } = await response.json();
  return meals;
};

export const listNationalities = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await response.json();
  return meals;
};

export const filterNationalities = async (area) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const { meals } = await response.json();
  return meals;
};

export default filterByIngredient;
