import React, { useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GenerateIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchIdeas = async () => {
    setLoading(true);
    try {
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
                content:
                  "Provide exactly 10 recipe titles in this JSON format, and nothing else:\n" +
                  '{ "recipe": ["Title1", "Title2", "Title3", ...] }',
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
      try {
        content = JSON.parse(content);
        setIdeas((prevIdeas) => ({
          recipe: [...(prevIdeas.recipe || []), ...content.recipe],
        }));
      } catch (error) {
        console.error("Failed to parse content. Raw response:", content);
        return;
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        pt: 0,
      }}
    >
      <Button
        onClick={fetchIdeas}
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#0d1b2a",
          height: "130px",
          width: "530px",
          borderRadius: "8px",
          fontSize: "1rem",
          mb: 0.5,
          "&:hover": { backgroundColor: "#d63a3a" },
        }}
      >
        Generate Ideas
      </Button>

      {loading && <CircularProgress color="primary" />}

      {ideas.recipe?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            maxWidth: "80%",
            mt: 2,
          }}
        >
          {ideas.recipe.map((recipe, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => navigate(`/recipe/${encodeURIComponent(recipe)}`)}
              sx={{
                backgroundColor: "#415a77", // Coral Red
                color: "white",
                borderColor: "#415a77",
                "&:hover": { backgroundColor: "#d63a3a" },
                fontSize: "1rem",
                padding: "10px",
                width: "18%",
                minWidth: "150px",
              }}
            >
              {recipe}
            </Button>
          ))}
        </Box>
      )}

      {selectedRecipe && <ideas recipeTitle={selectedRecipe} />}
    </Box>
  );
};

export default GenerateIdeas;
