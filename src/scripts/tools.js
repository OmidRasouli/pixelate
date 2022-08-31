class Tools {
  //Store the type of tools
  #type;
  //When the board is drawing
  #isDrawing;

  //Type of tools (Enum)
  Types = {
    Pencil: "pencil",
    Fill: "fill",
    Eraser: "eraser",
    EyeDropper: "eyeDropper",
  };

  //Default values
  constructor() {
    this.PickTools(this.Types.Pencil);
    this.IsDrawing(false);
  }

  //Set the current tools
  PickTools(tools) {
    this.#type = tools;
  }

  //Set if drawing
  IsDrawing(state) {
    this.#isDrawing = state;
  }

  //Just call the draw method
  /**
   *
   * @param {Cell} Cell
   * @param {Color} color
   * @param {MouseEvent} event
   */
  Draw(cell, color = "transparent", event = "none") {
    if (!this.#isDrawing) return;

    switch (this.#type) {
      case this.Types.Fill:
        //When mouse up and mouse move triggered it will be called
        if (event === "mouseup" || event === "mousemove") {
          this.#Fill(cell);
        }
        break;
      case this.Types.Pencil:
        this.#Pencil(cell, color);
        break;
      case this.Types.Eraser:
        this.#Eraser(cell);
        break;
      case this.Types.EyeDropper:
        this.#EyeDropper(cell);
        break;

      default:
        break;
    }
    exportAndShow();
  }

  //Fill the color to possible cells
  #Fill(cell) {
    board.FindCells(cell.Row, cell.Col, rgb2hex(cell.BackgroundColor));
  }

  //Fill the color to the cell
  #Pencil(cell, color) {
    cell.ChangeColor(color);
  }

  //Fill the transparent color to the cell
  #Eraser(cell) {
    cell.ChangeColor("transparent");
  }

  //Read the color of the cell and change the colorPicker's value
  #EyeDropper(cell) {
    if (cell.Element.style.BackgroundColor !== "") {
      colorPicker.value = rgb2hex(cell.Element.style.backgroundColor);
    }
  }
}
