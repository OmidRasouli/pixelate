function startupEvents() {
  //Click on pen tools
  pen.addEventListener("click", () => (drawMode = "draw"));
  //Click on eraser tools
  eraser.addEventListener("click", () => (drawMode = "erase"));
  //Click on eye dropper tools
  eyedropper.addEventListener("click", () => (drawMode = "eyeDropper"));
  //Click on fill tools
  fill.addEventListener("click", () => (drawMode = "fill"));
  //Mouse up anywhere on document
  document.addEventListener("mouseup", () => {
    drawable = false;
  });

  //Change the value of Thickness
  thicknessEl.addEventListener("change", () => {
    //Get the value and parse to int
    thickness = parseInt(thicknessEl.value);
    //Calculate the Width
    canvas.style.width = `${width * thickness + width - 1}px`;
    //Calculate the Height
    canvas.style.height = `${height * thickness + height - 1}px`;
    //Calculate the Background size
    canvas.style.backgroundSize = `${thickness + 1}px ${thickness + 1}px`;

    //Change the size of cells in the canvas
    for (const cell of canvas.childNodes) {
      cell.style.width = `${thickness}px`;
      cell.style.height = `${thickness}px`;
    }
    //Export them, then show the sample and replace the code
    exportPixelArt();
  });

  //Change the value of Roundness
  roundnessEl.addEventListener("change", () => {
    //Get the value and parse to int
    roundness = parseInt(roundnessEl.value);

    //Change the border radius of cells in the canvas
    for (const cell of canvas.childNodes) {
      cell.style.borderRadius = `${roundness % 101}%`;
    }
    //Export them, then show the sample and replace the code
    exportPixelArt();
  });

  //Click on the create board button
  createBoard.addEventListener("click", () => {
    //Remove data
    cleanData();

    //Calculate the columns in the grid, Width and Height
    //The Opacity is for the first time shows grid lines
    const canvasStyle = `grid-template-columns:repeat(${width},auto);height:${
      height * thickness + height - 1
    }px;width:${width * thickness + width - 1}px;opacity:1;`;

    //Add the style above
    canvas.style.cssText = canvasStyle;

    //Create cells
    createCells();
  });
}
