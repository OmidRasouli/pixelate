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
    board.Thickness = parseInt(thicknessEl.value);

    //Update styles for cell and board
    board.UpdateStyle();

    //Export them, then show the sample and replace the code
    exportAndShow();
  });

  //Change the value of Roundness
  roundnessEl.addEventListener("change", () => {
    //Get the value and parse to int
    board.Roundness = parseInt(roundnessEl.value);

    //Update styles for cell and board
    board.UpdateStyle();

    //Export them, then show the sample and replace the code
    exportAndShow();
  });

  //Click on the create board button
  createBoard.addEventListener("click", () => {
    //Remove data
    cleanData();

    board.DefineSize(
      +widthEl.value,
      +heightEl.value,
      +thicknessEl.value,
      +roundnessEl.value,
      canvas
    );

    //Create cells
    board.BoardCreator();
  });
}
