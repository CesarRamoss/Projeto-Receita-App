export const filterByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await response.json();
  console.log(result);
  return result;
};

export const filterByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await response.json();
  console.log(result);
  return result;
};

export const filterByLetter = async (letter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const result = await response.json();
  console.log(result);
  return result;
};

export default filterByIngredient;
