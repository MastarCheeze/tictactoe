SRC = src/c/tictactoe.c
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

# Clean target
clean:
	rm -f build/* dist/*
