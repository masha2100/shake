const canvas = document.getElementById("game");//это HTML элемент, использующийся для рисования графики средствами языков программирования (обычно это JavaScript). 
const ctx = canvas.getContext("2d");//формат игры //объект

const ground = new Image();//класс для работы с картинками
ground.src ="img/ground.png";//путь к картинке

const carrotImg = new Image();//класс для работы с картинками
carrotImg.src ="img/carrot.png";//путь к картинке

let box = 32;//ширина либо длина отдельного квадрата

let score = 0;

let carrot = { //координаты морковки
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);//управление стрелками

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")//код для стрелки влево
      dir = "left";
    else if(event.keyCode == 38 && dir != "down")
      dir = "up";
    else if(event.keyCode == 39 && dir != "left")
      dir = "right";
    else if(event.keyCode == 40 && dir != "up")
      dir = "down";
}

//проверка,елси змея захотела съесть свою голову
function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++){
      if(head.x == arr[i].x && head.y == arr[i].y )
        clearInterval(game);
       }
    }

  
function drawGame(){
   ctx.drawImage(ground, 0, 0);//функция позволяет нарисовать картинку в определенных координатах

   ctx.drawImage(carrotImg, carrot.x, carrot.y);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "green" : 'red';//квадрат,проверка елемента для установления цвета 
        ctx.fillRect(snake[i].x,snake[i].y, box, box);//позволяет создать определенный объект(квадрат)

    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);//0  

    //хранение координатов
    let snakeX = snake[0].x;
    let snakeY =snake[0].y;

    if(snakeX == carrot.x && snakeY == carrot.y) { //проверка если съел морковку-увеличение score=еда в новом месте
      score++;
      carrot = { //координаты морковки
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
         };
      }  else{
           snake.pop();//удаление элемента из массива
         }


    if(snakeX < box || snakeX > box * 17 
      || snake.Y < 3 * box || snake.Y > box * 17)//условие для поля
    clearInterval(game);//заверешение игры елси выходим за поля


    if(dir == "left") snakeX -= box;//передвигаем на бокс влево
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;


    let newHead = {//новый объект/элемент
      x: snakeX,
      y: snakeY
    };

    eatTail(newHead, snake);
    snake.unshift(newHead);//добавление в массив в самре начало
}

let game = setInterval(drawGame, 1000);