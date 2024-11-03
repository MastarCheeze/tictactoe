#include <emscripten.h>

static int allMask = (1 << 9) - 1;
static int winMasks[] = {
    0b111000000, 0b000111000, 0b000000111, // horizontal
    0b100100100, 0b010010010, 0b001001001, // vertical
    0b100010001, 0b001010100,              // diagonal
};

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
