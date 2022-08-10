const width = document.querySelector("#width");
const height = document.querySelector("#height");
const thickness = document.querySelector("#thickness");
const roundness = document.querySelector("#roundness");
const createBoard = document.querySelector("#create");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const colorPicker = document.querySelector("#color");
const canvas = document.querySelector("#canvas");

const cells = [];

createBoard.addEventListener("click", () => {
  const canvasStyle = `grid-template-columns:repeat(${
    width.value
  },auto);height:${height.value * thickness.value + 1}px;width:${
    width.value * thickness.value + 1
  }px`;
  canvas.style.cssText = canvasStyle;
  createCells();
});

function createCells() {
  canvas.innerHTML = "";
  canvas.style.backgroundSize = `${thickness.value}px ${thickness.value}px`;
  const count = width.value * height.value;
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    let styles = `width:${thickness.value}px;height:${
      thickness.value
    }px;border-radius:${roundness.value % 101}%`;
    console.log(styles);
    div.style.cssText = styles;
    div.id = `cell${i}`;
    div.setAttribute("row", Math.floor(i / width.value));
    div.setAttribute("col", Math.floor(i % width.value));
    canvas.append(div);
  }
}
