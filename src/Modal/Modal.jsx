import React from "react";

const Modal = ({ recipe, onClose }) => {
  // Check if recipe is null or undefined before accessing its properties
  if (!recipe) {
    return null; // Return null if recipe is not provided
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{recipe.name}</h2>
        <p>Ingredients:</p>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;

