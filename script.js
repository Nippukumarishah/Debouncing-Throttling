const searchInput = document.getElementById("searchInput");
const result = document.getElementById("results");
const api_url = "https://www.themealdb.com/api/json/v1/1/search.php";

let typetime;
const typeInterval = 300;

searchInput.addEventListener("input",() =>{
    clearInterval(typetime);
    typetime = setTimeout(search, typeInterval);
});
 async function search(){
    const searchTerm = searchInput.value;

    if(!searchTerm){
        result.innerHTML = "";
        return;
    }

    const res =await fetch(`${api_url}?s=${searchTerm}`);
    const data = await res.json();

    displayRecipes(data.meals);
}

function displayRecipes(recipes){
    result.innerHTML = "";

    if(!recipes){
        result.innerHTML ="<h3>No recipes found.</h3>";
        return;
    }
    recipes.forEach(recipe=> {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
        <h4>${recipe.strCategory}</h4>
        <img src ="${recipe.strMealThumb}" alt="${recipe.strMeal}"
        <h3>${recipe.strMeal}</h3>
        `;
        result.appendChild(recipeCard);
        
    });
}