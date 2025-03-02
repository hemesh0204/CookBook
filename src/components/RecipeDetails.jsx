import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

const RecipeDetails = ({ param }) => {
  if (!param) return <p>No recipe data Available</p>;

  return (
    <>
      <Card
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 2,
          mt: 5,
          backgroundColor: "#e0e1dd", // Soft Gray for Card
          color: "#1b263b", // Charcoal Gray for Text
          border: "2px solid #778da9", // Muted Blue Border
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft Shadow
          borderRadius: "10px", // Slightly rounded corners
        }}
      >
        <CardContent>
          <h1 style={{ textAlign: "center" }}>{param.name}</h1>

          <h3>Servings: {param.servings}</h3>
          <h3>Cooking Time: {param.cooking_time}</h3>
          <h2>Ingredients</h2>
          <ul>
            {param.ingredients?.map((item, index) => (
              <li key={index}>
                {item.quantity} of {item.item}
              </li>
            ))}
          </ul>
          {param.allergens?.length > 0 && (
            <div style={{ color: "red", fontWeight: "bold" }}>
              ⚠️ Contains: {param.allergens.join(", ")}
            </div>
          )}
          <h2>Nutritional Information</h2>
          <ul style={{ paddingLeft: "20px", listStyleType: "none" }}>
            {Object.entries(param.nutritional_info || {}).map(
              ([key, value]) => (
                <li key={key}>
                  <strong>{key.replace("_", " ").toUpperCase()}:</strong>{" "}
                  {value}
                </li>
              )
            )}
          </ul>

          <h2>Instructions</h2>
          <ol>
            {param.instructions?.map((stepObj, index) => (
              <li key={index}>{Object.values(stepObj)[0]}</li> // Extracts the description directly
            ))}
          </ol>
        </CardContent>
      </Card>
    </>
  );
};

export default RecipeDetails;
