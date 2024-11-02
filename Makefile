SRC_C = src/c/tictactoe.c
SRC_JS = src/js/main.js
TARGET = build/tictactoe
EMCC = emcc

all: $(TARGET).wasm

$(TARGET).wasm: $(SRC)
	$(EMCC) $(SRC) -o $(TARGET).js \
		-sWASM=1 \
		-sEXPORTED_RUNTIME_METHODS=getValue,setValue \
		-sMODULARIZE=1 \
		-sEXPORT_ES6=1 \
		-sENVIRONMENT=web
	npx webpack

# Clean target
clean:
	rm -f build/* dist/*
