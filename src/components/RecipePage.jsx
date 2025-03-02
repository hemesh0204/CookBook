import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeDetails from "../components/RecipeDetails";
import { db } from "../firebase/firebaseConfig";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";

const RecipePage = () => {
  const { recipeTitle } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipeData, setRecipeData] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(db, "recipes", recipeTitle);
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          console.log("Reciepe found in firebase");
          setRecipeData(recipeSnap.data());
          setLoading(false);
          return;
        }

        const { allergies, cuisines, nutrients } = getUserPreferences();

        let preferenceQuery = "";

        if (cuisines.length > 0) {
          preferenceQuery += ` The recipe should be from one of these cuisines: ${cuisines.join(
            ","
          )}.`;
        }

        if (allergies.length > 0) {
          preferenceQuery += ` Avoid ingredients that contain: ${allergies.join(
            ","
          )}.`;
        }

        if (nutrients.length > 0) {
          preferenceQuery += ` Focus on maximizing the following nutrients: ${nutrients.join(
            ","
          )}.`;
        }

        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "llama-3.1-8b-instant",
              messages: [
                {
                  role: "user",
                  content: `You are a professional nutritionist and recipe generator.

                  You must generate a structured JSON response for the recipe titled "${recipeTitle}" while strictly following the user's dietary preferences. 

                  Important Rules: 
                  - You must adhere to the provided user preferences.
                  - Do not include any ingredients the user is allergic to.
                  - The recipe must match at least one of the preferred cuisines.
                  - Maximize the requested nutrients in the ingredient selection.

                  **User Preferences**:
                  ${preferenceQuery}

                  Your response must strictly follow this JSON format** with no extra text, no markdown, and no explanations:
                  {
                    "name": "${recipeTitle}",
                    "servings": 4,
                    "cooking_time": "30 minutes",
                    "nutritional_info": {
                      "calories": 500,
                      "protein": "30g",
                      "carbohydrates": "50g",
                      "fat": "20g"
                    },
                    "allergens": ["gluten", "dairy"],
                    "ingredients": [
                      { "item": "Ingredient1", "quantity": "1 cup" },
                      { "item": "Ingredient2", "quantity": "2 tablespoons" }
                    ],
                    "instructions": [
                      { "step 1": "Step 1 description." },
                      { "step 2": "Step 2 description." }
                    ]
                  }
                  Do NOT ignore any of the user's preferences. Your response will be rejected if any ingredient violates the user's restrictions.
                  Only return valid JSON. No markdown, no explanations, and no additional text.`,
                },
              ],
              max_tokens: 6000,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        let content = data.choices[0].message.content;

        // Remove potential Markdown formatting
        content = content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        try {
          content = JSON.parse(content);
          setRecipeData(content);
          saveRecipeToFirestore(content);
        } catch (error) {
          console.error("Failed to parse content. Raw response:", content);
          setRecipeData(null);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setRecipeData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeTitle, apiKey]);

  const saveRecipeToFirestore = async (recipeData) => {
    try {
      const recipeRef = doc(db, "recipes", recipeData.name);
      await setDoc(recipeRef, recipeData);
      console.log("Recipe added to firebase");
    } catch (error) {
      console.log("error saving data to fireabse", error);
    }
  };
  const getUserPreferences = () => {
    const allergies = JSON.parse(localStorage.getItem("allergies")) || [];
    const cuisines = JSON.parse(localStorage.getItem("cuisines")) || [];
    const nutrients = JSON.parse(localStorage.getItem("nutrients")) || [];

    return { allergies, cuisines, nutrients };
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : recipeData ? (
        <RecipeDetails param={recipeData} />
      ) : (
        <p>Error loading recipe.</p>
      )}
    </div>
  );
};

export default RecipePage;
