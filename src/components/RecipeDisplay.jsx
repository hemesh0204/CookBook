import React from "react";
import "../styling/RecipeDisplay"

const RecipeDisplay = ({ recipe }) => {
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-container">
      {Object.keys(recipe).map((section, index) => (
        <div key={index} className="recipe-section">
          <h2>{section}</h2>

          {recipe[section].map((item, idx) => {
            if (typeof item === "string") {
              return <p key={idx}>{item}</p>; // Plain text sections
            } else if (Array.isArray(item)) {
              return (
                <ul key={idx}>
                  {item.map((listItem, listIdx) => (
                    <li key={listIdx}>{listItem}</li>
                  ))}
                </ul>
              );
            } else if (typeof item === "object") {
              const subSectionKey = Object.keys(item)[0]; // Get subsection name
              return (
                <div key={idx}>
                  <h3>{subSectionKey}</h3>
                  <ul>
                    {item[subSectionKey].map((subItem, subIdx) => (
                      <li key={subIdx}>{subItem}</li>
                    ))}
                  </ul>
                </div>
              );
            } else if (section === "Instructions" && recipe[section].steps) {
              return (
                <ol key={idx} className="instructions-list">
                  {recipe[section].steps.map((step, stepIdx) => (
                    <li key={stepIdx}>{step}</li>
                  ))}
                </ol>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default RecipeDisplay;
