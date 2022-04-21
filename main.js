// Duration
let duration = 1000;

// Get the Tries Span Element
let numberOfTries = document.getElementById("tries-gaming");

numberOfTries.textContent = 5;

// localStorage.setItem(
//   `${localStorage.getItem("player-name")}Tries`,
//   numberOfTries.textContent
// );

// Get the Block Element

let blockContainer = document.querySelector(".block-container");

let blocks = Array.from(blockContainer.children);

// Get Starting Game
let nameOfGamer = document.getElementById("name-of-gamer");

// Get Starting Game
let startGame = document.getElementById("start-game");
let startGameButton = document.querySelector(".start-game button");

// Get Counter
let counter = document.getElementById("counter");

counter.textContent = 60;

// localStorage.setItem(
//   `${localStorage.getItem("player-name")}Time`,
//   counter.textContent
// );

// Starting Game Function

startGameButton.addEventListener("click", () => {
  let gamerName = prompt("Write Your Name");

  // console.log(localStorage.getItem("player-name"));

  if (gamerName === null || gamerName === "") {
    nameOfGamer.textContent = "Unknown";
  } else {
    nameOfGamer.textContent = gamerName;
  }
  startGame.remove();

  // Set Player Name In The LocaleStorage

  localStorage.setItem(`player-name`, gamerName);

  localStorage.setItem(`${gamerName}player-name`, gamerName);

  // Add class stop-clicking to the container blocks
  blockContainer.classList.add("stop-clicking");

  // Open The blocks 5min for see it
  blocks.forEach((block) => {
    // Add class stop-clicking to the blocks

    block.classList.add("flipped");
    setTimeout(() => {
      block.classList.remove("flipped");

      // Remove class stop-clicking to the blocks
      blockContainer.classList.remove("stop-clicking");
    }, duration * 1);
  });

  setTimeout(() => {
    // Call Play Counter Function

    playCounter();
  }, duration * 1);
});

// Create new Array use it to range the blocks

let orderRange = [...Array(blocks.length).keys()]; // [0,1,2,3 ... 17,18,19]
// let orderRange = [...blocks.keys()]; // [0,1,2,3 ... 17,18,19]

// Call Shuffle Function

shuffle(orderRange);

// Current block Operations
blocks.forEach((block, index) => {
  // Distribution blocks with Order Range Array
  block.style.order = orderRange[index];

  // Add Class Flipper on click in block
  block.addEventListener("click", () => {
    flippedBlock(block);
  });
});

// Shuffle function

function shuffle(array) {
  // Main Variables

  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    // [1] Save current element in stash
    temp = array[current];

    // [2] replace current elemet with random
    array[current] = array[random];

    // [3] Get the current element from the Stash
    array[random] = temp;
  }

  return array;
}

// flipped Block Funtion

function flippedBlock(flippedBlockEl) {
  // Add Class Flipper on click in block
  flippedBlockEl.classList.add("flipped");

  let AllFlippedBlocks = blocks.filter((block) =>
    block.classList.contains("flipped")
  );

  if (AllFlippedBlocks.length === 2) {
    // Stop clicking Function
    stopClicking();
  }

  // Call the Cheker Function
  cheker(AllFlippedBlocks[0], AllFlippedBlocks[1]);
}

// Cheker Function
console.log(numberOfTries.textContent);

function cheker(firstBlock, secoundBlock) {
  if (firstBlock.dataset.technology === secoundBlock.dataset.technology) {
    blocks.forEach((block) => {
      block.classList.remove("flipped");

      firstBlock.classList.add("verified");
      secoundBlock.classList.add("verified");
    });

    // Play Success Sound

    document.getElementById("success-try").play();
  } else {
    // reducing the Tries by one
    numberOfTries.textContent--;

    // Play Failed Sound

    document.getElementById("failed-try").play();

    if (numberOfTries.textContent === "0") {
      // Add class stop-clicking to the container blocks
      blockContainer.classList.add("stop-clicking");

      // Call Game Over Function

      gameOver();
    }

    if (numberOfTries.textContent === 60) {
      localStorage.setItem(
        `${localStorage.getItem("player-name")}Tries`,
        numberOfTries.textContent
      );
    }
  }

  // Filter Array Fron Verified Classes

  let AllVerifiedBlocks = blocks.filter((block) =>
    block.classList.contains("verified")
  );

  if (AllVerifiedBlocks.length === blocks.length) {
    // Call congratulations Function

    congratulations();
  }
}
console.log(numberOfTries.textContent);

// Play counter Function

function playCounter() {
  let counterIntervale = setInterval(() => {
    counter.textContent--;

    if (counter.textContent === 60) {
      localStorage.setItem(
        `${localStorage.getItem("player-name")}Time`,
        counter.textContent
      );
    }

    if (counter.textContent === "0") {
      // Call Game Over Function
      gameOver();

      clearInterval(counterIntervale);
    }

    if (numberOfTries.textContent === "0") {
      clearInterval(counterIntervale);
    }
  }, duration);
}

// Stop clicking Function

function stopClicking() {
  blocks.forEach((block) => {
    block.classList.add("stop-clicking");
    setTimeout(() => {
      block.classList.remove("flipped");
      if (!block.classList.contains("verified")) {
        block.classList.remove("stop-clicking");
      }
    }, duration);
  });
}

// Game Over Function

function gameOver() {
  setTimeout(() => {
    // Play Game Over Sound

    document.getElementById("game-over").play();
    // Display the Game over

    let gameOverContainer = document.createElement("div");

    let gameOverContainerText = document.createTextNode("Game Over");

    let gameOverButtun = document.createElement("button");

    let gameOverButtunText = document.createTextNode("Restart Game");

    // Append Text inside button

    gameOverButtun.appendChild(gameOverButtunText);

    // Append Button inside Div Container

    gameOverContainer.appendChild(gameOverContainerText);

    // Append Button inside Div Container

    gameOverContainer.appendChild(gameOverButtun);

    // Append Div Container inside Body

    document.body.appendChild(gameOverContainer);

    gameOverContainer.classList.add("game-over-container");

    // Retry The Game on click

    gameOverButtun.addEventListener("click", () => {
      window.location.reload();
    });
  }, duration);
}

function congratulations() {
  setTimeout(() => {
    // Play Congratulations Sound

    document.getElementById("congratulations").play();
    // Display Congratulations over

    let congratulationsDiv = document.createElement("div");

    let congratulationsText = document.createTextNode("Congratulations");

    let congratulationsbutton = document.createElement("button");

    let congratulationsButtonText = document.createTextNode("Next Level");

    // Append Text inside button

    congratulationsbutton.appendChild(congratulationsButtonText);

    // Append button inside Div

    congratulationsDiv.appendChild(congratulationsText);

    // Append button inside Div

    congratulationsDiv.appendChild(congratulationsbutton);

    // Append Div Container inside Body

    document.body.appendChild(congratulationsDiv);

    congratulationsDiv.classList.add("congratulations");

    // Retry The Game on click

    congratulationsbutton.addEventListener("click", () => {
      window.location.reload();
    });
  }, duration);
}

// Random BackgoundColor Function

function randomBackground(element) {
  let newArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

  let emptyArray = [];

  for (let i = 1; i < 7; i++) {
    emptyArray.push(newArray[Math.floor(Math.random() * newArray.length)]);
  }

  element.style.backgroundColor = `#${emptyArray.join("")}`;
}

// Create Player Score Function

// playerScore();

// function playerScore() {
//   let topPlayersContainer = document.querySelector(".top-players");

//   let hr = document.createElement("hr");

//   let player = document.createElement("div");

//   let playerImg = document.createElement("div");
//   let playerImgText = document.createTextNode(
//     localStorage.getItem(`${localStorage.getItem("player-name")}player-name`)[0]
//   );
//   playerImg.appendChild(playerImgText);

//   let playerInfo = document.createElement("div");

//   let playerInfoName = document.createElement("h3");
//   let playerInfoNameText = document.createTextNode(
//     localStorage.getItem(`${localStorage.getItem("player-name")}player-name`)
//   );
//   playerInfoName.appendChild(playerInfoNameText);

//   let playerInfoLevel = document.createElement("p");
//   let playerInfoLevelText = document.createTextNode("Level : 3");
//   playerInfoLevel.appendChild(playerInfoLevelText);

//   let playerInfoTime = document.createElement("p");
//   let playerInfoTimeText = document.createTextNode(
//     `Time : ${localStorage.getItem(
//       `${localStorage.getItem("player-name")}Time`
//     )}`
//   );
//   playerInfoTime.appendChild(playerInfoTimeText);

//   let playerInfoTries = document.createElement("p");
//   let playerInfoTriesText = document.createTextNode(
//     `Tries : ${localStorage.getItem(
//       `${localStorage.getItem("player-name")}Tries`
//     )}`
//   );
//   playerInfoTries.appendChild(playerInfoTriesText);

//   playerInfo.appendChild(playerInfoName);
//   playerInfo.appendChild(playerInfoLevel);
//   playerInfo.appendChild(playerInfoTime);
//   playerInfo.appendChild(playerInfoTries);

//   player.appendChild(playerImg);
//   playerImg.classList.add("player-img");

//   player.appendChild(playerInfo);
//   playerInfo.classList.add("info");

//   topPlayersContainer.appendChild(hr);
//   topPlayersContainer.appendChild(player);
//   player.classList.add("player");

//   // Randomize the BackgroundColor Of The players img

//   let playerimgs = document.querySelectorAll(".player-img");

//   playerimgs.forEach((img) => {
//     // Call Random BackgroundColor Function
//     randomBackground(img);
//   });
// }

// Randomize the BackgroundColor Of The players img

let playerimgs = document.querySelectorAll(".player-img");

playerimgs.forEach((img) => {
  // Call Random BackgroundColor Function
  randomBackground(img);
});
