// let canMoveX = true;
// let canMoveY = true;
function moveSnake() {
  const body = document.getElementsByTagName('body')[0];
  body.addEventListener('keydown', (evt) => {
    const snake = document.getElementById('snake');
    const currentXPosition = snake.style.marginLeft.replace('px', '') || 0;
    let newXPosition = currentXPosition;
    const currentYPosition = snake.style.marginTop.replace('px', '') || 0;
    let newYPosition = currentYPosition;

    if (evt.code === 'ArrowRight') {
      newXPosition = parseInt(currentXPosition) + 50;
    } else if (evt.code === 'ArrowLeft') {
      newXPosition = parseInt(currentXPosition) - 50;
    } else if (evt.code === 'ArrowUp') {
      newYPosition = parseInt(currentYPosition) - 50;
    } else if (evt.code === 'ArrowDown') {
      newYPosition = parseInt(currentYPosition) + 50;
    }

    if (newXPosition === -50 || newXPosition === 400) {
      newXPosition = true;
    } else if (newYPosition === -50 || newYPosition === 400) {
      newYPosition = true;
    }
    snake.style.marginTop = `${newYPosition}px`;
    snake.style.marginLeft = `${newXPosition}px`;
  });
}
moveSnake();


// second option for keyDown event

// const snake = {x: 0, y: 0}

// const canMoveTo = function(x, y) {
//     if(!coordinateGrid(x ,y)){
//         return false
//     }
// }

// const coordinateGrid = function(x, y) {
//     if(x < 0 || y < 0 || x > 8 || y > 8) {
//         return false
//     }else {
//         return true
//     }
// };


// function moveCharacterTo(x, y) {
//     const snake = document.querySelector('.snake');
//     snake.style.left = (x * 50).toString() + 'px';
//     snake.style.top = (y * 50).toString() + 'px'

// };

// function moveLeft() {
//     if(canMoveTo(snake.x - 1, snake.y)){
//         snake.x -= 1
//         moveCharacterTo(snake.x , snake.y)
//     }
// };

// function moveUp() {
//     if(canMoveTo(snake.x, snake.y - 1)) {
//         snake.y = snake.y - 1
//         moveCharacterTo(snake.x, snake.y)
//     }
// };

// function moveRight() {
//     if(canMoveTo(snake.x + 1, snake.y)) {
//         snake.x += 1
//         moveCharacterTo(snake.x, snake.y)
//     }
// };

// function moveDown() {
//     if(canMoveTo(snake.x, snake.y + 1)) {
//         snake.y += 1
//         moveCharacterTo(snake.x, snake.y)
//     }
// }


// document.body.addEventListener('keydown', (evt)=>{
//     const keyCode = evt.keyCode
//     const arrowKeys = [37,38,39,40]
//     if(arrowKeys.includes(keyCode)) {
//         evt.preventDefault
//     }
//     switch(keyCode) {
//         case 37:
//         console.log('okay')
//             moveLeft()
//             break;
//         case 38:
//             moveUp()
//             break;
//         case 39:
//             moveRight()
//             break;
//         case 40:
//         moveDown()
//     }
// }


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

// // document.body.addEventListener('keydown', function(evt){
// //     const keyCode = evt.keyCode;
// //     const arrowKeys = [37,38,39,40];
// //    if (arrowKeys.includes(keyCode)) {
// //        evt.preventDefault
// //    }else if(arrowKeys === 37){
// //        return;
// //    }else if(arrowKeys === 38) {
// //        return;
// //    }else if(arrowKeys === 39) {
// //        return;
// //    }else if(arrowKeys === 40){
// //        return;
// //    }

// // })


// const createSnake = function () {
//   const snake = document.querySelector('body');
//   const newDiv = document.createElement('div');
//   // console.log(snake)
//   const textNode = document.createTextNode('snake');
//   snake.appendChild(newDiv);
//   newDiv.classList.add('snake');
//   newDiv.appendChild(textNode);
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


// const run = function () {
//   moveSnake();
//   createFoods();
//   createSnake();
//   createMongooses()
//   randomFoodFunction()
// };
// run();
