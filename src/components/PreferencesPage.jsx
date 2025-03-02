import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Button, Box } from "@mui/material";

const PreferencesPage = () => {
  // ✅ Define options
  const allergyOptions = ["Gluten", "Dairy", "Peanuts", "Shellfish", "Soy"];
  const cuisineOptions = ["Italian", "Indian", "Mexican", "Japanese", "Mediterranean"];
  const nutrientOptions = ["Protein", "Carbohydrates", "Fats", "Fiber", "Vitamins"];

  // ✅ State for user selections
  const [allergies, setAllergies] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [nutrients, setNutrients] = useState([]);

  // ✅ Load preferences from localStorage (if available)
  useEffect(() => {
    const savedAllergies = JSON.parse(localStorage.getItem("allergies")) || [];
    const savedCuisines = JSON.parse(localStorage.getItem("cuisines")) || [];
    const savedNutrients = JSON.parse(localStorage.getItem("nutrients")) || [];

    setAllergies(savedAllergies);
    setCuisines(savedCuisines);
    setNutrients(savedNutrients);
  }, []);

  // ✅ Handle checkbox changes
  const handleCheckboxChange = (value, state, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // ✅ Save preferences
  const savePreferences = () => {
    localStorage.setItem("allergies", JSON.stringify(allergies));
    localStorage.setItem("cuisines", JSON.stringify(cuisines));
    localStorage.setItem("nutrients", JSON.stringify(nutrients));

    console.log("Preferences Saved:", { allergies, cuisines, nutrients });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, marginTop: 3 }}>
      {/* Allergies Card */}
      <Card sx={{ maxWidth: 500, padding: 2, backgroundColor: "#e0e1dd", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>Allergies</Typography>
          {allergyOptions.map((allergy) => (
            <FormControlLabel
              key={allergy}
              control={
                <Checkbox
                  checked={allergies.includes(allergy)}
                  onChange={() => handleCheckboxChange(allergy, allergies, setAllergies)}
                />
              }
              label={allergy}
            />
          ))}
        </CardContent>
      </Card>

      {/* Cuisine Card */}
      <Card sx={{ maxWidth: 500, padding: 2, backgroundColor: "#e0e1dd", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>Preferred Cuisines</Typography>
          {cuisineOptions.map((cuisine) => (
            <FormControlLabel
              key={cuisine}
              control={
                <Checkbox
                  checked={cuisines.includes(cuisine)}
                  onChange={() => handleCheckboxChange(cuisine, cuisines, setCuisines)}
                />
              }
              label={cuisine}
            />
          ))}
        </CardContent>
      </Card>

      {/* Nutrient Focus Card */}
      <Card sx={{ maxWidth: 500, padding: 2, backgroundColor: "#e0e1dd", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>Nutrient Focus</Typography>
          {nutrientOptions.map((nutrient) => (
            <FormControlLabel
              key={nutrient}
              control={
                <Checkbox
                  checked={nutrients.includes(nutrient)}
                  onChange={() => handleCheckboxChange(nutrient, nutrients, setNutrients)}
                />
              }
              label={nutrient}
            />
          ))}
        </CardContent>
      </Card>

      {/* Save Preferences Button */}
      <Button
        variant="contained"
        sx={{ backgroundColor: "#1b4965", color: "white", "&:hover": { backgroundColor: "#0e3a53" } }}
        onClick={savePreferences}
      >
        Save Preferences
      </Button>
    </Box>
  );
};

export default PreferencesPage;
