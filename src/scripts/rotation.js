class Rotation {
  rotateMode = {
    Right: "right",
    Left: "left",
    MirrorVertical: "vertical",
    MirrorHorizontal: "horizontal",
  };

  constructor() {
    setStyle(document.querySelector("#rotateMode"), ["display"], ["none"]);
  }

  Rotate(mode) {
    board.Rotate(mode);
  }
}
