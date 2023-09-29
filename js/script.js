
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const favBtn = document.getElementById('fav-Recipe');
const closeRecipe = document.getElementById('recipe-close-btn');

closeRecipe.addEventListener('click', () =>{

document.getElementById("dvdetail").classList.remove('showRecipe');

});


//const addfav = document.querySelector('.fav');

//mealList.addEventListener('click', getMealRecipe); 
searchBtn.addEventListener('click', getMealList);

favBtn.addEventListener('click', getMealfav);

//recipeCloseBtn.addEventListener('click', closeRecipe); 

//addfav.addEventListener('click', setfav); 


function getMealList(){ 

 document.getElementById('favText').innerHTML = "Your Search Results";

let searchInputText = document.getElementById('search-input').value.trim();
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)

.then(response => response.json()) 
.then(data => { 
let html = ""; 
if(data.meals){ 
    var lstfav=sessionStorage.getItem("myfav").trim();
data.meals.forEach(meal =>{
html += `<div class="meal-items" data-id = "${meal.idMeal}"> 
<div class="meal-img"> 
<img src="${meal.strMealThumb}" alt="Food">
</div> 
<div class="meal-name"> 

    <h3> ${meal.strMeal} </h3>
    <a  onclick="getMealRecipe(this)" class="recipe-btn"> Get Recipe </a>

    <div class="form-group"> `;

    if(lstfav.indexOf(meal.strMeal.trim())>=0){
    html +=  `<input onclick="setfav(this)" checked type="checkbox" id="chk${meal.idMeal}" value="${meal.strMeal}" /> `;
    }
    else{
        html +=  `<input onclick="setfav(this)"  type="checkbox" id="chk${meal.idMeal}" value="${meal.strMeal}" /> `;
    }

    html += `<label for="chk${meal.idMeal}"> </label></div>
</div> 
</div> 

`; 

}); 

mealList.classList.remove('not-found'); 

} 
else{ 

    html = "Sorry, we did't find any meal!!"
    mealList.classList.add('not-found');
} 

mealList.innerHTML = html;

}); 

}

//get the favourite Meal

function getMealfav(){ 
  
    document.getElementById('favText').innerHTML = "Your Fav Meal!";


    let searchInputText =  document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    
    .then(response => response.json()) 
    .then(data => { 
    let html = ""; 
    if(data.meals){ 
        var lstfav=sessionStorage.getItem("myfav").trim();
    data.meals.forEach(meal =>{
       if(lstfav.indexOf(meal.strMeal.trim())>=0){


    html += ` 
    
    <div class="meal-items" data-id = "${meal.idMeal}"> 
    <div class="meal-img"> 
    <img src="${meal.strMealThumb}" alt="Food">
    </div> 
    <div class="meal-name"> 
    
        <h3> ${meal.strMeal} </h3>
        <a class="recipe-btn" onclick="getMealRecipe(this)"> Get Recipe </a>
    
        <div class="form-group">
        <input onclick="setfav(this)" checked type="checkbox" id="chk${meal.idMeal}" 
        value="${meal.strMeal}" />
        <label for="chk${meal.idMeal}"> </label>
       
      </div>
      
    </div> 
    </div> `; 
}
    });
    
    mealList.classList.remove('not-found'); 
    
}
else{ 

    html = "Sorry, we did't find any meal!!"
    mealList.classList.add('not-found');
} 
mealList.innerHTML = html;
    })} 

// get meal recipe

function getMealRecipe(e){
//e.preventDefault();
//if(e.target.classList.contains('recipe-btn')){
let mealItem = e.parentElement.parentElement;
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
.then(response => response.json())
.then(data => mealRecipeModal(data.meals));
//}
}

function setfav(e){
  
    var favlist=sessionStorage.getItem("myfav");
    if(favlist==null){favlist='';}
    if(e.checked==true){
        if(favlist.indexOf(e.value.trim())<0){
            sessionStorage.setItem("myfav",favlist+=e.value.trim()+",");
    console.log(favlist);
        }
       
} 
if(e.checked==false){
    if(favlist.indexOf(e.value.trim())>=0){
        favlist=favlist.replace(new RegExp(e.value.trim()+",", "g"),"");
        sessionStorage.setItem("myfav",favlist);
console.log(favlist);
}
   
} 



} 

//function set(){favlist.push(data); localStorage.setItem("myfav",favlist)}
// create Modael here 

function mealRecipeModal(meal){
  console.log(meal);
  meal = meal[0]; 
  let html = ` 
  
  <h2> ${meal.strMeal} </h2>
  <p class="recipe-cate"> ${meal.strCategory} </p>

  <div class="instructions">
  <h3> Instructions: </h3>
  <p> ${meal.strInstructions} </p>
  </div>

  <div class="recipe-meal-image">

  <img src="${meal.strMealThumb}"/>

  </div>

  <div class="recipe-links">

 <a href="${meal.strYoutube}" target="_blank"> Watch Video </a>
 </div>
 
  `; 

  mealDetailContent.innerHTML = html;
  mealDetailContent.parentElement.classList.add('showRecipe');

} 
