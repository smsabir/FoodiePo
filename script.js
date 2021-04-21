const handleSearch = () => {
    document.getElementById('single-recpie').innerHTML = ''
    const getInput = document.getElementById('search-input')
    const searchString = getInput.value

    let url;
    searchString.length && searchString.length === 1? 
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchString}` :  url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`;

    fetch(url)
    .then(res => res.json())
    .then(data => loadRecipes(data.meals))
    .catch((err) => showErrorMsg("Sorry! Nothing found! Pls try again."));
}


const loadRecipes = (recipes) => {

    const searchString = document.getElementById('search-input');
    const showMsg = document.getElementById('show-msg');
    const searchResultCount =  `<p class="text-secondary text-center">${recipes.length} results for "${searchString.value}" Recipe</p>`;
    showMsg.innerHTML = searchResultCount;

    document.getElementById('all-recpie').innerHTML = '';
    document.getElementById('search-input').value = '';
    const allRecipe = document.getElementById('all-recpie');
    
    recipes.map(recipe => {
        const { strMeal, strMealThumb, idMeal } = recipe
        const recipeInnerCode =`
            <a onclick="showRecipeDetails(${idMeal})" href="#single-recpie"><div class="card h-100">
                <img src="${strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body bg-light text-dark">
                <h5 class="card-title text-center text-decoration-none">${strMeal}</h5>
                </div>
            </div></a>`
        allRecipe.innerHTML += recipeInnerCode;
    })

}


const showRecipeDetails = (id) => {
    document.getElementById('single-recpie').style.display = "relative";
    
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            fullDetails(data.meals)
            console.log(data.meals)
        })
        .catch((error) => showErrorMsg("Loading Failed! Try Again."));
}


const fullDetails = (recipes) => {

    const singleRecipe = document.getElementById('single-recpie');
    const recipe = recipes[0];
    const {strMealThumb, strMeal} = recipe;
    const ingredients = [];
    for (let i = 1; i < 15; i++) {
        if(recipe[`strIngredient${i}`]) {
            ingredients.push(`
                ${recipe[`strMeasure${i}`]}  ${recipe[`strIngredient${i}`]}
            `)
        } else {
            break;
        }
    }
    
    const fullDetailsHtml =
        `<div class="col-md-5 mb-5"> 
            <img class="img-fluid rounded mb-4" src="${strMealThumb}" alt="">
        </div>
        <div class="col-md-5 "> 
            <h2 class=" mb-4">${strMeal}</h2>
            <h4 class=" mb-4">Ingredients: </h4>
            <ul class="ing-list">
                ${ingredients.map(ingredient => `<li> <i class="fas fa-check-square"></i>${ingredient}</li>`).join('')}
            </ul>
        </div>`

    singleRecipe.innerHTML = fullDetailsHtml;
}

const showErrorMsg = (error) => {

    const showMsg = document.getElementById('show-msg');
    const allRecipe = document.getElementById('all-recpie');

    allRecipe.innerHTML = "";
    const errorMsg = `<p class="text-danger text-center">${error}</p>`;
    showMsg.innerHTML = errorMsg;
   
}