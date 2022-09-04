class Crop {
  constructor() {}

  #fromCell;

  SetStart(fromCell) {
    this.#fromCell = fromCell;
  }

  Crop(toCell) {
    console.log(this.#fromCell);
    console.log(toCell);
  }
}
