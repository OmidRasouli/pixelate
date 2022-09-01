function startupEvents() {
  //Click on pen tools
  pen.addEventListener("click", () => tools.PickTools(tools.Types.Pencil));
  //Click on eraser tools
  eraser.addEventListener("click", () => tools.PickTools(tools.Types.Eraser));
  //Click on eye dropper tools
  eyedropper.addEventListener("click", () =>
    tools.PickTools(tools.Types.EyeDropper)
  );
  //Click on fill tools
  fill.addEventListener("click", () => tools.PickTools(tools.Types.Fill));
  //Mouse up anywhere on document
  document.addEventListener("mouseup", () => {
    if (tools.isDrawing) {
      histories.SaveHistory(board.cells);
    }
    tools.IsDrawing(false);
  });

  //Change the value of Thickness
  document.querySelector("#thickness").addEventListener("change", () => {
    //Get the value and parse to int
    board.Thickness = parseInt(thickness());

    //Update styles for cell and board
    board.UpdateStyle();

    //Export them, then show the sample and replace the code
    exportAndShow();
  });

  //Change the value of Roundness
  document.querySelector("#roundness").addEventListener("change", () => {
    //Get the value and parse to int
    board.Roundness = parseInt(roundness());

    //Update styles for cell and board
    board.UpdateStyle();

    //Export them, then show the sample and replace the code
    exportAndShow();
  });

  //Click on the create board button
  createBoard.addEventListener("click", () => {
    //Remove data
    cleanData();

    board.DefineSize(width(), height(), thickness(), roundness(), canvas);

    //Create cells
    board.BoardCreator();
  });
}
