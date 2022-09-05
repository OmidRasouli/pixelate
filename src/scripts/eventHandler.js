function startupEvents() {
  //Click on submenu (new)
  document
    .querySelector("#new")
    .addEventListener("click", () => (createWindow.style.display = ""));
  //Click on submenu (options)
  document
    .querySelector("#options")
    .addEventListener("click", () => (optionsWindow.style.display = ""));
  //Click on close create window
  document
    .querySelector("#closeWindow")
    .addEventListener("click", () => (createWindow.style.display = "none"));
  //Click on close options window
  document
    .querySelector("#closeOptions")
    .addEventListener("click", () => (optionsWindow.style.display = "none"));
  //Click on close options window
  document.querySelector("#saveOptions").addEventListener("click", () => {
    thicknessEl.value = thicknessOpt.value;
    roundnessEl.value = roundnessOpt.value;
    UpdateOptions();
    optionsWindow.style.display = "none";
  });
  //Click on pen tools
  document.querySelector("#pen").addEventListener("click", () => {
    tools.PickTools(tools.Types.Pencil);
    crop.SaveChanges(false);
  });
  //Click on eraser tools
  document.querySelector("#eraser").addEventListener("click", () => {
    tools.PickTools(tools.Types.Eraser);
    crop.SaveChanges(false);
  });
  //Click on eye dropper tools
  document
    .querySelector("#eyedropper")
    .addEventListener("click", () => tools.PickTools(tools.Types.EyeDropper));
  //Click on fill tools
  document.querySelector("#fill").addEventListener("click", () => {
    tools.PickTools(tools.Types.Fill);
    crop.SaveChanges(false);
  });
  //Click on cropper tools
  document
    .querySelector("#crop")
    .addEventListener("click", () => tools.PickTools(tools.Types.Crop));
  //Mouse up anywhere on document
  document.addEventListener("mouseup", () => {
    if (tools.isDrawing) {
      histories.SaveHistory(board.cells);
    }
    tools.IsDrawing(false);
  });

  //Click on undo
  document
    .querySelector("#undo")
    .addEventListener("click", () => histories.Undo());

  //Click on redo
  document
    .querySelector("#redo")
    .addEventListener("click", () => histories.Redo());

  //Click on accept crop
  document
    .querySelector("#acceptCrop")
    .addEventListener("click", () => crop.SaveChanges(true));

  //Click on cancel crop
  document
    .querySelector("#cancelCrop")
    .addEventListener("click", () => crop.SaveChanges(false));

  //Change the value of Thickness
  thicknessEl.addEventListener("change", () => {
    UpdateOptions();
  });

  //Change the value of Roundness
  roundnessEl.addEventListener("change", () => {
    UpdateOptions();
  });

  //Click on the create board button
  document.querySelector("#create").addEventListener("click", () => {
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
  //Get the value and parse to int
  board.Roundness = parseInt(roundness());

  //Update styles for cell and board
  board.UpdateStyle();

  //Export them, then show the sample and replace the code
  exportAndShow();
}
