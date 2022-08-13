const width = document.querySelector("#width");
const height = document.querySelector("#height");
const thickness = document.querySelector("#thickness");
const roundness = document.querySelector("#roundness");
const createBoard = document.querySelector("#create");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const colorPicker = document.querySelector("#color");
const canvas = document.querySelector("#canvas");
let drawMode = "draw";
let drawable = false;

let cells = {};

(function () {
  canvas.addEventListener("mousedown", () => (drawable = true));
  document.addEventListener("mouseup", () => (drawable = false));
  thickness.addEventListener("change", () => {
    canvas.style.width = `${
      width.value * thickness.value + +width.value - 1
    }px`;
    canvas.style.height = `${
      height.value * thickness.value + +height.value - 1
    }px`;
    canvas.style.backgroundSize = `${+thickness.value + 1}px ${
      +thickness.value + 1
    }px`;

    for (const cell of canvas.childNodes) {
      cell.style.width = `${thickness.value}px`;
      cell.style.height = `${thickness.value}px`;
    }
  });
})();

createBoard.addEventListener("click", () => {
  const canvasStyle = `grid-template-columns:repeat(${
    width.value
  },auto);height:${
    height.value * thickness.value + +height.value - 1
  }px;width:${width.value * thickness.value + +width.value - 1}px;opacity:1;`;
  canvas.style.cssText = canvasStyle;
  createCells();
});

function createCells() {
  canvas.style.backgroundSize = `${+thickness.value + 1}px ${
    +thickness.value + 1
  }px`;
  const count = width.value * height.value;
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    let styles = `width:${thickness.value}px;height:${
      thickness.value
    }px;border-radius:${roundness.value % 101}%`;
    div.style.cssText = styles;
    div.id = `cell${i}`;
    div.setAttribute("row", Math.floor(i / width.value));
    div.setAttribute("col", Math.floor(i % width.value));
    div.setAttribute("index", i);
    div.addEventListener("mousemove", (e) => {
      drawable && fillCell(e.currentTarget);
    });
    div.addEventListener("mousedown", (e) => {
      fillCell(e.currentTarget);
    });

    canvas.append(div);
  }
}

function fillCell(cell) {
  cell.style.backgroundColor =
    drawMode === "draw" ? colorPicker.value : "transparent";
  cells[cell.getAttribute("index")] = {
    row: cell.getAttribute("row"),
    col: cell.getAttribute("col"),
    color: colorPicker.value,
  };
  console.log(cells);
}

function cleanData() {
  canvas.innerHTML = "";
  cells = {};
}
