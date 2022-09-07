class Color {
  constructor(palette) {
    this.#palette = palette;
  }

  #colors = new Set();
  #palette;
  #palettes = {};

  CheckColors() {
    this.#colors.clear();
    const colors = board.GetColors();
    colors.forEach((c) => this.#colors.add(rgb2hex(c)));
    this.#CreatePalette();
  }

  #CreatePalette() {
    clearElement(this.#palette);

    for (const color of this.#colors) {
      if (color === "transparent") continue;

      const button = document.createElement("div");
      button.classList.add("color-button");
      const label = document.createElement("label");
      label.setAttribute("for", `color${color.substring(1)}`);
      const p = document.createElement("input");
      p.classList.add("palette");
      p.type = "radio";
      p.id = `color${color.substring(1)}`;
      p.name = "palette";
      p.setAttribute("data-color", color);
      setStyle(label, ["background-color"], [color]);
      button.append(p);
      button.append(label);
      p.addEventListener("click", (e) =>
        this.#ShowColor(e.currentTarget.getAttribute("data-color"))
      );
      this.#palette.append(button);
      this.#palettes[color] = p;
    }

    if (this.#palette.children.length === 0) return;

    const firstRadio = this.#palette.firstChild.firstChild;
    firstRadio.checked = true;
    firstRadio.click();
  }

  #ShowColor(color) {
    const palette = document.querySelector("#replacePalette");
    setStyle(palette, ["background-color"], [color]);
    palette.setAttribute("data-color", color);
  }

  ReplaceColor() {
    board.ReplaceColors(
      document.querySelector("#replacePalette").getAttribute("data-color"),
      document.querySelector("#toColor").value
    );
  }
}
