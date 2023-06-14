const pane = new Tweakpane.Pane();

let canvasIsSetUp = false;
let img;

const PARAMS = {
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
    save(document.title + ".png");
});

const paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    let name = paramNames[i];
    folder.addInput(PARAMS, name, constraints.get(name));
}

folder.on('change', (e) =>{
    updateVisual();
});

// https://p5js.org/
function preload(){
    // load an image on startup for debug purposes
    //  img = loadImage("https://picsum.photos/800/800.jpg");
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
        updateVisual();
    }
}

function updateVisual(){
    push();

    blendMode(BLEND);
    image(img, 0,0);

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
    noStroke();
    fill(PARAMS.minimum);
    rect(0,0,img.width, img.height);

    blendMode(DARKEST);
    noStroke();
    fill(PARAMS.maximum);
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
