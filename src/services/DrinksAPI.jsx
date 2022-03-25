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

export default filterByDrinkIngredient;
