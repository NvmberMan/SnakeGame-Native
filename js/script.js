var sizeX = 30;
var sizeY = 48;
var moveDirection = "east";
var playing = false;
var head, body, foot;
var xHead, yHead;
var childCount = 6;
var childs = [];
var yourScore = 0;
var speed = 200;

var h, m, s;
var y_name;
let win = window.sessionStorage;

generateMap();
clickEvent();


function generateMap() {
  var gameBoard = document.querySelector(".game");
  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      let grid = document.createElement("div");
      grid.id = "grid(" + x + "," + y + ")";
      grid.classList.add("grid");
      gameBoard.appendChild(grid);
    }
  }
  generateFood(4);
}

function generateFood(c) {
  for (let i = 0; i < c; i++) {
    let xRandom = getRandomInt(0, sizeX);
    let yRandom = getRandomInt(0, sizeY);
    randomParentPosition = document.getElementById(
      "grid(" + xRandom + "," + yRandom + ")"
    );

    if (!randomParentPosition.hasChildNodes()) {
      let food = document.createElement("div");
      food.classList.add("food");
      randomParentPosition.appendChild(food);
    }
  }


}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function playGame() {
  if (!win.getItem("name"))
    y_name = document.getElementById("input_name").value;

  if (y_name != "") {
    playing = true;
    win.removeItem("name");
    document.getElementById("menu").classList.add("hide");
    randomParentPosition = document.getElementById(
      "grid(" + sizeX / 2 + "," + sizeY / 2 + ")"
    );

    let snake = document.createElement("div");
    snake.classList.add("snake");
    randomParentPosition.appendChild(snake);
    xHead = sizeX / 2;
    yHead = sizeY / 2;

    head = randomParentPosition;
    foot = randomParentPosition;
    h = 0;
    m = 0;
    s = 0;

    document.getElementById("p_stats").innerHTML = "Player : " + y_name;
    setInterval(move, speed);
    setInterval(time, 1000);
  } else {
    alert("Input Your Name");
  }
}

const time = () => {
  if (playing) {
    const time_text = document.getElementById("time");

    s++;
    if (s >= 60) {
      s = 0;
      m++;
    }
    if (m >= 60) {
      m = 0;
      h++;
    }
    let t =
      "Time : " +
      h +
      ":" +
      (m >= 10 ? m : "0" + m) +
      ":" +
      (s >= 10 ? s : "0" + s);
    time_text.innerHTML = t;
    document.getElementById("t_stats").innerHTML = t;
  }
};

function clickEvent() {
  document.addEventListener("keydown", function (event) {
    if (event.key == "w" && moveDirection != "south") {
      moveDirection = "north";
    }
    if (event.key == "a" && moveDirection != "east") {
      moveDirection = "west";
    }
    if (event.key == "s" && moveDirection != "north") {
      moveDirection = "south";
    }
    if (event.key == "d" && moveDirection != "west") {
      moveDirection = "east";
    }

    // alert(event.key);
  });
}

const move = () => {
  if (playing) {
    if (moveDirection == "east") {
      if (yHead == sizeY - 1) yHead = -1;

      yHead += 1;

      var nextGrid = document.getElementById(
        "grid(" + xHead + "," + yHead + ")"
      );
      let snake = document.createElement("div");
      snake.classList.add("snake");
      nextGrid.appendChild(snake);

      childs.push(head);

      if (childs.length > childCount) {
        childs[0].removeChild(childs[0].firstChild);
        childs.shift();
      }

      head = nextGrid;
    } else if (moveDirection == "west") {
      if (yHead == 0) yHead = sizeY;

      yHead -= 1;

      var nextGrid = document.getElementById(
        "grid(" + xHead + "," + yHead + ")"
      );
      let snake = document.createElement("div");
      snake.classList.add("snake");
      nextGrid.appendChild(snake);

      childs.push(head);
      if (childs.length > childCount) {
        childs[0].removeChild(childs[0].firstChild);
        childs.shift();
      }

      head = nextGrid;
    } else if (moveDirection == "south") {
      if (xHead == sizeX - 1) xHead = -1;

      xHead += 1;

      var nextGrid = document.getElementById(
        "grid(" + xHead + "," + yHead + ")"
      );
      let snake = document.createElement("div");
      snake.classList.add("snake");
      nextGrid.appendChild(snake);

      childs.push(head);

      if (childs.length > childCount) {
        childs[0].removeChild(childs[0].firstChild);
        childs.shift();
      }

      head = nextGrid;
    } else if (moveDirection == "north") {
      if (xHead == 0) xHead = sizeX;

      xHead -= 1;

      var nextGrid = document.getElementById(
        "grid(" + xHead + "," + yHead + ")"
      );
      let snake = document.createElement("div");
      snake.classList.add("snake");
      nextGrid.appendChild(snake);

      childs.push(head);

      if (childs.length > childCount) {
        childs[0].removeChild(childs[0].firstChild);
        childs.shift();
      }

      head = nextGrid;
    }
    checkPath();
  }
};

function checkPath() {
  let currentGrid = document.getElementById(
    "grid(" + xHead + "," + yHead + ")"
  );

  if (currentGrid.childElementCount > 1) {
    if (currentGrid.firstChild.classList.contains("snake")) {
      playing = false;
      document.getElementById("gameover").classList.remove("hide");
    }
    currentGrid.removeChild(currentGrid.firstChild);
    childCount++;
    yourScore++;
    document.getElementById("score").innerHTML = "Score : " + yourScore;
    document.getElementById("s_stats").innerHTML = "Score : " + yourScore;

    generateFood(1);
  }
}

function removeFoot() {
  let snake = document.createElement("div");
  snake.classList.add("snake");
  foot.appendChild(snake);
}

function restartGame() {
  win.setItem("name", y_name);
  window.location = "";
}

function toMenu()
{
  win.removeItem("name");
  window.location = "";
}


if (win.getItem("name")) {
    y_name = win.getItem("name");
    playGame();
  
  }
