class Board {
  #width;
  #height;
  #thickness;
  #roundness;

  constructor(width, height, thickness, roundness, canvas) {
    this.DefineSize(width, height, thickness, roundness);
    this.canvas = canvas;
    this.cells = {};
  }

  //Define sizes
  /**
   *
   * @param {int} width
   * @param {int} height
   * @param {int} thickness
   * @param {int} roundness
   */
  DefineSize(width, height, thickness, roundness) {
    this.Width = width;
    this.Height = height;
    this.Thickness = thickness;
    this.Roundness = roundness;
  }

  /**
   *
   * @param {Cell} cell
   */
  Add(cell) {
    this.cells[cell.ID] = cell;
    this.canvas.append(cell.Element);
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
    }
  }

  ChangeCanvasStyle(property, style) {
    setStyle(this.canvas, property, style);
  }

  UpdateStyle() {
    board.ChangeCanvasStyle(
      ["width", "height", "background-size"],
      [
        `${this.Width * this.Thickness + this.Width - 1}px`,
        `${this.Height * this.Thickness + this.Height - 1}px`,
        `${this.Thickness + 1}px ${this.Thickness + 1}px`,
      ]
    );

    //Change the size of cells in the canvas
    for (const cell of Object.keys(this.cells)) {
      this.cells[cell].UpdateStyle();
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
      tools.IsDrawing(true);
      tools.PickTools(tools.Types.Pencil);
      tools.Draw(this.cells[index], colorPicker.value, "mouseup");
      tools.PickTools(tools.Types.Fill);
      tools.IsDrawing(false);
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
}
