import React, { useEffect, useState } from 'react';
import './App.css'; 
import Recipe from './components/Recipe'; 

const App = () => { 
  const APP_ID = '582c8749'; 
  const APP_KEY = 'd9a267be386805cec234d2f6fc2c9d32';
  const [recipes, setRecipes] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [query, setQuery] = useState("chicken"); 

  useEffect(() => { 
    getRecipes(); 
  }, [query]); 

  const getRecipes = async () => { 
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    ); 
    const data = await response.json(); 
    setRecipes(data.hits); 
  }; 

  const updateSearch = e => { 
    setSearch(e.target.value); 
  }; 

  const getSearch = e => { 
    e.preventDefault(); 
    setQuery(search); 
    setSearch(""); 
  }; 

  return ( 
    <div className="App"> 
      <form className="search-form" onSubmit={getSearch}> 
        <input 
          className="search-bar" 
          type="text" 
          value={search} 
          onChange={updateSearch} 
        /> 
        <button className="search-button" type="submit"> 
          Search 
        </button> 
      </form> 
      <div className="recipes"> 
        {recipes.map((recipe, index) => (
          <Recipe 
            key={recipe.recipe.uri} // Use a unique identifier
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image} 
            ingredients={recipe.recipe.ingredients} 
          /> 
        ))} 
      </div> 
    </div> 
  ); 
}; 

export default App;
