// noinspection DuplicatedCode

let frag;
const pane = new Tweakpane.Pane();

const PARAMS = {
    "background" : '#6b0707',
    "foreground" : '#3838be',
    "a": 4,
    "b": 0,
    "c": 0,
    "d": 0
}

const constraints = new Map();
// constraints.set('step', {min: 20, max: 100, step: 1});

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
    frag.setUniform("time", millis() / 1000);
    frag.setUniform("a", PARAMS.a);
    frag.setUniform("b", PARAMS.b);
    frag.setUniform("c", PARAMS.c);
    frag.setUniform("d", PARAMS.d);
    frag.setUniform("resolution", [width, height]);
    shader(frag);
    noStroke();
    rect(0, 0, width, height);
}