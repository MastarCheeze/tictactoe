import { loadWasmModule } from "./wasm_loader";

const module = await loadWasmModule();
console.log(module);
