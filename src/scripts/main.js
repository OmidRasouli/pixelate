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
const importWindow = document.querySelector("#importWindow");
const replaceColorWindow = document.querySelector("#replaceColorWindow");
const colorPicker = document.querySelector("#color");
const sample = document.querySelector("#sample");
const histories = new History();
const tools = new Tools();
let board = new Board();
const rotation = new Rotation();
const importer = new Importer(document.querySelector("#importImg"));
let palette = new Color(document.querySelector("#palettes"));
const crop = new Crop(
  document.querySelector("#cropperHint"),
  histories.SaveHistory(board.cells)
);

(function () {
  startupEvents();
  board = new Board(
    width(),
    height(),
    thickness(),
    roundness(),
    document.querySelector("#canvas")
  );
})();

function cleanData() {
  histories.Clear();
  board.Clear();
  exportAndShow();
}
