const width = () => parseInt(document.querySelector("#width").value);
const height = () => parseInt(document.querySelector("#height").value);
const thicknessEl = document.querySelector("#thickness");
const roundnessEl = document.querySelector("#roundness");
const thickness = () => parseInt(thicknessEl.value);
const roundness = () => parseInt(roundnessEl.value);
const thicknessOpt = document.querySelector("#thicknessOpt");
const roundnessOpt = document.querySelector("#roundnessOpt");
const saveOptions = document.querySelector("#saveOptions");
const menuNew = document.querySelector("#new");
const menuOptions = document.querySelector("#options");
const createWindow = document.querySelector("#createWindow");
const closeWindow = document.querySelector("#closeWindow");
const optionsWindow = document.querySelector("#optionsWindow");
const closeOptions = document.querySelector("#closeOptions");
const createBoard = document.querySelector("#create");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const eyedropper = document.querySelector("#eyedropper");
const fill = document.querySelector("#fill");
const cropper = document.querySelector("#crop");
const colorPicker = document.querySelector("#color");
const canvas = document.querySelector("#canvas");
const sample = document.querySelector("#sample");
const output = document.querySelector("#output");
const undo = document.querySelector("#undo");
const redo = document.querySelector("#redo");
const histories = new History();
const crop = new Crop(document.querySelector("#cropperHint"));
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
