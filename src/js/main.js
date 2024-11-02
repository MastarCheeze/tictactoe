import createModule from "../../build/tictactoe.js";

const module = await createModule();
console.log(module);
window.module = module;
