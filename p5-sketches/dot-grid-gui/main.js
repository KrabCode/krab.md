const pane = new Tweakpane.Pane();

let PARAMS = {
    "weight" : 2.5,
    "margin" : 10,
    "offset" : 10,
    "step" : 20,
    "foreground" : '#787878',
    "background" : '#242424'
}

const f = pane.addFolder({
    title: 'dot-grid',
    expanded: true,
});

const btn = f.addButton({
    title: 'png',
    label: 'save',   // optional
});

let paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    f.addInput(PARAMS, paramNames[i]);
}

btn.on('click', () => {
    save("dot-grid.png");
});

f.on('change', function(ev){
    drawDotGrid();
});

function setup() {
    createCanvas(windowWidth, windowHeight);
    drawDotGrid();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawDotGrid();
}

function draw() {

}

function drawDotGrid() {
    background(PARAMS.background);
    noFill();
    stroke(PARAMS.foreground);
    strokeWeight(PARAMS.weight);
    let margin = PARAMS.margin;
    let offset = PARAMS.offset;
    let step = PARAMS.step;
    for (let x = -margin+offset; x < width+margin*2; x+= step) {
        for (let y = -margin+offset; y < height+margin*2; y+= step) {
            point(x,y);
        }
    }
}
