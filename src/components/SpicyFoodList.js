import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return filterBy === food.cuisine;
    }
  });


  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  // This function uses the passed in "id" for the clicked "li". filter removes that items and re-render the updated list. 
  // 
  // function handleLiClick(id) {
  //   const removeFood = foods.filter((food) => food.id !== id);
  //   setFoods(removeFood)
  // }


  function handleLiClick(id) {
    const updateHeatLevel = foods.map((food) => {
      // if the id passed from our click matches an id in our food array
      // we want to increment the heatLevel and update with the setState 
      if(food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1
        };
      } else {
        // If we don't find a match for our passed in id, we want to return the new/mapped array. 
        // This triggers a re-render.
        return food;
      }  
    });
    setFoods(updateHeatLevel);
  };

  function handleFilteredChange(event) {
    setFilterBy(event.target.value)
  };

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));
 
  return (
    <div>
      <select name="filter" onChange={handleFilteredChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select> 
      <ul>{foodList}</ul>
      <button onClick={handleAddFood}>Add New Food</button>
    </div>
    
  );
}

export default SpicyFoodList;