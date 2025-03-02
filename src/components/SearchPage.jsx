import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { TextField, Button, Box } from "@mui/material";
import RecipeDetails from "../components/RecipeDetails";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  const getUserPreferences = () => {
    const allergies = JSON.parse(localStorage.getItem("allergies")) || [];
    const cuisines = JSON.parse(localStorage.getItem("cuisines")) || [];
    const nutrients = JSON.parse(localStorage.getItem("nutrients")) || [];
    return { allergies, cuisines, nutrients };
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    navigate(`/recipe/${encodeURIComponent(query)}`);
   

    try {
      // ✅ Step 1: Check if query exists in Firebase
      const queryRef = doc(db, "searches", query);
      const querySnap = await getDoc(queryRef);

      if (querySnap.exists()) {
        console.log("✅ Found in Firebase:", querySnap.data());
        setSearchResult(querySnap.data()); // ✅ Load existing result
        setLoading(false);
        return;
      }

      // ✅ Step 2: Get user preferences and format them into the API request
      const { allergies, cuisines, nutrients } = getUserPreferences();
      let preferenceQuery = "\n";

      if (cuisines.length > 0) {
        preferenceQuery += `- The recipe should be from one of these cuisines: ${cuisines.join(", ")}.\n`;
      }
      if (allergies.length > 0) {
        preferenceQuery += `- Avoid ingredients that contain: ${allergies.join(", ")}.\n`;
      }
      if (nutrients.length > 0) {
        preferenceQuery += `- Focus on maximizing the following nutrients: ${nutrients.join(", ")}.\n`;
      }

      console.log("🔍 Sending API request with preferences:", preferenceQuery);

      // ✅ Step 3: Query Groq API (Structured Like RecipePage)
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
                content: `Generate a structured JSON response for the user search query: "${query}". 

                🚨 **Important Rules**:
                - The query should be treated like a recipe request.
                - If the query is about a specific dish, return a structured recipe.
                - If the query is general (e.g., best protein sources, healthy breakfast ideas), create a suitable recipe.
                - Do not include markdown, extra text, or explanations.

                ✅ **User Preferences**:
                ${preferenceQuery}

                ✅ **Strict JSON Format**:
                {
                  "name": "${query}",
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
                }`
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

      // ✅ Clean JSON response
      content = content.replace(/```json/g, "").replace(/```/g, "").trim();

      try {
        content = JSON.parse(content);
        setSearchResult(content);
        saveSearchToFirestore(content); 
      } catch (error) {
        console.error("⚠️ Failed to parse content. Raw response:", content);
        setSearchResult(null);
      }
    } catch (error) {
      console.error("❌ Error fetching search results:", error);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save Search Results to Firebase
  const saveSearchToFirestore = async (searchData) => {
    try {
      const queryRef = doc(db, "searches", searchData.name);
      await setDoc(queryRef, searchData);
    } catch (error) {
      console.error("❌ Error saving search query to Firebase:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 3 }}>
      {/* Search Bar */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 2, width: "90%", maxWidth: "800px", mx: "auto" }}>
        <TextField
          variant="outlined"
          placeholder="Search for recipes, nutrients, or food facts..."
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            backgroundColor: "#e0e1dd",
            height: "70px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              height: "100%",
              fontSize: "1.2rem",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "#0d1b2a",
            height: "70px",
            borderRadius: "8px",
            px: 4,
            fontSize: "1rem",
            "&:hover": { backgroundColor: "#d63a3a" },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Pass search result directly to RecipeDetails */}
      {loading && <p>Loading...</p>}
      {searchResult && <RecipeDetails param={searchResult} />}
    </Box>
  );
};

export default SearchPage;
