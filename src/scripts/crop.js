class Crop {
  #fromCell;
  #cropperHint;

  constructor(cropperHint) {
    this.#cropperHint = cropperHint;
    setStyle(document.querySelector("#confirmCrop"), ["display"], ["none"]);
  }

  Crop(cell, state) {
    if (state === "start") {
      this.#fromCell = cell;
      this.UpdateHint(cell);
      setStyle(document.querySelector("#confirmCrop"), ["display"], [""]);
      setStyle(this.#cropperHint, ["display"], ["block"]);
    } else if (state === "end") {
      this.UpdateHint(cell);
    } else if (state === "move") {
      this.UpdateHint(cell);
    }
  }

  UpdateHint(cell) {
    let offsetLeft =
      cell.Element.offsetLeft - this.#fromCell.Element.offsetLeft;
    let offsetTop = cell.Element.offsetTop - this.#fromCell.Element.offsetTop;
    let width = 0;
    let height = 0;

    if (offsetLeft < 0) {
      setStyle(
        this.#cropperHint,
        ["left"],
        [`${cell.Element.offsetLeft - 0.5}px`]
      );
      offsetLeft = this.#fromCell.Element.offsetLeft - cell.Element.offsetLeft;
      width = offsetLeft + this.#fromCell.Element.offsetWidth;
    } else {
      setStyle(
        this.#cropperHint,
        ["left"],
        [`${this.#fromCell.Element.offsetLeft - 0.5}px`]
      );
      width = offsetLeft + cell.Element.offsetWidth;
    }

    if (offsetTop < 0) {
      setStyle(
        this.#cropperHint,
        ["top"],
        [`${cell.Element.offsetTop - 0.5}px`]
      );
      offsetTop = this.#fromCell.Element.offsetTop - cell.Element.offsetTop;
      height = offsetTop + this.#fromCell.Element.offsetHeight;
    } else {
      setStyle(
        this.#cropperHint,
        ["top"],
        [`${this.#fromCell.Element.offsetTop - 0.5}px`]
      );
      height = offsetTop + cell.Element.offsetHeight;
    }

    setStyle(
      this.#cropperHint,
      ["width", "height"],
      [`${width}px`, `${height}px`]
    );
  }

  SaveChanges(trim) {
    setStyle(this.#cropperHint, ["display"], ["none"]);
    setStyle(document.querySelector("#confirmCrop"), ["display"], ["none"]);
    if (trim) {
      console.log("remove elements");
    }
  }
}
