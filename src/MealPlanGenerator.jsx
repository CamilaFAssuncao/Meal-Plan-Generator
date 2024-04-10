import React, { useState } from "react";
import "./styles.css";
import recipes from "./recipes.json";

export default function MealPlanGenerator() {
  console.log("Recipes imported:", recipes);

  const segments = Object.keys(recipes);

  const getDayOfWeek = () => {
    const dayOfWeek = new Date().getDay();
    return dayOfWeek; // Returns the day of the week (0 for Sunday, 1 for Monday, etc.)
  };

  const isPasta = (mealName) => {
    const meal = recipes.find((recipe) => recipe.name === mealName);
    return meal && meal.category.includes("pasta");
  };

  const getMealOption = (dayOfWeek, excludedMeals) => {
    console.log("Current day of week:", dayOfWeek);

    let mealOption;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Every Saturday and Sunday
      const availableMeals = recipes.filter((recipe) => !isPasta(recipe.name) && !excludedMeals.includes(recipe.name));
      const randomIndex = Math.floor(Math.random() * availableMeals.length);
      mealOption = availableMeals[randomIndex].name; // Avoid pasta dishes and excluded meals
    } else {
      // Normal meal options
      const availableMeals = recipes.filter((recipe) => !excludedMeals.includes(recipe.name));
      const randomIndex = Math.floor(Math.random() * availableMeals.length);
      mealOption = availableMeals[randomIndex].name;
    }

    console.log("Chosen meal option:", mealOption);

    return mealOption;
};





  const [mealPlan, setMealPlan] = useState([]);

  const generateMealPlan = () => {
    const currentDayOfWeek = getDayOfWeek();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let excludedMeals = [];

    const generatedPlan = daysOfWeek.map((day, index) => {
      const meal = getMealOption((currentDayOfWeek + index) % 7, excludedMeals); // Wrap around to beginning of the week if needed
      excludedMeals.push(meal); // Exclude the chosen meal from future selections
      return { day, meal };
    });

    console.log("Generated meal plan:", generatedPlan);
    setMealPlan(generatedPlan);
  };

  return (
    <div className="App">
      <h1>Meal Plan Generator</h1>
      <button onClick={generateMealPlan}>Generate Meal Plan</button>
      {mealPlan.map((item, index) => (
        <p key={index}>
          {item.day}: {item.meal}
        </p>
      ))}
    </div>
  );
}
