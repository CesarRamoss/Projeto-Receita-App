export const filterByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const { meals } = await response.json();
  console.log(meals);
  return meals;
};

export const filterByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const { meals } = await response.json();
  console.log(meals);
  return meals;
};

export const filterByLetter = async (letter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const { meals } = await response.json();
  console.log(meals);
  return meals;
};

export default filterByIngredient;
