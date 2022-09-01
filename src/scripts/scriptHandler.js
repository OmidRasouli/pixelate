/**
 * @param {HTMLElement} element
 * @param {Array} property
 * @param {Array} style
 */
function setStyle(element, property, style) {
  property.forEach((value, index) => {
    element.style[value] = `${style[index]}`;
  });
}

function rgb2hex(rgb) {
  const regex = new RegExp(/^rgba?/);
  if (!regex.test(rgb)) return rgb;

  rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.*\d+)?\)$/);
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return ("0" + parseInt(x).toString(16)).slice(-2);
}

function findInex(i, j, width) {
  return (i * width + j).toString();
}
