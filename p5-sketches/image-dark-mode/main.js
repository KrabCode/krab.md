const pane = new Tweakpane.Pane();

let canvasIsSetUp = false;
let img;
let darkenShader;

const PARAMS = {
    "invert" : false,
    "min" : '#000000',
    "max" : '#FFFFFF'
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

btn.on('click', (e) =>{
    save(document.title + ".png");
});

const paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    let name = paramNames[i];
    folder.addInput(PARAMS, name, constraints.get(name));
}

// https://p5js.org/
function preload(){
    darkenShader = loadShader('vert.glsl', 'frag.glsl');

    // load an image on startup for debug purposes
    // img = loadImage("https://picsum.photos/800.jpg");
}

function setup() {
    setupFileInput();
    createCanvas(displayWidth, displayHeight, WEBGL);
    colorMode(RGB,1,1,1,1);
}

function draw() {
    if(!img){
        return;
    }
    if(!canvasIsSetUp){
        resizeCanvas(img.width, img.height, WEBGL);
    }
    push();
    background(0);
    shader(darkenShader);
    darkenShader.setUniform('u_img', img);
    darkenShader.setUniform('u_invert', PARAMS.invert);
    darkenShader.setUniform('u_resolution', [img.width, img.height]);
    darkenShader.setUniform('u_mouse', [mouseX, height-mouseY]);
    darkenShader.setUniform('u_minColor', [red(PARAMS.min), green(PARAMS.min), blue(PARAMS.min)]);
    darkenShader.setUniform('u_maxColor', [red(PARAMS.max), green(PARAMS.max), blue(PARAMS.max)]);

    quad(-1, -1, 1, -1, 1, 1, -1, 1);
    resetShader();
    pop();
}

function windowResized() {

}

function setupFileInput() {
    input = createFileInput(handleFile);
    input.position(5,5);
}

function handleFile(file) {
    if (file.type === 'image') {
        img = createImg(file.data, '');
        img.hide();
        canvasIsSetUp = false;
    } else {
        img = null;
    }
}
