const widthEl = document.querySelector("#width");
const heightEl = document.querySelector("#height");
const thicknessEl = document.querySelector("#thickness");
const roundnessEl = document.querySelector("#roundness");
const createBoard = document.querySelector("#create");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const eyedropper = document.querySelector("#eyedropper");
const fill = document.querySelector("#fill");
const colorPicker = document.querySelector("#color");
const canvas = document.querySelector("#canvas");
const sample = document.querySelector("#sample");
const output = document.querySelector("#output");
let board = new Board();

let drawMode = "draw";
let drawable = false;

let cells = {};

(function () {
  cleanData();
  startupEvents();
  board = new Board(
    +widthEl.value,
    +heightEl.value,
    +thicknessEl.value,
    +roundnessEl.value,
    canvas
  );
})();

function cleanData() {
  canvas.innerHTML = "";
  cells = {};
  exportAndShow();
}
