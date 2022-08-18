const width = document.querySelector("#width");
const height = document.querySelector("#height");
const thickness = document.querySelector("#thickness");
const roundness = document.querySelector("#roundness");
const createBoard = document.querySelector("#create");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const colorPicker = document.querySelector("#color");
const canvas = document.querySelector("#canvas");
const sample = document.querySelector("#sample");
const output = document.querySelector("#output");

let drawMode = "draw";
let drawable = false;

let cells = {};

(function () {
  cleanData();
  pen.addEventListener("click", () => (drawMode = "draw"));
  eraser.addEventListener("click", () => (drawMode = "erase"));
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
    div.addEventListener("mousedown", () => (drawable = true));

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
  exportPixelArt();
}

function cleanData() {
  canvas.innerHTML = "";
  cells = {};
  exportPixelArt();
}

function exportPixelArt() {
  const data = shadowCalculation();

  const boxShadow =
    "box-shadow:" + data.reduce((prev, current) => prev + current.join(), "");
  let style = `width: ${thickness.value}px;\nheight: ${thickness.value}px;\n${boxShadow};`;
  if (+roundness.value > 0) {
    style += `\nborder-radius: ${+roundness.value}%;`;
  }
  output.textContent = style;

  showSample(data);
}

function shadowCalculation() {
  let data = [];

  for (const shadow of Object.keys(cells)) {
    data.push({
      x: cells[shadow].col * thickness.value + +thickness.value,
      y: cells[shadow].row * thickness.value + +thickness.value,
      color: cells[shadow].color,
      join: function () {
        return `${this.x}px ${this.y}px 0 0 ${this.color},`;
      },
      scaleAndJoin: function (ratio) {
        const x = Math.max(this.x * ratio, 1);
        const y = Math.max(this.y * ratio, 1);
        return `${x}px ${y}px 0 0 ${this.color},`;
      },
    });
  }

  return data;
}

function showSample(data) {
  const ratio = findRatio(width.value, height.value, thickness.value);
  console.log(ratio);
  const scaledPixel = Math.max(thickness.value * ratio);

  const boxShadow =
    "box-shadow:" +
    data.reduce((prev, current) => prev + current.scaleAndJoin(ratio), "");
  let style = `width: ${scaledPixel}px;\nheight: ${scaledPixel}px;\n${boxShadow};`;

  sample.style = `${style.substring(
    0,
    style.length - 2
  )}; transform:translate(${-scaledPixel}px,${-scaledPixel}px);`;
}

function findRatio(row, col, pixel) {
  const width = col * pixel;
  const height = row * pixel;
  let ratio = 0;

  if (width > 300 || height > 300) {
    return (ratio = 300 / (width > height ? width : height));
  }

  return 1;
}
