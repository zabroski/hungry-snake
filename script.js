

const body = document.getElementsByTagName('body')[0];

const grid = {
  snake: {
    x: 0,
    y: 0,
  },

  foods: [],
  enemy: [],
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
    newXPosition = parseInt(currentXPosition) + 50; // returning var current X position en number!
    snake.style.backgroundImage = 'url(img/snake_right.png)';
  } else if (direction === 'ArrowLeft') {
    newXPosition = parseInt(currentXPosition) - 50;
    snake.style.backgroundImage = 'url(img/snake_left.png)';
  } else if (direction === 'ArrowUp') {
    newYPosition = parseInt(currentYPosition) - 50; // returning variable current Y position en number!
  } else if (direction === 'ArrowDown') {
    newYPosition = parseInt(currentYPosition) + 50;
  }

  // if (newXPosition >= 0 && newXPosition <= 350) {
  snake.style.marginLeft = `${newXPosition}px`; // snake box will stay in the grid cuz original g.. is 400px
  grid.snake.x = calculateItemPosition(newXPosition);
  // }

  // if (newYPosition >= 0 && newYPosition <= 350) {
  snake.style.marginTop = `${newYPosition}px`;
  grid.snake.y = calculateItemPosition(newYPosition); // ensuite pour le Y aussi!
  // }
}


function getFoodAt(x, y) {
  for (let i = 0; i < grid.foods.length; i++) {
    if (grid.foods[i] && x === grid.foods[i].x && y === grid.foods[i].y) { // now i know where is foods in grid
      return {
        food: grid.foods[i],
        positionInArray: i,
      };
    }
  }

  return null;
}


function eatFoods() {
  // x is 1
  // y is 1
  const foodAndPositionOfFood = getFoodAt(grid.snake.x, grid.snake.y); // snake positions
  if (foodAndPositionOfFood && foodAndPositionOfFood.food != null) {
    document.getElementById(foodAndPositionOfFood.food.id).remove(); // and use ID of food to remove it from grid
    const position = foodAndPositionOfFood.positionInArray;
    grid.foods.splice(position, 1);
  }
}


function getEnemyAt(x, y) { // / enemy part
  for (let i = 0; i < grid.enemy.length; i++) {
    if (x === grid.enemy[i].x && y === grid.enemy[i].y) {
      return grid.enemy[i];
    }
  }
  return null;
}

function touchDied() {
  const enemy = getEnemyAt(grid.snake.x, grid.snake.y);
  if (enemy != null) {
    document.getElementById('snake').remove();
    alert('You have been touched by an ennemy you lose!! POUAAAA!!!!');
    return true;
    // console.log(' player touched the enemy');
  }

  return false;
}

function isOutOfgrid() {
//   console.log(grid.snake.x);
  if (grid.snake.x >= 8 || grid.snake.x < 0 || grid.snake.y >= 8 || grid.snake.y < 0) { // tranform px to number => 400px == 8
    document.getElementById('snake').remove();
    alert('You are out of bound, you lose!! POUAAAA!!!!');

    return true;
  }

  return false;
}

function checkWinner() {
  if (grid.foods.length == 0) {
    alert('you  win the game');
    return true;
  }

  return false;
}


function isFree(x, y) {
  if (x === grid.snake.x && y === grid.snake.y) { // need to
    return false;
  }

  for (let i = 0; i < grid.foods.length; i++) {
    if (x === grid.foods[i].x && y === grid.foods[i].y) {
      return false;
    }
  }

  return true;
}

function isEnemyFree(x, y) {
  if (x === grid.x && y === grid.snake.y) { // enemy part...
    return false;
  }
  for (let i = 0; i < grid.enemy.length; i++) {
    if (x === grid.enemy[i].x && y === grid.enemy[i].y) {
      return false;
    }
  }
  return true;
}

body.addEventListener('keydown', (evt) => {
  direction = evt.code;
});

function renderEnnemy() {
  // for loop to dispaly div on the virtual html grid and in the let grid
  const howManyEnemy = Math.floor(Math.random() * 4);

  for (let i = 0; i < 3; i++) {
    const htmlGrid = document.getElementsByClassName('grid')[0];
    const enemy = document.createElement('div');
    htmlGrid.appendChild(enemy);
    enemy.classList.add('enemy');
    const pxRandomXEnemyPosition = Math.floor(Math.random() * 4);
    const pxRandomYEnemyPosition = Math.floor(Math.random() * 4);
    const pxPositionX = (50 * pxRandomXEnemyPosition);
    const pxPositionY = (50 * pxRandomYEnemyPosition);
    enemy.style.marginLeft = `${pxPositionX}px`;
    enemy.style.marginTop = `${pxPositionY}px`;

    grid.enemy.push({
      x: calculateItemPosition(pxPositionX),
      y: calculateItemPosition(pxPositionY),
      // id,
    });
  }
}


function renderFood() {
  //   // forloop to display div on the virtual html grid and in the let grid

  const howManyFood = Math.floor(Math.random() * 6) + 1;
  for (let i = 0; i < howManyFood; i++) { // loop in my random foods
    const id = `food${i}`;
    const food = document.createElement('div');

    const pxRandomXFoodPosition = Math.floor(Math.random() * 7); // random position of X
    const pxRandomYFoodPosition = Math.floor(Math.random() * 7); // random position of Y

    if (!isFree(pxRandomXFoodPosition, pxRandomYFoodPosition)) {
      i--; // keeps the for loop if space is not free
    } else {
      const pxPositionX = (50 * pxRandomXFoodPosition); // have my foods
      const pxPositionY = (50 * pxRandomYFoodPosition);//
      food.id = id;
      food.style.marginLeft = `${pxPositionX}px`;
      food.style.marginTop = `${pxPositionY}px`;
      food.classList.add('food');

      const htmlGrid = document.getElementsByClassName('grid')[0];
      htmlGrid.appendChild(food);

      grid.foods.push({
        x: calculateItemPosition(pxPositionX),
        y: calculateItemPosition(pxPositionY),
        id: food.id,
      });
    }
  }
}


function startGame() {
  renderFood();
  renderEnnemy();
  const interval = setInterval(() => { // when press direction going to setInterval witout res
    moveSnake(direction);
    eatFoods();
    if (checkWinner()) {
      clearInterval(interval);
    }
    if (touchDied()) {
      clearInterval(interval);
    }
    if (isOutOfgrid()) {
      clearInterval(interval);
    }
  }, 400);
}

startGame();
