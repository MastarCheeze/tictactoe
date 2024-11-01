// thanks chatgpt
import wasmModulePath from "../../build/tictactoe.wasm";

async function loadWasmModule() {
  try {
    // Load the WASM module and its associated JavaScript glue code
    const response = await fetch(wasmModulePath);
    const buffer = await response.arrayBuffer();
    const module = await WebAssembly.instantiate(buffer);

    // Return the module instance which contains the exported functions
    return module.instance;
  } catch (error) {
    console.error("Error loading WASM module:", error);
    throw error;
  }
}

// Export the function for loading the WASM module
export { loadWasmModule };
