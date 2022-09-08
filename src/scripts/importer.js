class Importer {
  #canvas;
  #context;

  get Canvas() {
    return this.#canvas;
  }

  get Context() {
    return this.#context;
  }

  constructor(canvas) {
    this.#canvas = canvas;
    this.#context = this.#canvas.getContext("2d");
  }

  LoadImage(src, callback) {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", () => {
      if (image.height > 200) {
        const ratio = 200 / image.height;
        importer.Canvas.height = 200;
        importer.Canvas.width = image.width * ratio;
      } else if (image.width > 200) {
        const ratio = 200 / image.width;
        importer.Canvas.width = 200;
        importer.Canvas.height = image.height * ratio;
      } else {
        importer.Canvas.height = image.height;
        importer.Canvas.width = image.width;
      }

      importer.Context.drawImage(
        image,
        0,
        0,
        importer.Canvas.width,
        importer.Canvas.height
      );
      callback;
    });
  }

  Import(pixel) {
    const pixelSize = parseInt(pixel);
    const width = importer.Canvas.width / pixelSize;
    const height = importer.Canvas.height / pixelSize;
    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d");
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempContext.drawImage(this.Canvas, 0, 0, width, height);

    const data = tempContext.getImageData(0, 0, width, height).data;

    const cells = {};

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        cells[`cell${i / 4}`] = rgb2hex(
          `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${data[i + 3]})`
        );
      }
    }

    board.Clear();
    board.DefineSize(width, height, pixelSize, 0);
    board.BoardCreator();
    board.ColorCells(cells);
  }
}
