import createModule from "../../build/tictactoe.js";
import "./style.css";

// Initialise WASM module
const module = await createModule();
const players = [0, 0];
let curPlayer = 0;
const checkWin = module._checkWin;
const checkTie = module._checkTie;

// Get DOM elements
const status = document.querySelector("#status");
const reset = document.querySelector("#reset");
const cells = [];
for (let i = 0; i < 9; i++) {
  cells[i] = document.querySelector(`#cell-${i + 1}`);
}

function updateGrid() {
  for (let i = 0; i < 9; i++) {
    if (players[0] & (1 << i)) {
      cells[i].innerText = getSymbol(0);
    } else if (players[1] & (1 << i)) {
      cells[i].innerText = getSymbol(1);
    } else {
      cells[i].innerText = "";
    }
  }
}

function getSymbol(player) {
  if (player == 0) {
    return "O";
  } else {
    return "X";
  }
}

/* Events */
for (let i = 0; i < 9; i++) {
  cells[i].addEventListener("click", () => {
    if (cells[i].classList.contains("disable")) {
      return;
    }

    // play move
    players[curPlayer] |= 1 << i;

    // check game over
    const winMask = checkWin(players[curPlayer]);
    if (winMask) {
      status.innerText = `${getSymbol(curPlayer)} wins!`;
      for (let i = 0; i < 9; i++) {
        cells[i].classList.add("disable");
        if (winMask & (1 << i)) {
          cells[i].classList.add("highlight");
        }
      }
    } else if (checkTie(...players)) {
      status.innerText = `Tie!`;
      for (let i = 0; i < 9; i++) {
        cells[i].classList.add("disable");
      }
    } else {
      cells[i].classList.add("disable");
      curPlayer ^= 1;
      status.innerText = `${getSymbol(curPlayer)}'s turn`;
    }

    updateGrid();
  });
}

reset.addEventListener("click", () => {
  players[0] = 0;
  players[1] = 0;
  curPlayer = 0;
  for (let i = 0; i < 9; i++) {
    cells[i].classList.remove("disable", "highlight");
  }

  status.innerText = `${getSymbol(curPlayer)}'s turn`;
  updateGrid();
});

// initialise
status.innerText = `${getSymbol(curPlayer)}'s turn`;
updateGrid();
