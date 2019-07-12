// let canMoveX = true;
// let canMoveY = true;

const body = document.getElementsByTagName('body')[0];

const grid = {
  snake: {
    x: 0,
    y: 0,
  },
  foods: [{
    id: 'food',
    x: 7, // 350px
    y: 7, // 350px
  },
  {
    id: 'food2',
    x: 2, // 50px
    y: 2, // 50px
  }],
};
let direction = null;

function calculateItemPosition(newItemPosition) {
  return newItemPosition / 50; //  chaque nouriture.;;
}

function moveSnake(direction) {
  const snake = document.getElementById('snake');

  const currentXPosition = snake.style.marginLeft.replace('px', '') || 0;
  const currentYPosition = snake.style.marginTop.replace('px', '') || 0;

  let newXPosition = currentXPosition;
  let newYPosition = currentYPosition;

  if (direction === 'ArrowRight') {
    newXPosition = parseInt(currentXPosition) + 50;
  } else if (direction === 'ArrowLeft') {
    newXPosition = parseInt(currentXPosition) - 50;
  } else if (direction === 'ArrowUp') {
    newYPosition = parseInt(currentYPosition) - 50;
  } else if (direction === 'ArrowDown') {
    newYPosition = parseInt(currentYPosition) + 50;
  }

  if (newXPosition >= 0 && newXPosition <= 350) {
    snake.style.marginLeft = `${newXPosition}px`;
    grid.snake.x = calculateItemPosition(newXPosition);
  }

  if (newYPosition >= 0 && newYPosition <= 350) {
    snake.style.marginTop = `${newYPosition}px`;
    grid.snake.y = calculateItemPosition(newYPosition);
  }
}

function getFoodAt(x, y) {
  for (let i = 0; i < grid.foods.length; i++) {
    if (x === grid.foods[i].x && y === grid.foods[i].y) {
      return grid.foods[i];
    }
  }

  return null;
}

function eatFoods() {
  const food = getFoodAt(grid.snake.x, grid.snake.y);
  if (food != null) {
    document.getElementById(food.id).remove();
  }
}

body.addEventListener('keydown', (evt) => {
  direction = evt.code;
});

function initFood() {
  // forloop to display div on the virtual html grid and in the var grid

  const food = document.querySelector('body');
  const newDiv = document.createElement('div');
  //   const textNode = document.createTextNode('randomFood');
  food.appendChild(newDiv);
  newDiv.classList.add('food1');
//   newDiv.appendChild(textNode);
}

function startGame() {
  initFood();
  setInterval(() => { // when press direction going to setInterval witout res
    moveSnake(direction);
    eatFoods();
  }, 400);
}

startGame();


// let foods = ['food1', 'food2', 'food3']

// const moveSnake = function () {
//   const body = document.getElementsByTagName('body')[0];
//   body.addEventListener('keydown', (event) => {
//     const currentXPosition = event.;
//     let newXPosition = currentXPosition;

//     const currentYPosition = event.target.style.marginTop.replace('px', '') || 0;
//     let newYPosition = currentYPosition;

//     if (event.code == 'ArrowRight') {
//       newXPosition = parseInt(currentXPosition) + 20;
//     } else if (event.code == 'ArrowLeft') {
//       newXPosition = parseInt(currentXPosition) - 20;
//     } else if (event.code == 'ArrowUp') {
//       newYPosition = parseInt(currentYPosition) - 20;
//     } else if (event.code == 'ArrowDown') {
//       newYPosition = parseInt(currentYPosition) + 20;
//     }
//     event.target.style.marginLeft = `${newXPosition}px`;
//     event.target.style.marginTop = `${newYPosition}px`;
//   });
// };


// const createFoods = function () {
//   const food = document.querySelector('body');
//   const newDiv = document.createElement('div');
//   const textNode = document.createTextNode('randomFood');
//   food.appendChild(newDiv);
//   newDiv.classList.add('food');
//   newDiv.appendChild(textNode);
// };

// for (let i = 0; i < 2; i++) {
//   createFoods();
// };

// const randomFoodFunction = function() {
//     // for(let i = 0; i < foods.length; i++){
//     //     // return randomFood[i];
//     // }
//     let randomFood = Math.floor(Math.random() * foods.length);
//     console.log(randomFood)
// }


// let randomFood = Math.floor(Math.random() * foods.length);
// console.log(randomFood)

// const createMongooses = function () {
//     const mongooses = document.querySelector('body');
//     const newDiv = document.createElement('div');
//     const textNode = document.createTextNode('mongooses');
//     mongooses.appendChild(newDiv);
//     newDiv.classList.add('mongoose');
//     newDiv.appendChild(textNode)
// }
// for(let i = 0; i < 2; i++){
//     createMongooses()
// }
