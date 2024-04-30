import React, { useState } from "react";
import "./styles.css";
import recipes from "../recipes.json";

export default function MealPlanGenerator() {
  const segments = Object.keys(recipes);

  const getDayOfWeek = () => {
    const dayOfWeek = new Date().getDay();
    return dayOfWeek; // Returns the day of the week (0 for Sunday, 1 for Monday, etc.)
  };

  const isPasta = (mealName) => {
    const meal = recipes.find((recipe) => recipe.name === mealName);
    return meal && meal.category.includes("pasta");
  };

  const getMealOption = (excludedMeals, pastaCount) => {
    const availableMeals = recipes.filter((recipe) => !excludedMeals.includes(recipe.name));
    let mealOption;

    if (pastaCount >= 2) {
      // If pasta count exceeds 2, choose a non-pasta meal
      const nonPastaMeals = availableMeals.filter((meal) => !isPasta(meal.name));
      mealOption = nonPastaMeals[Math.floor(Math.random() * nonPastaMeals.length)].name;
    } else {
      // Otherwise, choose any available meal
      mealOption = availableMeals[Math.floor(Math.random() * availableMeals.length)].name;
    }

    // Update pasta count if the chosen meal is pasta
    if (isPasta(mealOption)) {
      pastaCount++;
    }

    return { mealOption, pastaCount };
  };

  const [mealPlan, setMealPlan] = useState([]);
  const [pastaCount, setPastaCount] = useState(0);

  const generateMealPlan = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayOfWeek = getDayOfWeek();
    let excludedMeals = [];
    let selectedMeals = [];
    let weekPastaCount = 0;

    const generatedPlan = daysOfWeek.map((day, index) => {
      const offset = (currentDayOfWeek + index) % 7;
      let mealOption, newPastaCount;
      do {
        ({ mealOption, pastaCount: newPastaCount } = getMealOption(excludedMeals, weekPastaCount));
      } while (selectedMeals.includes(mealOption));

      excludedMeals.push(mealOption);
      selectedMeals.push(mealOption);

      if (isPasta(mealOption)) {
        weekPastaCount = newPastaCount;
      }

      return { day: daysOfWeek[offset], meal: mealOption };
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



