const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// Function to get recipes
const feachRecipes = async (query) => {
    recipeContainer.innerHTML ="<center><h2>Fetching Recipes....<h2></center>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML ="";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
       

        // Adding addEventListener to recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);

    });
    // Function to fetch ingredients and measurements
    const fetchIngredients = (meal) => {
        let ingredientsList = "";
        for(let i=1; i<=20; i++){
            const ingredient = meal[`strIngredient${i}`];
            if(ingredient){
                const measure = meal[`strMeasure${i}`];
                ingredientsList += `<li> ${measure} ${ingredient}</li>`

            }
            else{
                break;
            }
            
        }
        return ingredientsList;

    }
    // console.log(response.meals[0]);
    const openRecipePopup = (meal)=>{
        recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}
        <h3>Ingredents:<h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instruction:</h3>
            <p class="recipeinstructions">${meal.strInstructions}</p>
        </div>
        `
        recipeDetailsContent.parentElement.style.display = "block";


    }
    

}
recipeCloseBtn.addEventListener('click', () =>{
    recipeDetailsContent.parentElement.style.display = "none";
});
 
searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const searchInput = searchBox.value.trim();
        feachRecipes(searchInput);
        // console.log("Button Clicked");
    });
