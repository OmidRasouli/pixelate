const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

function svgCreator(boardConfig, rects) {
    cleanSVG();
    svg.setAttribute("viewBox", `0 0 ${boardConfig.width} ${boardConfig.height}`)
    svg.setAttribute("width", `${boardConfig.width}`)
    svg.setAttribute("height", `${boardConfig.height}`)
    console.log(rects)
    rects.forEach(rect => {
        svg.appendChild(getNode('rect', { width: board.Thickness, height: board.Thickness, x: rect.x, y: rect.y, rx: boardConfig.borderRadius * 0.01 * board.Thickness, fill: rect.color }));
    });
}

function getNode(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v)
        n.setAttributeNS(null, p, v[p]);
    return n
}

function cleanSVG() {
    var child = svg.lastElementChild;
    while (child) {
        svg.removeChild(child);
        child = svg.lastElementChild;
    }
}


function pngCreator(boardConfig, rects) { }