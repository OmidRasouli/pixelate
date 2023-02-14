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
      clearElement(canvas);
      board.DefineSize(
        config.width,
        config.height,
        config.thickness,
        config.roundness
      );
      const cells = JSON.parse(json);

      board.cells = {
        FromJSON: board.cells.FromJSON,
        ToJSON: board.cells.ToJSON,
      };
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
   * return {width, height}
   */
  get Size() {
    return { "width": this.#width * this.#thickness, "height": this.#height * this.#thickness };
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

    this.CreateCells(this.cells);

    histories.SaveHistory(this.cells);
  }

  CreateCells(cellsObj) {
    const count = this.Width * this.Height;

    //Create cells(pixels)
    for (let i = 0; i < count; i++) {
      const cell = new Cell();
      cell.CreateCell(i);
      cellsObj[cell.ID] = cell;
      this.AddToCanvas(cell);
    }
  }

  AddToCanvas(cell) {
    const sibling = this.canvas.querySelector(`#cell${cell.Index - 1}`);
    if (sibling === null) {
      if (this.canvas.lastChild === null || cell.Index === 0) {
        this.canvas.prepend(cell.Element);
      } else {
        this.canvas.append(cell.Element);
      }
    } else {
      sibling.insertAdjacentElement("afterend", cell.Element);
    }
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
      row >= this.Height ||
      col < 0 ||
      col >= this.Width ||
      this.cells[index] === null ||
      this.cells[index].BackgroundColor === colorPicker.value ||
      this.cells[index].BackgroundColor !== color
    )
      return;

    indexes.push(index);
    if (this.cells[index].BackgroundColor === color) {
      tools.Draw(
        this.cells[index],
        colorPicker.value,
        "mousemove",
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

  Clear() {
    clearElement(this.canvas);
    this.cells = { ToJSON: this.cells.ToJSON, FromJSON: this.cells.FromJSON };
  }

  CropCells(from, to) {
    const cellsInRange = new Set();
    const row = Math.abs(to.row - from.row) + 1;
    const col = Math.abs(to.col - from.col) + 1;

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

    const cells = [...cellsInRange];
    const newCells = {
      ToJSON: this.cells.ToJSON,
      FromJSON: this.cells.FromJSON,
    };

    for (let i = 0; i < cells.length; i++) {
      this.cells[cells[i]].Assign(i);
      newCells[this.cells[cells[i]].ID] = this.cells[cells[i]];
    }

    this.cells = { ...newCells };
    this.UpdateStyle();
    exportAndShow();
    histories.SaveHistory(this.cells);
  }

  ColorCells(cells) {
    for (const cell of Object.entries(cells)) {
      this.cells[cell[0]].ChangeColor(cell[1]);
    }
  }

  GetColors() {
    const colors = new Set();
    for (const cell of Object.keys(this.cells)) {
      if (
        typeof this.cells[cell] != "function" &&
        this.cells[cell].BackgroundColor !== "transparent"
      ) {
        colors.add(this.cells[cell].BackgroundColor);
      }
    }

    return [...colors];
  }

  ReplaceColors(from, to) {
    const colors = new Set();
    for (const cell of Object.keys(this.cells)) {
      if (
        typeof this.cells[cell] != "function" &&
        this.cells[cell].BackgroundColor === rgb2hex(from)
      ) {
        this.cells[cell].ChangeColor(rgb2hex(to));
      }
    }

    exportAndShow();
    histories.SaveHistory(this.cells);
  }

  Rotate(mode) {
    if (this.cells === null) return;

    const newCells = {
      ToJSON: this.cells.ToJSON,
      FromJSON: this.cells.FromJSON,
    };

    if (
      mode === rotation.rotateMode.Right ||
      mode === rotation.rotateMode.Left
    ) {
      this.DefineSize(this.Height, this.Width, this.Thickness, this.Roundness);
      this.UpdateStyle();
    }

    this.CreateCells(newCells);

    for (const cell of Object.keys(this.cells)) {
      if (typeof this.cells[cell] != "function") {
        const index = this.GetIndex(this.cells[cell], mode);

        this.cells[cell].Element.remove();
        newCells[`cell${index}`].Assign(index);
        newCells[`cell${index}`].ChangeColor(this.cells[cell].BackgroundColor);
      }
    }

    this.cells = newCells;
    exportAndShow();
    histories.SaveHistory(this.cells);
  }

  GetIndex(cell, mode) {
    switch (mode) {
      case rotation.rotateMode.Right:
        const rowRight = cell.Col;
        const colRight = this.Width - cell.Row - 1;
        return this.Width * rowRight + colRight;
      case rotation.rotateMode.Left:
        const rowLeft = this.Height - cell.Col - 1;
        const colLeft = cell.Row;
        return this.Width * rowLeft + colLeft;
      case rotation.rotateMode.MirrorVertical:
        const col = this.Width - cell.Col - 1;
        return this.Width * cell.Row + col;
      case rotation.rotateMode.MirrorHorizontal:
        const row = this.Height - cell.Row - 1;
        return this.Width * row + cell.Col;
      default:
        return null;
    }
  }
}
