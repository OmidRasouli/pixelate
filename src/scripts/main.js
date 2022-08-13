const width = document.querySelector("#width");
const height = document.querySelector("#height");
const thickness = document.querySelector("#thickness");
const roundness = document.querySelector("#roundness");
const createBoard = document.querySelector("#create");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const colorPicker = document.querySelector("#color");
const canvas = document.querySelector("#canvas");
const exporter = document.querySelector("#export");
let drawMode = "draw";
let drawable = false;

let cells = {};

(function () {
  cleanData();
  canvas.addEventListener("mousedown", () => (drawable = true));
  pen.addEventListener("click", () => (drawMode = "draw"));
  eraser.addEventListener("click", () => (drawMode = "erase"));
  exporter.addEventListener("click", () => {
    exportPixelArt();
  });
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
  cleanData();
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
  if (drawMode === "draw") {
    cell.style.backgroundColor = colorPicker.value;
    cells[cell.getAttribute("index")] = {
      row: cell.getAttribute("row"),
      col: cell.getAttribute("col"),
      color: colorPicker.value,
    };
  } else {
    cell.style.backgroundColor = "transparent";
    delete cells[cell.getAttribute("index")];
  }
}

function cleanData() {
  canvas.innerHTML = "";
  cells = {};
}

function exportPixelArt() {
  let data = [];

  for (const shadow of Object.keys(cells)) {
    data.push(
      `${cells[shadow].col * thickness.value + +thickness.value}px ${
        cells[shadow].row * thickness.value + +thickness.value
      }px 0 0 ${cells[shadow].color}`
    );
  }

  const boxShadow = "box-shadow:" + data.join(", ");
  let style = `width: ${thickness.value}px;\nheight: ${thickness.value}px;\n${boxShadow};`;
  console.log(+roundness.value > 0);
  if (+roundness.value > 0) {
    style += `\nborder-radius: ${+roundness.value}%;`;
  }
  console.log(style);
}
