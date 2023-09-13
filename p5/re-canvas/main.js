// https://p5js.org/
let c;
let thetaRangeHalf = 3.1415 * 0.5;
let scaleRangeHalf = 0.5;
let thetaValue = 0.1;
let scaleValue = 1.1;

let rectSize = 60;

function setup() {
    let w = floor(windowWidth);
    let h = floor(windowHeight);
    createCanvas(w, h);
    colorMode(RGB, 1, 1, 1, 1);
    imageMode(CENTER);
    noSmooth();
    let dim = Math.sqrt(width*width + height*height);
    c = createGraphics(dim, dim);
    c.background(0);
    c.imageMode(CENTER);
    c.rectMode(CENTER);
    c.colorMode(RGB, 1, 1, 1, 1);
    // c.noSmooth()
}

function draw() {
    if (isPointInsideCanvas(mouseX, mouseY)) {
        thetaValue = map(mouseX, 0, width, -thetaRangeHalf, thetaRangeHalf);
        scaleValue = map(mouseY, 0, height, 1 - scaleRangeHalf, 1 + scaleRangeHalf);
    }
    let t = radians(frameCount) * 0.1;
    c.push();
    c.translate(c.width / 2, c.height / 2);


    // darken
    if (frameCount % 3 === 0) {
        c.blendMode(DIFFERENCE);
        c.noStroke();
        c.fill(1 / 255);
        // c.rect(0, 0, c.width, c.height);
    }
    // draw the canvas on itself scaled and rotated
    c.scale(scaleValue);
    c.rotate(thetaValue);

    // draw a square or two on top
    c.blendMode(BLEND);
    c.image(c, 0, 0);
    c.strokeWeight(3);
    let clrA = getColorAt(t % 1);
    c.stroke(clrA.x, clrA.y, clrA.z);
    c.noFill();
    c.rect(0, 0, rectSize, rectSize);
    let clrB = getColorAt((t + 0.3) % 1);
    c.stroke(clrB.x, clrB.y, clrB.z);
    c.noFill();
    c.rotate(QUARTER_PI);
    c.rect(0, 0, rectSize, rectSize);
    c.pop();

    // draw hidden canvas to main canvas
    translate(width / 2, height / 2);
    image(c, 0, 0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function isPointInsideCanvas(x, y) {
    return x > 0 && x < width && y > 0 && y < height;
}

// gradients adapted from glsl: https://iquilezles.org/articles/palettes/
function getColorAt(time) {
    let a = createVector(0.8, 0.5, 0.4);
    let b = createVector(0.2, 0.4, 0.2);
    let c = createVector(2.0, 1.0, 1.0);
    let d = createVector(0.00, 0.25, 0.25);
    let t = createVector(time, time, time);
    let tau = createVector(6.28318, 6.28318, 6.28318);
    //  a + b*cos( 6.28318*(c*t+d) );
    let beforeCos = tau.mult(c.mult(t).add(d));
    let afterCos = createVector(cos(beforeCos.x), cos(beforeCos.y), cos(beforeCos.z));
    return a.add(b.mult(afterCos));
}
