const apiUrl = `http://127.0.0.1:8080/api/recipes`;


async function fetchRecipes() {

    try {
        const response = await axios.get(apiUrl);
        const recipes = response.data;
        const recipesList = document.getElementById(`recipe-list`);
        recipesList.innerHTML = '';

        recipes.forEach(recipe => {
            const recipeRow = `

                <tr>
                    <td>${recipe.id}</td>
                    <td>${recipe.title}</td>
                    <td>${recipe.description}</td>
                    <td>${recipe.instructions}</td>
                    <td>${recipe.prep_time}</td>
                    <td>${recipe.cook_time}</td>
                    <td>${recipe.servings}</td>
                    <td>
                        <button class="edit" value=${recipe.id}>Edit</button>
                        <button class="delete" value=${recipe.id}>Delete</button>
                    </td>
                </tr>
            `;
            recipesList.insertAdjacentHTML('beforeend', recipeRow);
        });
        editDeleteButtons();
    }catch (error){
        console.error('Error fetching recipes:', error);
    }
}


async function saveRecipe(event) {

    console.log("save");
    event.preventDefault();

    const id = document.getElementById('recipe-id') ? document.getElementById('recipe-id').value : null;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const instructions = document.getElementById('instructions').value;
    const prepTime = document.getElementById('prep_time').value;
    const cookTime = document.getElementById('cook_time').value;
    const servings = document.getElementById('servings').value;
    const ingredients = [];
    const ingredientInputs = document.querySelectorAll('[name="ingredients[]"]');
    ingredientInputs.forEach((input) => {
        ingredients.push({
            name: input.value,
        });
    });

    console.log(id);
    try {
        if (id) {
            await axios.put(`${apiUrl}/${id}`, { title, description, instructions, prep_time: prepTime, cook_time: cookTime, servings, ingredients });
        } else {
            await axios.post(apiUrl, { title, description, instructions, prep_time: prepTime, cook_time: cookTime, servings, ingredients });
        }
        window.location.href = "http://127.0.0.1:5500/views/create.html";
    } catch (error) {
        console.error('Error saving recipe:', error);
    }
}






async function editRecipe() {
    console.log("Editing recipe");
    const id = document.URL.split("=").pop()
    console.log(id);
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const recipe = response.data;

        document.getElementById('recipe-id').value = recipe.id;
        document.getElementById('title').value = recipe.title;
        document.getElementById('description').value = recipe.description;
        document.getElementById('instructions').value = recipe.instructions;
        document.getElementById('prep_time').value = recipe.prep_time;
        document.getElementById('cook_time').value = recipe.cook_time;
        document.getElementById('servings').value = recipe.servings;
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }   
}


function editDeleteButtons() {
    let buttonsEdit = document.querySelectorAll(".edit");
    console.log(buttonsEdit);
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function() {
            let id = this.value;
            window.location.href = `create.html?id=${id}`;
        });
    });
    
    let buttonsDelete = document.querySelectorAll(".delete");
    console.log(buttonsDelete);
    buttonsDelete.forEach(button => {
        button.addEventListener("click", function() {
            let id = this.value;
            deleteRecipe(id);
        });
    });
}

async function deleteRecipe(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchRecipes();
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
}




const addIngredientButton = document.getElementById('addIngredient');
const ingredientList = document.getElementById('ingredientList');

addIngredientButton.addEventListener('click', () => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="text" name="ingredients[]" placeholder="Ingredient Name">
      <button type="button" class="removeIngredient">Remove</button>
    `;
    ingredientList.appendChild(li);

  // Add event listener for removing ingredients
  const removeButton = li.querySelector('.removeIngredient');
  removeButton.addEventListener('click', (event) => {
    ingredientList.removeChild(li);
  });
});



  


document.addEventListener('DOMContentLoaded', fetchRecipes);
document.querySelector("#createRecipeForm")?.addEventListener("submit", saveRecipe);






