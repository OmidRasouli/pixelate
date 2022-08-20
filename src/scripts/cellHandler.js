class Cell {
  constructor() {}

  CreateCell(index) {
    //Create div element
    const cellElement = document.createElement("div");

    //Set id for each cell(pixel)
    cellElement.id = `cell${index}`;
    this.id = `cell${index}`;

    //Set the Row
    this.row = Math.floor(index / board.Width);
    //Set the Col
    this.col = Math.floor(index % board.Width);
    //Set the Index
    this.index = index;

    //MouseMove event
    cellElement.addEventListener("mousemove", (e) => {
      //Fill the cell
      drawable && this.FillCell(colorPicker.value, "draw");
      //Eye Dropper
      drawable && this.EyeDropper(e);
    });

    //MouseDown event
    cellElement.addEventListener("mousedown", (e) => {
      //Eye Dropper
      this.EyeDropper(e);
      //Fill the cell if the drawMode is draw or erase
      if (drawMode === "draw" || drawMode === "erase") {
        this.FillCell(colorPicker.value, "draw");
      }
    });

    //MouseUp event
    cellElement.addEventListener("mouseup", (e) => {
      //If drawMode is fill
      if (drawMode === "fill") {
        //Find possible cells to fill
        board.FindCells(this.row, this.col, rgb2hex(this.backgroundColor));
      }
    });

    cellElement.addEventListener("mousedown", () => (drawable = true));

    this.cellElement = cellElement;

    //Fill the cell with transparent color
    this.FillCell("transparent", "draw");

    //Update the style
    this.UpdateStyle();

    //Add cell to the canvas element
    board.Add(this);
  }

  UpdateStyle() {
    //Add the style
    setStyle(
      this.cellElement,
      ["width", "height", "border-radius"],
      [
        `${board.Thickness}px`,
        `${board.Thickness}px`,
        `${board.Roundness % 101}%`,
      ]
    );
  }

  FillCell(color = "transparent", ev = "draw") {
    if (
      (drawMode === "draw" && ev === "draw") ||
      (drawMode === "fill" && ev === "fill") ||
      drawMode === "erase"
    ) {
      this.ChangeColor(color);
    }
    exportAndShow();
  }

  ChangeColor(color) {
    this.backgroundColor = color;
    setStyle(this.cellElement, ["background-color"], [color]);
  }

  EyeDropper(e) {
    if (
      drawMode === "eyeDropper" &&
      e.currentTarget.style.backgroundColor !== ""
    ) {
      colorPicker.value = rgb2hex(e.currentTarget.style.backgroundColor);
    }
  }
}
