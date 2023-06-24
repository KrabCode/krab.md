// noinspection DuplicatedCode
let time = 0;
let frag;
const pane = new Tweakpane.Pane();

const PARAMS = {
    "background" : '#000000',
    "foreground" : '#ffffff',
    "res": 39,
    "freq": 1000,
    "time": 4,
    "weight": 0.4
}

const constraints = new Map();
// constraints.set('step', {min: 20, max: 100, step: 1});
constraints.set('weight', {min: 0, max: 1, step: 0.01});

const folder = pane.addFolder({
    title: document.title,
    expanded: true,
});

const btn = folder.addButton({
    title: 'save',
    label: 'png',   // optional
});

btn.on('click', () => {
    save(document.title+".png");
});

let paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    let name = paramNames[i];
    folder.addInput(PARAMS, name, constraints.get(name));
}

function preload() {
    frag = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(RGB,1,1,1,1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    frag.setUniform("clrBg", [red(PARAMS.background), green(PARAMS.background), blue(PARAMS.background)]);
    frag.setUniform("clrFg", [red(PARAMS.foreground), green(PARAMS.foreground), blue(PARAMS.foreground)]);
    time += radians(PARAMS.time)
    frag.setUniform("time", time);
    frag.setUniform("res", PARAMS.res);
    frag.setUniform("freq", PARAMS.freq);
    frag.setUniform("d", PARAMS.weight*2.);
    frag.setUniform("resolution", [width, height]);
    shader(frag);
    noStroke();
    rect(0, 0, width, height);
}