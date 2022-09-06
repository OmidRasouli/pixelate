const width = () => parseInt(document.querySelector("#width").value);
const height = () => parseInt(document.querySelector("#height").value);
const thicknessEl = document.querySelector("#thickness");
const roundnessEl = document.querySelector("#roundness");
const thickness = () => parseInt(thicknessEl.value);
const roundness = () => parseInt(roundnessEl.value);
const thicknessOpt = document.querySelector("#thicknessOpt");
const roundnessOpt = document.querySelector("#roundnessOpt");
const createWindow = document.querySelector("#createWindow");
const optionsWindow = document.querySelector("#optionsWindow");
const colorPicker = document.querySelector("#color");
const canvas = document.querySelector("#canvas");
const sample = document.querySelector("#sample");
const output = document.querySelector("#output");
const histories = new History();
const tools = new Tools();
let board = new Board();
const crop = new Crop(
  document.querySelector("#cropperHint"),
  histories.SaveHistory(board.cells)
);

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
