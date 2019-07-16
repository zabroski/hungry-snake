

const body = document.getElementsByTagName('body')[0];

const grid = {
  snake: {
    x: 0,
    y: 0,
  },

  foods: [],
  enemy: [],
};
let keyDownCode = null;

function calculateItemPosition(position) {
  return position / 50;
}

function moveSnake(moveSnakeInDirection) {
  const snake = document.getElementById('snake');

  const currentXPosition = snake.style.marginLeft.replace('px', '') || 0;
  const currentYPosition = snake.style.marginTop.replace('px', '') || 0;

  let newXPosition = currentXPosition;
  let newYPosition = currentYPosition;

  if (moveSnakeInDirection === 'ArrowRight') {
    newXPosition = parseInt(currentXPosition) + 50; 
    snake.style.backgroundImage = 'url(img/snake_right.png)';
  } else if (moveSnakeInDirection === 'ArrowLeft') {
    newXPosition = parseInt(currentXPosition) - 50;
    snake.style.backgroundImage = 'url(img/snake_left.png)';
  } else if (moveSnakeInDirection === 'ArrowUp') {
    newYPosition = parseInt(currentYPosition) - 50;
  } else if (moveSnakeInDirection === 'ArrowDown') {
    newYPosition = parseInt(currentYPosition) + 50;
  }

  snake.style.marginLeft = `${newXPosition}px`;
  grid.snake.x = calculateItemPosition(newXPosition);
  snake.style.marginTop = `${newYPosition}px`;
  grid.snake.y = calculateItemPosition(newYPosition);
}

function getFoodAt(x, y) {
  for (let i = 0; i < grid.foods.length; i++) {
    if (grid.foods[i] && x === grid.foods[i].x && y === grid.foods[i].y) {
      return {
        food: grid.foods[i],
        positionInArray: i,
      };
    }
  }

  return null;
}


function eatFoods() {
  const foodAndPositionOfFood = getFoodAt(grid.snake.x, grid.snake.y);
  if (foodAndPositionOfFood && foodAndPositionOfFood.food != null) {
    document.getElementById(foodAndPositionOfFood.food.id).remove();
    const position = foodAndPositionOfFood.positionInArray;
    grid.foods.splice(position, 1);
  }
}


function getEnemyAt(x, y) {
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
  }

  return false;
}

function isOutOfgrid() {
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
  if (x === 0 && y === 0) {
    return false;
  }
  if (x === grid.snake.x && y === grid.snake.y) {
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
  if (x === grid.x && y === grid.snake.y) {
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
  keyDownCode = evt.code;
});

function renderEnemy() {
  const howManyEnemies = Math.floor(Math.random() * 5);

  for (let i = 0; i < howManyEnemies; i++) {
    const htmlGrid = document.getElementsByClassName('grid')[0];
    const enemy = document.createElement('div');
    htmlGrid.appendChild(enemy);
    enemy.classList.add('enemy');
    const pxRandomXEnemyPosition = Math.floor(Math.random() * 7);
    const pxRandomYEnemyPosition = Math.floor(Math.random() * 7);
    const pxPositionX = (50 * pxRandomXEnemyPosition);
    const pxPositionY = (50 * pxRandomYEnemyPosition);
    enemy.style.marginLeft = `${pxPositionX}px`;
    enemy.style.marginTop = `${pxPositionY}px`;

    if (!isFree(pxRandomXEnemyPosition, pxRandomYEnemyPosition)) {
      i--;
    } else {
      grid.enemy.push({
        x: calculateItemPosition(pxPositionX),
        y: calculateItemPosition(pxPositionY),
      });
    }

  }
}


function renderFood() {
  const howManyFood = Math.floor(Math.random() * 7);
  for (let i = 0; i < howManyFood; i++) { 
    const id = `food${i}`; 
    const food = document.createElement('div');

    const pxRandomXFoodPosition = Math.floor(Math.random() * 7);
    const pxRandomYFoodPosition = Math.floor(Math.random() * 7);

    if (!isFree(pxRandomXFoodPosition, pxRandomYFoodPosition)) {
      i--; 
    } else {
      const pxPositionX = (50 * pxRandomXFoodPosition); 
      const pxPositionY = (50 * pxRandomYFoodPosition);
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
  renderEnemy();
  const interval = setInterval(() => { 
    moveSnake(keyDownCode);
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
