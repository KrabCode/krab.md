const pane = new Tweakpane.Pane();


let img;
let darkenShader;

const PARAMS = {
    "background" : '#242424',
}

let constraints = new Map();
constraints.set('scale', {min: 0.01, max: 2, step: 0.01});

const folder = pane.addFolder({
    title: document.title,
    expanded: true,
});

const btn = folder.addButton({
    title: 'save',
    label: 'png',   // optional
});

btn.on('click', () => {
    console.log("TODO");
});

const paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    let name = paramNames[i];
    folder.addInput(PARAMS, name, constraints.get(name));
}

// https://p5js.org/
function preload(){
    darkenShader = loadShader('vert.glsl', 'frag.glsl');
}

function setup() {
    setupCanvas();
    shader(darkenShader);
    setupFileInput();
}

function draw() {
    push();
    resetShader();
    background(PARAMS.background);
    if(img){
        shader(darkenShader);
        darkenShader.setUniform('u_img', img);
        darkenShader.setUniform('u_resolution', [width, height]);
        darkenShader.setUniform('u_mouse', [mouseX, height-mouseY]);
        quad(-1, -1, 1, -1, 1, 1, -1, 1);
        // rect(0,0,img.width, img.height);
    }

    pop();
}

function windowResized() {
    setupCanvas();
}

function setupCanvas(){
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function setupFileInput() {
    input = createFileInput(handleFile);
    input.position(5,5);
}

function handleFile(file) {
    if (file.type === 'image') {
        img = createImg(file.data, '');
        img.hide();
    } else {
        img = null;
    }
}
