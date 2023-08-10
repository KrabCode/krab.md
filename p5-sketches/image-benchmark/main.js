const pane = new Tweakpane.Pane();
const PARAMS = {
    count : 100.0,
    scale : 1.0,
    frameRate: 0.0,
    optimized: false
};

pane.addInput(
    PARAMS, 'count',
    {min: 0, max: 1000, step: 10}
);

pane.addInput(
    PARAMS, 'scale',
    {min: 0, max: 2, step: 0.01}
);

pane.addInput(PARAMS, 'optimized');
pane.addMonitor(PARAMS, 'frameRate', {
    interval: 100
});
pane.addMonitor(PARAMS, 'frameRate', {
    view: 'graph',
    interval: 100,
    min: 0,
    max: 100,
});

let spritesheet;
let img1;
let img2;

let sprites = {
    "kitten-sit-1" : {x:634.0, y:66.0, w:62, h:62},
    "kitten-sit-2" : {x:0.0, y:166.0, w:62, h:62}
}

function preload(){
    spritesheet = loadImage("spritesheet.png");
}

function getImageFromSprites(i){
    let coords = sprites["kitten-sit-" + i];
    return spritesheet.get(coords.x, coords.y, coords.w, coords.h);
}

function setup() {
    img1 = getImageFromSprites(1);
    img2 = getImageFromSprites(2);
    createCanvas(windowWidth, windowHeight, WEBGL);
}


function draw() {
    PARAMS.frameRate = frameRate();
    push();
    background(36);
    translate(-width/2, -height/2);
    scale(PARAMS.scale);
    noStroke();
    for(let i = 0; i < PARAMS.count; i++){
        push();
        let currentImageIndex = Math.floor((Math.floor(frameCount * 0.05 + i) % 2));
        let whichImage = 1 + currentImageIndex;
        let s = sprites["kitten-sit-" + whichImage];
        let x = Math.floor(s.w * i % (width - width%s.w));
        let y = Math.floor((s.w * i) / (width- width%s.w)) * s.h;
        translate(x, y);
        if(PARAMS.optimized){
            texture(spritesheet);
            textureMode(IMAGE);
            beginShape(QUADS);
            vertex(0,0,s.x, s.y);
            vertex(s.w,0,s.x+s.w, s.y);
            vertex(s.w,s.h,s.x+s.w, s.y+s.h);
            vertex(0, s.h, s.x, s.y+s.h);
            endShape();
        }else{
            if(currentImageIndex % 2 === 0){
                image(img1, 0, 0);
            }else{
                image(img2, 0, 0);
            }
        }
        pop();
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}