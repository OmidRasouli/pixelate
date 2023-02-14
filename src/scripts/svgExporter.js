const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

function svgCreator(svgConfig, rects) {
    cleanSVG();
    svg.setAttribute("viewBox", `0 0 ${svgConfig.width} ${svgConfig.height}`)
    svg.setAttribute("width", `${svgConfig.width}`)
    svg.setAttribute("height", `${svgConfig.height}`)
    console.log(rects)
    rects.forEach(rect => {
        svg.appendChild(getNode('rect', { width: board.Thickness, height: board.Thickness, x: rect.x, y: rect.y, rx: svgConfig.borderRadius * 0.01 * board.Thickness, fill: rect.color }));
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