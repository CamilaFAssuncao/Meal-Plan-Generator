import React, { useState } from "react";
import styled from "styled-components";
import recipes from "../recipes.json";
import logo from "../logo.png";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LogoBar = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px; /* Adjust size as needed */
  height: auto;
  margin-right: 10px;
`;

const MenuTitle = styled.h1`
  font-family: 'Pacifico', cursive;
  margin: 0;
  color: #345B3F;
`;

const GenerateButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #F68D51;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #447453;
  }
`;

const MealItem = styled.p`
  margin: 5px 0;
`;

export default function MealPlanGenerator() {
  const [mealPlan, setMealPlan] = useState([]);
  const [pastaCount, setPastaCount] = useState(0);

  const getDayOfWeek = () => {
    const dayOfWeek = new Date().getDay();
    return dayOfWeek; // Returns the day of the week (0 for Sunday, 1 for Monday, etc.)
  };

  const isPasta = (mealName) => {
    const meal = recipes.find((recipe) => recipe.name === mealName);
    return meal && meal.category.includes("pasta");
  };

  const getMealOption = (excludedMeals, currentDay) => {
    const availableMeals = recipes.filter((recipe) => !excludedMeals.includes(recipe.name));
    let mealOption;

    if (currentDay === 4) {
      // Select fries only on Thursday
      mealOption = "Fries";
    } else if (pastaCount >= 2) {
      // If pasta count exceeds 2, choose a non-pasta meal
      const nonPastaMeals = availableMeals.filter((meal) => !isPasta(meal.name));
      mealOption = nonPastaMeals[Math.floor(Math.random() * nonPastaMeals.length)].name;
    } else {
      // Otherwise, choose any available meal
      mealOption = availableMeals[Math.floor(Math.random() * availableMeals.length)].name;
    }

    // Update pasta count if the chosen meal is pasta
    if (isPasta(mealOption)) {
      setPastaCount((prevPastaCount) => prevPastaCount + 1);
      console.log("Pasta count:", pastaCount + 1); // Log the updated pasta count
    }

    return mealOption;
  };

  const generateMealPlan = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayOfWeek = getDayOfWeek();
    let excludedMeals = [];
    let weekPastaCount = 0;
    let pastaDishes = [];

    const generatedPlan = daysOfWeek.map((day, index) => {
      const offset = (currentDayOfWeek + index) % 7; // Calculate the offset correctly
      const mealOption = getMealOption(excludedMeals, offset);
      excludedMeals.push(mealOption);

      if (isPasta(mealOption)) {
        weekPastaCount++;
        pastaDishes.push({ day: daysOfWeek[offset], meal: mealOption });
      }

      return { day: daysOfWeek[offset], meal: mealOption };
    });

    console.log("Generated meal plan:", generatedPlan);
    console.log("Pasta dishes in the menu:", pastaDishes);
    setMealPlan(generatedPlan);
    setPastaCount(0); // Reset pasta count for the next week
  };

  return (
    <AppContainer>
      <LogoBar>
        <LogoImage src={logo} alt="logo" />
        <MenuTitle>Menu Maker</MenuTitle>
      </LogoBar>
      <GenerateButton onClick={generateMealPlan}>Make My Menu</GenerateButton>
      {mealPlan.map((item, index) => (
        <MealItem key={index}>
          {item.day}: {item.meal}
        </MealItem>
      ))}
    </AppContainer>
  );
}







