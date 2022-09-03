function startupEvents() {
  //Click on submenu (new)
  menuNew.addEventListener("click", () => (createWindow.style.display = ""));
  //Click on submenu (options)
  menuOptions.addEventListener(
    "click",
    () => (optionsWindow.style.display = "")
  );
  //Click on close create window
  closeWindow.addEventListener(
    "click",
    () => (createWindow.style.display = "none")
  );
  //Click on close options window
  closeOptions.addEventListener(
    "click",
    () => (optionsWindow.style.display = "none")
  );
  //Click on close options window
  saveOptions.addEventListener("click", () => {
    thicknessEl.value = thicknessOpt.value;
    roundnessEl.value = roundnessOpt.value;
    UpdateOptions();
    optionsWindow.style.display = "none";
  });
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

  //Click on undo
  undo.addEventListener("click", () => histories.Undo());

  //Click on redo
  redo.addEventListener("click", () => histories.Redo());

  //Change the value of Thickness
  thicknessEl.addEventListener("change", () => {
    UpdateOptions();
  });

  //Change the value of Roundness
  roundnessEl.addEventListener("change", () => {
    //Get the value and parse to int
    board.Roundness = parseInt(roundness());

    //Update styles for cell and board
    board.UpdateStyle();

    //Export them, then show the sample and replace the code
    exportAndShow();
  });

  //Click on the create board button
  createBoard.addEventListener("click", () => {
    thicknessOpt.value = thicknessEl.value;
    roundnessOpt.value = roundnessEl.value;
    //Remove data
    cleanData();

    board.DefineSize(width(), height(), thickness(), roundness(), canvas);

    //Create cells
    board.BoardCreator();

    createWindow.style.display = "none";
  });
}

function UpdateOptions() {
  //Get the value and parse to int
  board.Thickness = parseInt(thickness());

  //Update styles for cell and board
  board.UpdateStyle();

  //Export them, then show the sample and replace the code
  exportAndShow();
}
