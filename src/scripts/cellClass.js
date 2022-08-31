class Cell {
  #cellElement;
  #backgroundColor;
  #row;
  #col;
  #index;
  #id;

  constructor() {}

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

    //Set the Row
    this.#row = Math.floor(index / board.Width);
    //Set the Col
    this.#col = Math.floor(index % board.Width);
    //Set the Index
    this.#index = index;

    //MouseMove event
    cellElement.addEventListener("mousemove", (e) => {
      tools.Draw(this, colorPicker.value, "mousemove");
    });

    //MouseDown event
    cellElement.addEventListener("mousedown", (e) => {
      tools.IsDrawing(true);
      tools.Draw(this, colorPicker.value, "mousedown");
    });

    //MouseUp event
    cellElement.addEventListener("mouseup", (e) => {
      tools.Draw(this, colorPicker.value, "mouseup");
    });

    //Hold element to the class
    this.#cellElement = cellElement;

    tools.IsDrawing(true);
    //Fill the cell with transparent color
    tools.Draw(this, "transparent", "mousedown");
    tools.IsDrawing(false);

    //Update the style
    this.UpdateStyle();

    //Add cell to the canvas element
    board.Add(this);
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
