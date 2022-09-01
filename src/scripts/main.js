const width = () => parseInt(document.querySelector("#width").value);
const height = () => parseInt(document.querySelector("#height").value);
const thickness = () => parseInt(document.querySelector("#thickness").value);
const roundness = () => parseInt(document.querySelector("#roundness").value);
const createBoard = document.querySelector("#create");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const eyedropper = document.querySelector("#eyedropper");
const fill = document.querySelector("#fill");
const colorPicker = document.querySelector("#color");
const canvas = document.querySelector("#canvas");
const sample = document.querySelector("#sample");
const output = document.querySelector("#output");
const undo = document.querySelector("#undo");
const redo = document.querySelector("#redo");
const histories = new History();
const tools = new Tools();
let board = new Board();

(function () {
  cleanData();
  startupEvents();
  board = new Board(width(), height(), thickness(), roundness(), canvas);
})();

function cleanData() {
  histories.Clear();
  canvas.innerHTML = "";
  exportAndShow();
}
