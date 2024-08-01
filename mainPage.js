




const recipeCards = document.querySelectorAll('.recipe-card');

recipeCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('expanded');

        const recipeId = card.dataset.recipeId;

        if (card.classList.contains('expanded')) {
            fetchRecipeDetails(recipeId)
                .then(recipe => {
                    const recipeDetailsContainer = card.querySelector('.recipe-details');
                    recipeDetailsContainer.innerHTML = `
         <h4>Ingredients</h4>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
                    </ul>
                    <h4>Instructions</h4>
                    <p>${recipe.instructions}</p>
                    <p> Prep_Time: ${recipe.prep_time}</p>
                    <p> Cook_Time: ${recipe.cook_time}</p>
                    <p> Servings: ${recipe.servings}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching recipe details:', error);
                });
        } else {
            card.querySelector('.recipe-details').innerHTML = '';
        }
    });
});

async function fetchRecipeDetails(recipeId) {

  const response = await fetch(`http://127.0.0.1:8080/api/recipes/${recipeId}`);

  const recipe = await response.json();

  return recipe;

}




// document.addEventListener('DOMContentLoaded', fetchRecipes);
document.querySelector("#createRecipeForm")?.addEventListener("submit", saveRecipe);


