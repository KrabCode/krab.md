const pane = new Tweakpane.Pane();

let img;
let canvas;

const PARAMS = {
    "scale" : 0.2,
    "invert?" : false,
    "grayscale?" : false,
    "posterize?" : false,
    "posterize" : 1,
    "threshold?" : false,
    "threshold" : 0.5,
    "minimum" : '#000000',
    "maximum" : '#FFFFFF',
}

let constraints = new Map();
constraints.set('posterize', {"min": 2});

const folder = pane.addFolder({
    title: document.title,
    expanded: true,
});

const btn = folder.addButton({
    title: 'save',
    label: 'png',   // optional
});

btn.on('click', (e) =>{
    updateVisual(true);
    save(document.title + ".png");
});

const paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    let name = paramNames[i];
    folder.addInput(PARAMS, name, constraints.get(name));
}

folder.on('change', (e) =>{
});

// https://p5js.org/
function preload(){
    // load an image on startup for debug purposes
    //  img = loadImage("https://picsum.photos/800/800.jpg");
}

function setup() {
    canvas = createCanvas(innerWidth, innerHeight);
    setupFileInput();
    colorMode(RGB,1,1,1,1);
}

function draw() {
    updateVisual();
}

function updateVisual(fullRes){
    blendMode(BLEND);
    background(0.1);
    if(!img){
        return;
    }

    let w = img.width * PARAMS.scale;
    let h = img.height * PARAMS.scale;
    if(fullRes){
        w = img.width;
        h = img.height;
    }
    if(width !== w || height !== h){
        canvas.resize(w, h);
    }

    image(img, 0, 0, width, height);

    if(PARAMS["invert?"]){
        filter(INVERT);
    }
    if(PARAMS["grayscale?"]){
        filter(GRAY);
    }
    if(PARAMS["posterize?"]){
        filter(POSTERIZE, PARAMS["posterize"]);
    }
    if(PARAMS["threshold?"]){
        filter(THRESHOLD, PARAMS["threshold"]);
    }

    blendMode(LIGHTEST);
    fill(PARAMS.minimum);
    rect(0,0,img.width, img.height);

    blendMode(DARKEST);
    fill(PARAMS.maximum);
    rect(0,0,img.width, img.height);
}

function setupFileInput() {
    input = createFileInput(handleFile);
    input.position(5,5);
}

function handleFile(file) {
    if (file.type === 'image') {
        img = null;
        img = createImg(file.data, '');
        img.hide();
    } else {
        img = null;
    }
}
