#include <emscripten.h>

static int allMask = (1 << 9) - 1;
static int winMasks[] = {
    0b111000000, 0b000111000, 0b000000111, // horizontal
    0b100100100, 0b010010010, 0b001001001, // vertical
    0b100010001, 0b001010100,              // diagonal
};
static int calcMoveOrder[] = {4, 0, 2, 6, 8, 1, 3, 5, 7};

int EMSCRIPTEN_KEEPALIVE checkWin(int mask) {
  for (int i = 0; i < 8; i++) {
    int winMask = winMasks[i];
    if ((mask & winMask) == winMask)
      return winMask;
  }
  return 0;
}

int EMSCRIPTEN_KEEPALIVE checkTie(int mask1, int mask2) {
  if ((mask1 | mask2 & allMask) == allMask)
    return 1;
  else
    return 0;
}

int EMSCRIPTEN_KEEPALIVE countBits(int value) {
  int count = 0;
  while (value) {
    value &= value - 1;
    count++;
  }
  return count;
}

// extremely simple negamax search algorithm
// no alpha beta, no hash tables (im lazy)
int negamax(int playerMask, int opponentMask) {
  if (checkWin(opponentMask))
    // play with food, prefer to win in most moves possible
    return -100;
  else if (checkTie(playerMask, opponentMask)) {
    return 0;
  }

  int value = -420;
  for (int i = 1; i < (1 << 9); i <<= 1) {
    if (!((playerMask | opponentMask) & i)) {
      int heuristic = -negamax(opponentMask, playerMask | i);
      if (heuristic > value)
        value = heuristic;
    }
  }
  return value;
}

int EMSCRIPTEN_KEEPALIVE calcBestMove(int playerMask, int opponentMask) {
  int bestMove = -1;
  int bestMoveHeuristic = -420;
  for (int i = 0; i < 9; i++) {
    int moveMask = (1 << calcMoveOrder[i]);
    if (!((playerMask | opponentMask) & moveMask)) {
      int heuristic = -negamax(opponentMask, playerMask | moveMask);
      if (heuristic > bestMoveHeuristic) {
        bestMove = moveMask;
        bestMoveHeuristic = heuristic;
      }
    }
  }
  return bestMove;
}
