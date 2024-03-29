const exportAndShow = debounce(() => {
  exportPixelArt();
});

function shadowCalculation(extraSpace) {
  let data = [];

  for (const shadow of Object.keys(board.cells)) {
    if (
      typeof board.cells[shadow] == "function" ||
      board.cells[shadow].BackgroundColor === "transparent"
    )
      continue;

    const space = extraSpace ? board.Thickness : 0;

    data.push({
      x: board.cells[shadow].Col * board.Thickness + space,
      y: board.cells[shadow].Row * board.Thickness + space,
      color: board.cells[shadow].BackgroundColor,
      join: function () {
        return `${this.x}px ${this.y}px ${this.color},`;
      },
      scaleAndJoin: function (ratio) {
        const x = Math.max(this.x * ratio, 1);
        const y = Math.max(this.y * ratio, 1);
        return `${x}px ${y}px ${this.color},`;
      },
    });
  }

  return data;
}

function exportSVG() {
  const data = shadowCalculation(false);
  svgCreator({ ...board.Size, "borderRadius": board.Roundness }, data);

  download("image/svg+xml", "svg", svg.outerHTML);
}

function exportJSON() {
  const data = shadowCalculation(false);

  download("application/json", "json", JSON.stringify(data));
}

function exportPNG() {
  const data = shadowCalculation(false);

  pngCreator({ ...board.Size, "borderRadius": board.Roundness }, data);
  download("image/png", "png", canvasExporter.toDataURL("image/png"), true);
}

function download(MIME, type, data, isBase64 = false) {
  var element = document.createElement('a');
  element.setAttribute('href', isBase64 ? data : `data:${MIME};base64, ${btoa(data)}`);
  element.setAttribute('download', `pixelate.${type}`);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function exportPixelArt() {
  const data = shadowCalculation(true);

  const shadows = data.reduce((prev, current) => prev + current.join(), "");

  const boxShadow =
    shadows.length === 0
      ? ""
      : `box-shadow: ${shadows.substring(0, shadows.length - 1)};`;
  let style = `width: ${board.Thickness}px;\nheight: ${board.Thickness}px;\n${boxShadow}`;
  if (board.Roundness > 0) {
    style += `\nborder-radius: ${board.Roundness}%;`;
  }

  showSample(data);
}

function showSample(data) {
  const ratio = findRatio(board.Width, board.Height, board.Thickness);
  const scaledPixel = Math.max(board.Thickness * ratio);

  const shadows = data.reduce(
    (prev, current) => prev + current.scaleAndJoin(ratio),
    ""
  );

  const boxShadow = shadows.length === 0 ? "" : `box-shadow: ${shadows}`;

  let style = `width: ${scaledPixel}px;height: ${scaledPixel}px;border-radius: ${board.Roundness % 101
    }%;${boxShadow};`;

  const width = 150 - board.Width * 0.5 * scaledPixel - scaledPixel;
  const height = 150 - board.Height * 0.5 * scaledPixel - scaledPixel;

  sample.style = `${style.substring(
    0,
    style.length - 2
  )}; transform:translate(${width}px,${height}px);`;
}

function findRatio(row, col, pixel) {
  const width = col * pixel;
  const height = row * pixel;

  if (width > 300 || height > 300) {
    return 300 / (width > height ? width : height);
  }

  return 1;
}

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
