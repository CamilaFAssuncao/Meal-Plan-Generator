// MealPlan.js
import React, { useState } from "react";
import styled from 'styled-components';
import Modal from "../Modal"; // Import a modal component for displaying recipe details

const MealPlan = ({ selectedMeal, recipes }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleImageClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Meal Plan for the Next 7 Days</h2>
      <div className="meal-plan-container">
        {Object.entries(selectedMeal).map(([day, meal]) => (
          <div key={day} className="meal-plan-item">
            <h3>{day}</h3>
            <img
              src={recipes[meal].image}
              alt={recipes[meal].name}
              onClick={() => handleImageClick(recipes[meal])}
            />
            <p>{recipes[meal].name}</p>
          </div>
        ))}
      </div>
      {showModal && <Modal recipe={selectedRecipe} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MealPlan;











