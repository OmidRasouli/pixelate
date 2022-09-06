class Cell {
  #cellElement;
  #backgroundColor;
  #row;
  #col;
  #index;
  #id;

  constructor() {}

  ToJSON() {
    return JSON.stringify({
      backgroundColor: this.#backgroundColor,
      row: this.#row,
      col: this.#col,
      index: this.#index,
      id: this.#id,
    });
  }

  FromJSON(cell) {
    const newCell = JSON.parse(cell);
    this.#cellElement = document.querySelector(`#${newCell.id}`);
    if (this.#cellElement === null) {
      this.CreateCell(newCell.index);
      board.AddToCanvas(this);
    }
    this.#backgroundColor = newCell.backgroundColor;
    this.#row = newCell.row;
    this.#col = newCell.col;
    this.#index = newCell.index;
    this.#id = newCell.id;
    tools.Draw(this, this.BackgroundColor, "mousedown", tools.Types.Pencil);
    return this;
  }

  /**
   * return HTMLElement of the cell
   */
  get Element() {
    return this.#cellElement;
  }

  /**
   * return string background color
   */
  get BackgroundColor() {
    return this.#backgroundColor;
  }

  /**
   * return int row
   */
  get Row() {
    return this.#row;
  }

  /**
   * return int col
   */
  get Col() {
    return this.#col;
  }

  /**
   * return int index
   */
  get Index() {
    return this.#index;
  }

  /**
   * return string id
   */
  get ID() {
    return this.#id;
  }

  CreateCell(index) {
    //Create div element
    const cellElement = document.createElement("div");

    //Set id for each cell(pixel)
    cellElement.id = `cell${index}`;
    this.#id = `cell${index}`;
    cellElement.innerHTML = index;

    //Add class
    cellElement.classList.add("cell");

    //Set the Row
    this.#row = Math.floor(index / board.Width);
    //Set the Col
    this.#col = Math.floor(index % board.Width);
    //Set the Index
    this.#index = index;

    //MouseMove event
    cellElement.addEventListener("mousemove", (e) => {
      tools.Draw(
        board.cells[e.target.getAttribute("id")],
        colorPicker.value,
        "mousemove"
      );
    });

    //MouseDown event
    cellElement.addEventListener("mousedown", (e) => {
      tools.IsDrawing(true);
      tools.Draw(
        board.cells[e.target.getAttribute("id")],
        colorPicker.value,
        "mousedown"
      );
    });

    //MouseUp event
    cellElement.addEventListener("mouseup", (e) => {
      tools.Draw(
        board.cells[e.target.getAttribute("id")],
        colorPicker.value,
        "mouseup"
      );
    });

    //Hold element to the class
    this.#cellElement = cellElement;

    //Fill the cell with transparent color
    tools.Draw(this, "transparent", "mousedown", tools.Types.Pencil);

    //Update the style
    this.UpdateStyle();
  }

  //This function update the style
  UpdateStyle() {
    //Add the style
    setStyle(
      this.Element,
      ["width", "height", "border-radius"],
      [
        `${board.Thickness}px`,
        `${board.Thickness}px`,
        `${board.Roundness % 101}%`,
      ]
    );
  }

  /**
   *
   * @param {String} color
   * Change the color of the cell(pixel)
   */
  ChangeColor(color) {
    this.#backgroundColor = color;
    setStyle(this.Element, ["background-color"], [color]);
  }
}
