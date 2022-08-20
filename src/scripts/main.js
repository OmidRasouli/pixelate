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

let width = parseInt(widthEl.value);
let height = parseInt(heightEl.value);
let thickness = parseInt(thicknessEl.value);
let roundness = parseInt(roundnessEl.value);

let drawMode = "draw";
let drawable = false;

let cells = {};

(function () {
  cleanData();
  startupEvents();
})();

function createCells() {
  canvas.style.backgroundSize = `${thickness + 1}px ${thickness + 1}px`;
  width = parseInt(widthEl.value);
  height = parseInt(heightEl.value);
  thickness = parseInt(thicknessEl.value);
  roundness = parseInt(roundnessEl.value);
  const count = width * height;
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    let styles = `width:${thickness}px;height:${thickness}px;border-radius:${
      roundness % 101
    }%`;
    div.style.cssText = styles;
    div.id = `cell${i}`;
    div.setAttribute("data-row", Math.floor(i / width));
    div.setAttribute("data-col", Math.floor(i % width));
    div.setAttribute("data-index", i);
    div.addEventListener("mousemove", (e) => {
      drawable && fillCell(e.currentTarget, colorPicker.value, "draw");
      drawable && eyeDropper(e);
    });
    div.addEventListener("mousedown", (e) => {
      eyeDropper(e);
      if (drawMode === "draw" || drawMode === "erase") {
        fillCell(e.currentTarget, colorPicker.value, "draw");
      }
    });
    div.addEventListener("mouseup", (e) => {
      if (drawMode === "fill") {
        findCells(
          parseInt(e.currentTarget.getAttribute("data-row")),
          parseInt(e.currentTarget.getAttribute("data-col")),
          rgb2hex(e.currentTarget.style.backgroundColor)
        );
      }
    });
    div.addEventListener("mousedown", () => (drawable = true));
    fillCell(div, "transparent", "draw");

    canvas.append(div);
  }
}

function fillCell(cell, color = "transparent", ev = "draw") {
  if (
    (drawMode === "draw" && ev === "draw") ||
    (drawMode === "fill" && ev === "fill")
  ) {
    cell.style.backgroundColor = color;
    cells[cell.getAttribute("data-index")] = {
      row: parseInt(cell.getAttribute("data-row")),
      col: parseInt(cell.getAttribute("data-col")),
      color: color,
      element: cell,
    };
  } else if (drawMode === "erase") {
    cell.style.backgroundColor = "transparent";
    cells[cell.getAttribute("data-index")].color = "transparent";
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
  let style = `width: ${thickness}px;\nheight: ${thickness}px;\n${boxShadow};`;
  if (roundness > 0) {
    style += `\nborder-radius: ${roundness}%;`;
  }
  output.textContent = style;

  showSample(data);
}

function shadowCalculation() {
  let data = [];

  for (const shadow of Object.keys(cells)) {
    data.push({
      x: cells[shadow].col * thickness + thickness,
      y: cells[shadow].row * thickness + thickness,
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
  const ratio = findRatio(width, height, thickness);
  const scaledPixel = Math.max(thickness * ratio);

  const boxShadow =
    "box-shadow:" +
    data.reduce((prev, current) => prev + current.scaleAndJoin(ratio), "");
  let style = `width: ${scaledPixel}px;height: ${scaledPixel}px;border-radius: ${
    roundness % 101
  }%;${boxShadow};`;

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

function eyeDropper(e) {
  if (
    drawMode === "eyeDropper" &&
    e.currentTarget.style.backgroundColor !== ""
  ) {
    colorPicker.value = rgb2hex(e.currentTarget.style.backgroundColor);
  }
}

function rgb2hex(rgb) {
  if (rgb === "transparent") return rgb;

  rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.*\d+)?\)$/);
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return ("0" + parseInt(x).toString(16)).slice(-2);
}

function findCells(i, j, color, indexes = [], direction = "Null", last = null) {
  let index = findInex(i, j);
  if (
    indexes.includes(index) ||
    i < 0 ||
    i >= width ||
    j < 0 ||
    j >= height ||
    cells[index].color === colorPicker.value ||
    cells[index].color !== color
  )
    return;

  indexes.push(index);
  if (cells[index].color === color) {
    fillCell(cells[index].element, colorPicker.value, "fill");
  }

  if (direction !== "Down") {
    findCells(i - 1, j, color, indexes, "Up", index);
  }
  if (direction !== "Left") {
    findCells(i, j + 1, color, indexes, "Right", index);
  }
  if (direction !== "Up") {
    findCells(i + 1, j, color, indexes, "Down", index);
  }
  if (direction !== "Right") {
    findCells(i, j - 1, color, indexes, "Left", index);
  }
}

function findInex(i, j) {
  return (i * width + j).toString();
}
