import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust path as necessary
import { userAuth } from '../context/AuthContext';

export default function ShoppingListPage() {
  const [ingredients, setIngredients] = useState([]);
  const { user } = userAuth();

  useEffect(() => {
    // Fetch the ingredients from Firestore for the logged-in user
    const fetchIngredients = async () => {
      if (user) {
        try {
          const q = query(
            collection(database, 'ingredients'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const ingredientsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('Fetched Ingredients:', ingredientsList);
          setIngredients(ingredientsList);
        } catch (error) {
          console.error('Error fetching ingredients:', error);
        }
      }
    };

    fetchIngredients();
  }, [user]); // Re-fetch when user state changes

  const deleteIngredient = async (ingredientId) => {
    try {
      await deleteDoc(doc(database, 'ingredients', ingredientId));
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
      );
      console.log('Ingredient removed from Firestore');
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  return (
    <div className="flex-1 space-y-5 bg-base-200 text-gray-300 px-2 lg:px-10 xl:px-14 2xl:px-28 py-4 md:py-8 ml-0 lg:ml-64 min-h-screen mb-14 mt-7 lg:mt-0 lg:mb-0">
      <div className="p-5 space-y-16">
        <div>
          <p className="text-2xl text-gray-600">`{user.displayName}`</p>
          <h1 className="text-4xl font-bold">Shopping List</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 lg:px-5">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => {
              const imageUrl = ingredient.image
                ? `https://img.spoonacular.com/ingredients_100x100/${ingredient.image
                    .toLowerCase()
                    .replace(/\s/g, '-')}`
                : 'https://via.placeholder.com/100';

              return (
                <div key={ingredient.id} className="">
                  <div className="flex h-full flex-col justify-center items-center bg-white shadow-md h-48 rounded-lg text-center border-4 border-gray-600">
                    <img
                      src={imageUrl}
                      alt={ingredient.name || 'Unknown Ingredient'}
                    />
                    <p className="text-xl text-base-300 font-extrabold">
                      {ingredient.name || 'Unknown Ingredient'}
                    </p>
                  </div>
                  <div className="flex justify-center py-3">
                    <button
                      className="btn btn-sm btn-outline hover:bg-red-700 hover:text-white"
                      onClick={() => deleteIngredient(ingredient.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No ingredients found in your shopping list.</p>
          )}
        </div>
      </div>
    </div>
  );
}
