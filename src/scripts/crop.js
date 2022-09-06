class Crop {
  #fromCell;
  #toCell;
  #cropperHint;
  #callback;

  constructor(cropperHint, callback) {
    this.#cropperHint = cropperHint;
    this.callback = callback;
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
      this.#toCell = cell;
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
      let from = { row: this.#fromCell.Row, col: this.#fromCell.Col };
      let to = { row: this.#toCell.Row, col: this.#toCell.Col };
      if (from.row > to.row && from.col > to.col) {
        let temp = { ...from };
        from = { ...to };
        to = { ...temp };
      } else if (from.row > to.row) {
        let temp = from.row;
        from.row = to.row;
        to.row = temp;
      } else if (from.col > to.col) {
        let temp = from.col;
        from.col = to.col;
        to.col = temp;
      }

      board.CropCells(from, to);
      this.#callback;
    } else {
      this.#fromCell = null;
      this.#toCell = null;
    }
  }
}
