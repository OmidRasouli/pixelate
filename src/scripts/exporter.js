const exportAndShow = debounce(() => {
  exportPixelArt();
});

function shadowCalculation() {
  let data = [];

  for (const shadow of Object.keys(board.cells)) {
    if (
      typeof board.cells[shadow] == "function" ||
      board.cells[shadow].BackgroundColor === "transparent"
    )
      continue;

    data.push({
      x: board.cells[shadow].Col * board.Thickness + board.Thickness,
      y: board.cells[shadow].Row * board.Thickness + board.Thickness,
      color: board.cells[shadow].BackgroundColor,
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

function exportPixelArt() {
  const data = shadowCalculation();

  const shadows = data.reduce((prev, current) => prev + current.join(), "");

  const boxShadow =
    shadows.length === 0
      ? ""
      : `box-shadow: ${shadows.substring(0, shadows.length - 2)};`;
  let style = `width: ${board.Thickness}px;\nheight: ${board.Thickness}px;\n${boxShadow}`;
  if (board.Roundness > 0) {
    style += `\nborder-radius: ${board.Roundness}%;`;
  }
  output.textContent = style;

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

  let style = `width: ${scaledPixel}px;height: ${scaledPixel}px;border-radius: ${
    board.Roundness % 101
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

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
