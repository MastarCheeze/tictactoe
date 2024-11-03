SRC = src/c/tictactoe.c
TARGET = build/tictactoe
TARGET_TSD = tictactoe.d.ts
EMCC = emcc

all: $(TARGET).wasm

$(TARGET).wasm: $(SRC)
	$(EMCC) $(SRC) -o $(TARGET).js --emit-tsd $(TARGET_TSD)\
		-sWASM=1 \
		-sEXPORTED_RUNTIME_METHODS=getValue,setValue \
		-sMODULARIZE=1 \
		-sEXPORT_ES6=1 \
		-sENVIRONMENT=web

# Clean target
clean:
	rm -f build/* dist/*
