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

folder.on('change', (e) =>{
    update();
});

// https://p5js.org/
function preload(){
    // load an image on startup for debug purposes
    //  img = loadImage("https://picsum.photos/800.jpg");
}

function setup() {
    setupFileInput();
    createCanvas(innerWidth, innerHeight);
    colorMode(RGB,1,1,1,1);
}

function draw() {
    if(!img){
        return;
    }
    if(!canvasIsSetUp){
        resizeCanvas(img.width, img.height);
        canvasIsSetUp = true;
        update();
    }
}

function update(){
    push();

    blendMode(BLEND);
    image(img, 0,0);

    if(PARAMS.invert){
        filter(INVERT);
    }

    blendMode(LIGHTEST);
    noStroke();
    fill(PARAMS.min);
    rect(0,0,img.width, img.height);

    blendMode(DARKEST);
    noStroke();
    fill(PARAMS.max);
    rect(0,0,img.width, img.height);

    pop();
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
