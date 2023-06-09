function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    background(36);
    translate(-width/2, -height/2);
    drawDotGrid();
}

function drawDotGrid() {
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
}
