import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore"; // ✅ Correct Firestore Import
import { Button, Box, Typography, Card, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipeNames = querySnapshot.docs.map((doc) => doc.data().name);
        setHistory(recipeNames);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Box sx={{ margin: 5 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          margin: 2,
          fontWeight: "bold",
          color: "#0d1b2a", 
          letterSpacing: "1.5px", 
          textTransform: "uppercase", 
          padding: "10px", 
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)", 
        }}
      >
        Visited Recipes
      </Typography>

      {history.length > 0 ? (
        history.map((recipe, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: 2,
              padding: 2,
              backgroundColor: "#e0e1dd",
              border: "2px solid #415a77",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
            }}
          >
            <CardHeader title={recipe} />
            <Button
              variant="contained"
              sx={{
                margin: 1,
                backgroundColor: "#1b4965",
                color: "white",
                "&:hover": { backgroundColor: "#d63a3a" },
              }}
              onClick={() => navigate(`/recipe/${encodeURIComponent(recipe)}`)}
            >
              View Recipe
            </Button>
          </Card>
        ))
      ) : (
        <Typography>No Recipe History. Please search for a recipe.</Typography>
      )}
    </Box>
  );
};

export default HistoryPage;
