#include <stdbool.h>

int noughts = 0;
int crosses = 0;
int currentPlayer = 0; // 0 for noughts, 1 for crosses

static int allMask = (1 << 9) - 1;
static int winMasks[] = {
    0b111000000, 0b000111000, 0b000000111, // horizontal
    0b100100100, 0b010010010, 0b001001001, // vertical
    0b100010001, 0b001010100,              // diagonal
};

bool checkWin(int mask) {
  for (int i = 0; i < 8; i++) {
    int winMask = winMasks[i];
    if ((mask & winMask) == winMask)
      return true;
  }
  return false;
}

bool checkTie(int mask1, int mask2) {
  if ((mask1 & mask2 & allMask) == allMask)
    return true;
  else
    return false;
}

int getPlayer(int player) {
  if (currentPlayer == 0)
    return noughts;
  else
    return crosses;
}
