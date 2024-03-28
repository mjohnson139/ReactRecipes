import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Endpoints Configuration
const API_BASE_URL = 'https://themealdb.com/api/json/v1/1';
const endpoints = {
  getList: `${API_BASE_URL}/filter.php?c=Dessert`,
  getMealById: id => `${API_BASE_URL}/lookup.php?i=${id}`,
};

// Model Structures Equivalent
// Note: In JavaScript, we typically use plain objects and arrays for models.

// ApiClient - Handling API requests
const ApiClient = {
  getList: async () => {
    const response = await axios.get(endpoints.getList);
    return response.data;
  },
  getMealById: async (id) => {
    const response = await axios.get(endpoints.getMealById(id));
    return response.data;
  },
};

// MealList Component (ViewModel + View)
const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Equivalent to MealListModel's loadList()
  const loadList = async () => {
    try {
      const data = await ApiClient.getList();
      setMeals(data.meals);
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  // Equivalent to MealListModel's mealTapped()
  const mealTapped = async (mealId) => {
    try {
      const meal = await ApiClient.getMealById(mealId);
      console.log('Meal details:', meal);
      // Here you can handle navigation or display details
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {errorMessage && <p>Error: {errorMessage}</p>}
      <ul>
        {meals.map(meal => (
          <li key={meal.id} onClick={() => mealTapped(meal.id)}>
            {meal.strMeal}
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// App Component - Main Entry Point
const App = () => {
  return (
    <div className="app">
      <MealList />
    </div>
  );
};

export default App;
