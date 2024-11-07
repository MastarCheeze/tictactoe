import createModule from "../../build/tictactoe";
import "./style.css";

// Initialise WASM module
const module = await createModule();
const players: [number, number] = [0, 0];
let curPlayer = 0;
let aiEnabled = false;
let aiPlayer = 0;
const checkWin = module._checkWin;
const checkTie = module._checkTie;
const calcBestMove = module._calcBestMove;

// Get DOM elements
const status = document.querySelector("#status") as HTMLElement;
const reset = document.querySelector("#reset") as HTMLButtonElement;
const ai = document.querySelector("#ai") as HTMLButtonElement;
const aiStatus = document.querySelector("#ai-status") as HTMLButtonElement;
const cells: HTMLElement[] = [];
for (let i = 0; i < 9; i++) {
  cells[i] = document.querySelector(`#cell-${i + 1}`)!;
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

function getSymbol(player: number) {
  if (player == 0) {
    return "O";
  } else {
    return "X";
  }
}

function getLeftmostBitIndex(value: number) {
  let count = 0;
  while ((value & (1 << count)) == 0) {
    count += 1;
  }
  return count;
}

function makeMove(i: number) {
  players[curPlayer] |= 1 << i;

  const lastCell = document.querySelector(
    ".cell-last-move",
  ) as HTMLElement | null;
  lastCell?.classList.remove("cell-last-move");

  // check game over
  const winMask = checkWin(players[curPlayer]);
  if (winMask) {
    status.innerText = `${getSymbol(curPlayer)} wins!`;
    for (let i = 0; i < 9; i++) {
      cells[i].classList.add("cell-disable");
      if (winMask & (1 << i)) {
        cells[i].classList.add("cell-highlight");
      }
    }
  } else if (checkTie(...players)) {
    status.innerText = `Tie!`;
    for (let i = 0; i < 9; i++) {
      cells[i].classList.add("cell-disable");
    }
  } else {
    cells[i].classList.add("cell-disable", "cell-last-move");
    curPlayer ^= 1;
    status.innerText = `${getSymbol(curPlayer)}'s turn`;
  }

  updateGrid();
}

/* Events */
for (let i = 0; i < 9; i++) {
  cells[i].addEventListener("click", () => {
    if (cells[i].classList.contains("cell-disable")) {
      return;
    }

    // play move
    makeMove(i);

    if (aiEnabled && curPlayer == aiPlayer) {
      makeMove(
        getLeftmostBitIndex(
          calcBestMove(players[aiPlayer], players[aiPlayer ^ 1]),
        ),
      );
    }
  });
}

reset.addEventListener("click", () => {
  players[0] = 0;
  players[1] = 0;
  curPlayer = 0;
  for (let i = 0; i < 9; i++) {
    cells[i].classList.remove(
      "cell-disable",
      "cell-highlight",
      "cell-last-move",
    );
  }

  status.innerText = `${getSymbol(curPlayer)}'s turn`;

  if (aiEnabled && curPlayer == aiPlayer) {
    makeMove(
      getLeftmostBitIndex(
        calcBestMove(players[aiPlayer], players[aiPlayer ^ 1]),
      ),
    );
  }
  updateGrid();
});

ai.addEventListener("click", () => {
  aiEnabled = !aiEnabled;

  if (aiEnabled) {
    aiPlayer = curPlayer;
    aiStatus.innerText = `AI is playing ${getSymbol(aiPlayer)}`;
    ai.innerText = "Despawn AI";

    makeMove(
      getLeftmostBitIndex(
        calcBestMove(players[aiPlayer], players[aiPlayer ^ 1]),
      ),
    );
  } else {
    aiStatus.innerText = "\xa0";
    ai.innerText = "Summon AI";
  }
});

// initialise
status.innerText = `${getSymbol(curPlayer)}'s turn`;
ai.innerText = "Summon AI";
aiStatus.innerText = "\xa0";
updateGrid();

// @ts-ignore
window.countBits = module._countBits;
