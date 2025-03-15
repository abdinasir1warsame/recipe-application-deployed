import React, { useState } from 'react';
import Fraction from 'fraction.js';
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';

const Ingredients = ({
  ingredients,
  currentServings,
  selectedIngredients,
  setSelectedIngredients,
  user,
  database,
  handleIngredientCheck,
  changeServings,
}) => {
  const [successMessage, setSuccessMessage] = useState('');

  const toFraction = (amount) => new Fraction(amount).toFraction(true);

  const addToShoppingList = async () => {
    if (!user) {
      setSuccessMessage('You must be logged in to add a recipe.');
      return;
    }

    if (selectedIngredients.length === 0) {
      console.log('No ingredients selected.');
      return;
    }

    try {
      const ingredientPromises = selectedIngredients.map(async (ingredient) => {
        // Query to check if the ingredient already exists for the user
        const ingredientQuery = query(
          collection(database, 'ingredients'),
          where('name', '==', ingredient.name),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(ingredientQuery);

        // Check if the ingredient already exists (even if it's selected multiple times)
        if (querySnapshot.empty) {
          // Add the ingredient if it doesn't exist in the database
          await addDoc(collection(database, 'ingredients'), {
            image: ingredient.image,
            name: ingredient.name,
            userId: user.uid,
            createdAt: new Date(),
          });
        } else {
          console.log(
            `Ingredient ${ingredient.name} already exists in your shopping list.`
          );
        }
      });

      await Promise.all(ingredientPromises);

      setSelectedIngredients([]); // Clear the selected ingredients
      setSuccessMessage('Ingredients added to shopping list');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error('Error adding ingredients to Firestore:', error);
      setSuccessMessage('Failed to add ingredients.');
    }
  };

  return (
    <div className="card shadow-md p-4 text-xl">
      <h2 className="text-2xl font-bold mb-4">Ingredients</h2>

      {/* Servings Control */}
      <div className="flex items-center gap-5 mb-8 text-2xl">
        <span>
          {currentServings} serving{currentServings > 1 ? 's' : ''}
        </span>
        <button
          className="btn btn-xs text-xl btn-outline"
          onClick={() => changeServings(-1)}
        >
          -
        </button>
        <button
          className="btn btn-xs text-xl btn-outline"
          onClick={() => changeServings(1)}
        >
          +
        </button>
      </div>

      {/* Ingredients List */}
      <ul className="list-disc list-inside flex flex-col gap-4">
        {ingredients.map((ingredient) => (
          <li className="flex gap-4" key={ingredient.id}>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={selectedIngredients.some(
                (item) => item.id === ingredient.id
              )} // Use `id` or `name`
              onChange={() => handleIngredientCheck(ingredient)}
            />
            {toFraction(ingredient.amount)} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>

      {/* Success Message */}
      {successMessage && (
        <div
          role="alert"
          className="alert alert-success backdrop-blur bg-black/40 text-white text-lg flex justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Add to Shopping List Button */}
      <button
        onClick={addToShoppingList}
        className="btn btn-outline text-lg mt-4"
      >
        Add to shopping list
      </button>
    </div>
  );
};

export default Ingredients;
