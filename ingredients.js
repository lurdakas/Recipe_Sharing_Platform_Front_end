const apiUrl = 'http://127.0.0.1:8080/api/ingredients';


async function fetchIngredients() {

    try {
        const response = await axios.get(apiUrl);
        const ingredients = response.data;
        const ingredientsList = document.getElementById(`ingredients-list`);
        ingredientsList.innerHTML = '';

        ingredients.forEach(ingredient => {
            const ingredientRow = `

                <tr>
                    <td>${ingredient.id}</td>
                    <td>${ingredient.name}</td>
                    <td>${ingredient.recipe_id}</td>


                   
                    <td>
                        <button class="edit" value=${ingredient.id}>Edit</button>
                        <button class="delete" value=${ingredient.id}>Delete</button>
                    </td>
                </tr>
            `;
            ingredientsList.insertAdjacentHTML('beforeend', ingredientRow);
        });
        editDeleteButtons();
    }catch (error){
        console.error('Error fetching ingredients:', error);
    }
}


async function saveIngredient (event){

    console.log("save");
    event.preventDefault();

   
    const id = document.getElementById('ingredient-id')?.value || null;
    const name = document.getElementById('name').value;
    const recipeId = document.getElementById('recipe-id')?.value || null;
  
    console.log('Id:', id);
    console.log('Name:', name);
    console.log('Recipe Id:', recipeId);
  

    
    try {
        if (id) {
            await axios.put(`${apiUrl}/${id}`, {name, recipe_id: recipeId });
        } else {
            await axios.post(apiUrl, {name, recipe_id: recipeId });
        }
        window.location.href = "http://127.0.0.1:5500/views/ingredients.html";
    } catch (error) {
        console.error('Error saving ingredient:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}


async function editIngredient() {
    console.log("editing");
    const id = document.URL.split("=").pop()
    console.log(id);
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const ingredient = response.data;

        document.getElementById('ingredient-id').value = ingredient.id;
        document.getElementById('name').value = ingredient.name;
        document.getElementById('recipe-id').value = ingredient.recipe.id;

    } catch (error) {
        console.error('Error fetching ingredient:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

function editDeleteButtons() {
    let buttonsEdit = document.querySelectorAll(".edit");
    // console.log(buttonsEdit);
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function() {
            let id = this.value;
            window.location.href = `ingredients.html?id=${id}`;
        });
    });
    
    let buttonsDelete = document.querySelectorAll(".delete");
    // console.log(buttonsDelete);
    buttonsDelete.forEach(button => {
        button.addEventListener("click", function() {
            let id = this.value;
            deleteIngredient(id);
        });
    });
}

async function deleteIngredient(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchIngredients();
    } catch (error) {
        console.error('Error deleting ingredient:', error);
    }
}






document.addEventListener('DOMContentLoaded', fetchIngredients);
document.querySelector("#createIngredientForm")?.addEventListener("submit", saveIngredient);






