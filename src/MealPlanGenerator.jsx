import React from "react";
import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";
import { mealOptions } from "./mealOptions";
import recipes from "./recipes.json";

export default function MealPlanGenerator() {
  const segments = Object.keys(mealOptions);
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F"
  ];

  const getDayOfWeek = () => {
    const dayOfWeek = new Date().getDay();
    return dayOfWeek; // Returns the day of the week (0 for Sunday, 1 for Monday, etc.)
  };

  const getMealOption = () => {
    const dayOfWeek = getDayOfWeek();
    let mealOption;
  
    // Fixed recipe options
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Monday to Friday
      mealOption = recipes.shrimp_wrap;
    } else if (dayOfWeek === 4) {
      // Every Thursday
      mealOption = recipes.fries;
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Every Saturday and Sunday
      mealOption = recipes.new_recipe;
    } else if (dayOfWeek === 6 || dayOfWeek === 0) {
      // Once a month on Saturday or Sunday
      mealOption = recipes.eat_out;
    } else {
      // Normal meal options
      const randomIndex = Math.floor(Math.random() * segments.length);
      mealOption = segments[randomIndex];
    }
  
    return mealOption;
  };
  
  

  const onFinished = (winner) => {
    console.log(winner);
  };

  return (
    <div className="App">
      <h1>Meal Plan Generator</h1>
      <div>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={300}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
        />
      </div>
      <p>Today's meal: {getMealOption()}</p>
    </div>
  );
}
