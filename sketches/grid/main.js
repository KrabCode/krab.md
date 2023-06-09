function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    drawDotGrid();
}

function draw() {
}

function drawDotGrid() {
    background(36);
    translate(-width/2, -height/2);
    noFill();
    stroke(120);
    strokeWeight(0.5);
    let step = 20;
    let offset = step / 2;
    for (let x = offset; x < width; x+= step) {
        for (let y = offset; y < height; y+= step) {
            point(x,y);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawDotGrid();
}
