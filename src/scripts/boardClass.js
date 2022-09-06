class Board {
  #width;
  #height;
  #thickness;
  #roundness;
  cells = {
    ToJSON: function () {
      const stringCells = {};
      const functions = {};
      const config = {
        width: board.Width,
        height: board.Height,
        thickness: board.Thickness,
        roundness: board.Roundness,
      };
      for (const cell of Object.keys(this)) {
        if (typeof this[cell] != "function") {
          stringCells[cell] = this[cell].ToJSON();
        } else {
          functions[cell] = this[cell];
        }
      }
      const data = {
        cells: JSON.stringify(stringCells),
        functions: { ...functions },
        config: { ...config },
      };
      return data;
    },
    FromJSON: function (json, config) {
      console.log(config);
      board.DefineSize(
        config.width,
        config.height,
        config.thickness,
        config.roundness
      );
      const cells = JSON.parse(json);
      for (const cell of Object.keys(cells)) {
        const newCell = new Cell();
        board.cells[cell] = newCell.FromJSON(cells[cell]);
      }
      board.UpdateStyle();
    },
  };

  constructor(width, height, thickness, roundness, canvas) {
    this.DefineSize(width, height, thickness, roundness);
    this.canvas = canvas;
  }

  //Define sizes
  /**
   *
   * @param {int} width
   * @param {int} height
   * @param {int} thickness
   * @param {int} roundness
   */
  DefineSize(width, height, thickness, roundness = 0) {
    this.Width = width;
    this.Height = height;
    this.Thickness = thickness;
    this.Roundness = roundness;
  }

  /**
   * @param {int} width
   */
  set Width(width) {
    this.#width = width;
  }

  /**
   * @param {int} height
   */
  set Height(height) {
    this.#height = height;
  }

  /**
   * @param {int} thickness
   */
  set Thickness(thickness) {
    this.#thickness = thickness;
  }

  /**
   * @param {int} roundness
   */
  set Roundness(roundness) {
    this.#roundness = roundness;
  }

  /**
   * return integer width
   */
  get Width() {
    return this.#width;
  }

  /**
   * return integer height
   */
  get Height() {
    return this.#height;
  }

  /**
   * return integer thickness
   */
  get Thickness() {
    return this.#thickness;
  }

  /**
   * return integer roundness
   */
  get Roundness() {
    return this.#roundness;
  }

  /**
   * Create board and cells
   */
  BoardCreator() {
    //Calculate the columns in the grid, Width, Height and BG size
    //The Opacity is for the first time shows grid lines
    this.ChangeCanvasStyle(
      [
        "grid-template-columns",
        "width",
        "height",
        "opacity",
        "background-size",
      ],
      [
        `repeat(${this.Width},auto)`,
        `${this.Width * this.Thickness + this.Width - 1}px`,
        `${this.Height * this.Thickness + this.Height - 1}px`,
        "1",
        `${this.Thickness + 1}px ${this.Thickness + 1}px`,
      ]
    );

    const count = this.Width * this.Height;

    //Create cells(pixels)
    for (let i = 0; i < count; i++) {
      const cell = new Cell();
      cell.CreateCell(i);
      this.cells[cell.ID] = cell;
      this.AddToCanvas(cell.Element);
    }

    histories.SaveHistory(this.cells);
  }

  AddToCanvas(Element) {
    this.canvas.append(Element);
  }

  ChangeCanvasStyle(property, style) {
    setStyle(this.canvas, property, style);
  }

  UpdateStyle() {
    this.ChangeCanvasStyle(
      ["grid-template-columns", "width", "height", "background-size"],
      [
        `repeat(${this.Width},auto)`,
        `${this.Width * this.Thickness + this.Width - 1}px`,
        `${this.Height * this.Thickness + this.Height - 1}px`,
        `${this.Thickness + 1}px ${this.Thickness + 1}px`,
      ]
    );

    //Change the size of cells in the canvas
    for (const cell of Object.keys(this.cells)) {
      if (typeof this.cells[cell] != "function") this.cells[cell].UpdateStyle();
    }
  }

  /**
   *
   * @param {int} row
   * @param {int} col
   * @param {String} color
   * @param {Array<int>} indexes
   * @param {String} direction
   * @returns {null}
   */
  FindCells(row, col, color, indexes = [], direction = "Null") {
    let index = `cell${findInex(row, col, board.Width)}`;
    if (
      indexes.includes(index) ||
      row < 0 ||
      row >= this.Width ||
      col < 0 ||
      col >= this.Height ||
      this.cells[index].BackgroundColor === colorPicker.value ||
      this.cells[index].BackgroundColor !== color
    )
      return;

    indexes.push(index);
    if (this.cells[index].BackgroundColor === color) {
      tools.Draw(
        this.cells[index],
        colorPicker.value,
        "mouseup",
        tools.Types.Pencil
      );
    }

    if (direction !== "Down") {
      this.FindCells(row - 1, col, color, indexes, "Up", index);
    }
    if (direction !== "Left") {
      this.FindCells(row, col + 1, color, indexes, "Right", index);
    }
    if (direction !== "Up") {
      this.FindCells(row + 1, col, color, indexes, "Down", index);
    }
    if (direction !== "Right") {
      this.FindCells(row, col - 1, color, indexes, "Left", index);
    }
  }

  CropCells(from, to) {
    const cellsInRange = new Set();
    const row = to.row - from.row + 1;
    const col = to.col - from.col + 1;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const currentCol = from.col + j;
        const currentRow = from.row + i;
        const index = currentRow * this.Width + currentCol;
        const id = `cell${index}`;
        cellsInRange.add(id);
      }
    }

    for (const cell of Object.keys(this.cells)) {
      if (typeof this.cells[cell] != "function" && !cellsInRange.has(cell)) {
        cellsInRange.delete(cell);
        this.cells[cell].Element.remove();
        delete this.cells[cell];
      }
    }

    this.DefineSize(col, row, this.Thickness);
    this.UpdateStyle();
    exportAndShow();
    histories.SaveHistory(this.cells);
  }
}
