SRC = src/c/tictactoe.c
TARGET = build/tictactoe
EMCC = emcc

all: $(TARGET).wasm

$(TARGET).wasm: $(SRC)
	$(EMCC) $(SRC) -o $(TARGET).js \
		-sWASM=1 \
		-sEXPORTED_FUNCTIONS='["_noughts","_crosses","_currentPlayer","_checkWin","_checkTie","_getPlayer"]' \
		-sMODULARIZE=1 \
		-sEXPORT_ES6=1 \
		-sENVIRONMENT=web
	npx webpack

# Clean target
clean:
	rm -f build/* dist/*
