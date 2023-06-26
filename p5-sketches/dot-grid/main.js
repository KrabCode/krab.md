// https://cocopon.github.io/tweakpane/
const pane = new Tweakpane.Pane();

let PARAMS = {
    "weight" : 2.5,
    "margin" : 10,
    "offset" : 10,
    "step" : 20,
    "foreground" : '#787878',
    "background" : '#242424'
}

let constraints = new Map();
constraints.set('step', {min: 20, max: 100, step: 1});



const f = pane.addFolder({
    title: 'dot-grid-gui',
    expanded: true,
});

const btn = f.addButton({
    title: 'png',
    label: 'save',   // optional
});

let paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    let name = paramNames[i];
    f.addInput(PARAMS, name, constraints.get(name));
}

btn.on('click', () => {
    save("dot-grid.png");
});

f.on('change', function(ev){
    drawDotGrid();
});

// https://p5js.org/
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
    for (let x = -margin+offset; x < width+offset+margin*2; x+= step) {
        for (let y = -margin+offset; y < height+offset+margin*2; y+= step) {
            point(x,y);
        }
    }
}
