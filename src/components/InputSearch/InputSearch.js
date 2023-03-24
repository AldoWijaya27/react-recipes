import React, { useState, useEffect } from "react";
import Recipes from "../Recipes/Recipes";
import "./InputSearch.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const InputSearch = () => {
  const MY_ID = "48472f72";
  const MY_KEY = "b988c1b3608661de438a581172b21309";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("honey");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}&imageSize=SMALL `);
      const data = await response.json();
      if (data.count === 0) {
        MySwal.fire("No recipes found.");
        setMySearch("");
      }

      setMyRecipes(data.hits);
    }
    fetchData();
  }, [wordSubmitted]);

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  };

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(`${mySearch} `);
  };

  return (
    <div>
      <h1>RECIPES APP</h1>
      <div className="center">
        <form className="form" onSubmit={finalSearch}>
          <input className="input-field" placeholder="Serch by ingredients e.g. egg shrimp" onChange={myRecipeSearch} value={mySearch} type="text" spellCheck="true" />
          <button className="search-button">submit</button>
        </form>
      </div>
      <div className="container">
        {myRecipes.map((element, index) => (
          <Recipes label={element.recipe.label} calories={element.recipe.calories} ingredientLines={element.recipe.ingredientLines} image={element.recipe.image} type={element.recipe.cuisineType} key={index} />
        ))}
      </div>
    </div>
  );
};

export default InputSearch;
