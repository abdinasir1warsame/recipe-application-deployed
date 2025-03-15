import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { database } from '../assets/googleSignin/config'; // Adjust the path as necessary
import { userAuth } from '../context/AuthContext';
import TopSection from '../assets/components/recipePage/topSection';
import RecipeDetails from '../assets/components/recipePage/recipeDetails';
import Ingredients from '../assets/components/recipePage/ingredients';
import CookingSteps from '../assets/components/recipePage/cookingSteps';

export default function NewRecipePage() {
  const { user } = userAuth();
  const location = useLocation();
  const { recipe } = location.state || {};
  const [recipeData, setRecipeData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [originalServings, setOriginalServings] = useState(null);
  const [currentServings, setCurrentServings] = useState(null);

  useEffect(() => {
    const apiKey3 = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${recipe}/information?apiKey=${apiKey3}&includeNutrition=true`;

    async function fetchRecipeData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        const data = await response.json();
        setRecipeData(data);
        setOriginalServings(data.servings); // Store original servings
        setCurrentServings(data.servings); // Initialize current servings
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (recipe) {
      fetchRecipeData();
    } else {
      console.log('recipeId is invalid');
    }
  }, [recipe]);

  const method = recipeData?.analyzedInstructions?.[0]?.steps || [];
  const ingredients = recipeData?.extendedIngredients || [];

  const handleIngredientCheck = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      const ingredientId = ingredient.id || ingredient.name; // Use `id` or `name`
      if (prevSelected.some((item) => item.id === ingredientId)) {
        return prevSelected.filter((item) => item.id !== ingredientId);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  const changeServings = (increment) => {
    setCurrentServings((prev) => {
      const newServings = prev + increment;
      if (newServings >= 1 && newServings <= 100) {
        return newServings;
      }
      return prev;
    });
  };

  const scaleFactor =
    originalServings && currentServings
      ? currentServings / originalServings
      : 1;

  const scaledIngredients = ingredients.map((ingredient) => ({
    ...ingredient,
    amount: ingredient.amount * scaleFactor, // Scale the amount correctly
  }));

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 bg-base-200 text-gray-300 px-2 lg:px-32 ml-0 lg:ml-64">
        <TopSection
          user={user}
          recipe={recipe}
          recipeData={recipeData}
          database={database}
        />

        {/* Middle section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 lg:p-8 py-10">
          <RecipeDetails
            recipeData={recipeData}
            setSuccessMessage={setSuccessMessage}
            successMessage={successMessage}
          />

          {/* Ingredients & Steps */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            <Ingredients
              ingredients={scaledIngredients} // Use scaled ingredients here
              currentServings={currentServings}
              setCurrentServings={setCurrentServings}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              handleIngredientCheck={handleIngredientCheck}
              user={user}
              database={database}
              changeServings={changeServings}
            />

            {/* Steps */}
            <CookingSteps method={method} />
          </div>
        </div>
      </div>
    </div>
  );
}
