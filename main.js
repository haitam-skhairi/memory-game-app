// Duration
let duration = 1000;

// Get the Block Element

let blockContainer = document.querySelector(".block-container");

let blocks = Array.from(blockContainer.children);

// Get Starting Game
let nameOfGamer = document.getElementById("name-of-gamer");

// Get Starting Game
let startGame = document.getElementById("start-game");
let startGameButton = document.querySelector(".start-game button");

// Starting Game Function
startGameButton.addEventListener("click", () => {
  let gamerName = prompt("Write Your Name");

  if (gamerName === null || gamerName === "") {
    nameOfGamer.textContent = "Unknown";
  } else {
    nameOfGamer.textContent = gamerName;
  }
  startGame.remove();

  // Add class dont-work to the container blocks
  blockContainer.classList.add("dont-work");

  // Open The blocks 5min fo see it
  blocks.forEach((block) => {
    // Add class dont-work to the blocks
    // block.classList.add("dont-work");

    block.classList.add("flipped");
    setTimeout(() => {
      block.classList.remove("flipped");

      // Remove class dont-work to the blocks
      blockContainer.classList.remove("dont-work");
    }, duration * 10);
  });
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

// Stop clicking Function

function stopClicking() {
  blocks.forEach((block) => {
    block.classList.add("dont-work");
    setTimeout(() => {
      block.classList.remove("flipped");
      block.classList.remove("dont-work");
    }, 1000);
  });
}

// Cheker Function

// Get the Tries Span Element
let numberOfTries = document.getElementById("tries-gaming");

numberOfTries.textContent = 5;

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
      // Add class dont-work to the container blocks
      blockContainer.classList.add("dont-work");
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
      }, 3000);
    }
  }

  // Filter Array Fron Verified Classes

  let AllVerifiedBlocks = blocks.filter((block) =>
    block.classList.contains("verified")
  );

  if (AllVerifiedBlocks.length === blocks.length) {
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
    }, 2000);
  }
}
