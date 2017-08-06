
// INPUTS
const finalTargetAmount = document.querySelector('#target_final_amount');
const postBrewDillute = document.querySelector('#post_brew_dillute');
const coffeeToWaterRatio = document.querySelector('#coffee_to_water');

// DISPLAY VALUES
const drinkCount = document.querySelector('#drink_count');
const totalWaterGrmsSpan = document.querySelector('#total_water_grms');
const totalCoffeeSpan = document.querySelector('.total_coffee');
const brewWaterSpan = document.querySelector('#brew_water');
const dilluteWaterSpan = document.querySelector('#dillute_water');


var recipe = {};

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// BUILD FUNCTIONS
function calcWater() {
  // Target amount divided by 2, then add 20% for water loss
  recipe.brewWater = Math.round((finalTargetAmount.value / 2) + (finalTargetAmount.value * .1) )
  recipe.dilluteWater = Math.round(recipe.brewWater * (postBrewDillute.value))
  recipe.totalWater = recipe.dilluteWater + recipe.brewWater
  // Have everything in grams...
  recipe.brewWaterGms = Math.round(recipe.brewWater *  29.57)
  recipe.dilluteWaterGms =  Math.round(recipe.dilluteWater *  29.57)
  recipe.totalWaterGms =  Math.round(recipe.totalWater *  29.57)
}

function calcCoffee() {
  recipe.totalCoffee = Math.round((recipe.totalWaterGms / 2) / coffeeToWaterRatio.value)
  recipe.totalCoffeeCups = round((recipe.totalCoffee / 85.1),1)
}

function updateChart() {
  var ctx = document.getElementById("recipeChart").getContext('2d');
  var recipeChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Brew Water", "Dillute Water", "Coffee"],
      datasets: [{
        backgroundColor: [
          "#7C4A32",
          "#95BCB2",
          "#421E00"
        ],
        data: [recipe.brewWaterGms, recipe.dilluteWaterGms, recipe.totalCoffee]
      }]
    }
  });
}


function updateRecipe() {
  calcWater();
  calcCoffee();
  updateChart();
  targetOunces = finalTargetAmount.value;
  drinkCount.innerHTML = Math.round(targetOunces / 12);
  totalWaterGrmsSpan.innerHTML = recipe.totalWaterGms;
  totalCoffeeSpan.innerHTML = recipe.totalCoffee;
  brewWaterSpan.innerHTML = recipe.brewWaterGms;
  dilluteWaterSpan.innerHTML = recipe.dilluteWaterGms;
}

calcWater();
updateRecipe();

finalTargetAmount.addEventListener('keyup', updateRecipe);
postBrewDillute.addEventListener('change', updateRecipe);
coffeeToWaterRatio.addEventListener('change', updateRecipe);
