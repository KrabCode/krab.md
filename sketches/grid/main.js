let settings = {
    "weight" : 2.5,
    "ptColor" : 120,
    "bgColor" : 36,
    "step" : 20,
    "offset" : 10
}

function parseUrlParams() {
    let keys = Object.keys(settings);
    console.log("this sketch accepts the following optional url parameters with some sane defaults: " + keys);
    console.log("example url: https://krab.md/sketches/grid?step=30&offset=15")
    let urlParams = new URLSearchParams(window.location.href);
    for(let i in keys){
        let key = keys[i];
        if(urlParams.has(key)){
            settings[key] = parseFloat(urlParams.get(key));
        }
    }
    console.log("settings after parsing url params:");
    console.dir(settings);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    parseUrlParams();
    drawDotGrid();
}

function draw() {
}

function drawDotGrid() {
    background(settings.bgColor);
    noFill();
    stroke(settings.ptColor);
    strokeWeight(settings.weight);
    let offset = settings.offset;
    let step = settings.step;
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
