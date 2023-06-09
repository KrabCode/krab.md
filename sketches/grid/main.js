"use strict";

let krabGridSettings = {
    "weight" : 2.5,
    "ptColor" : 120,
    "bgColor" : 36,
    "step" : 20,
    "offset" : 10
}

let parseUrlParams = () => {
    let keys = Object.keys(krabGridSettings);
    console.log("this sketch accepts the following optional url parameters with some sane defaults: " + keys);
    console.log("example url: https://krab.md/sketches/grid?step=60&ptColor=36&bgColor=200")
    let urlParams = new URLSearchParams(new URL(window.location).search);
    for(let i in keys){
        let key = keys[i];
        if(urlParams.has(key)){
            krabGridSettings[key] = parseFloat(urlParams.get(key));
        }
    }
    console.log("krabGridSettings after parsing url params:");
    console.dir(krabGridSettings);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    parseUrlParams();
    drawDotGrid();
}

function draw() {
}

function drawDotGrid() {
    background(krabGridSettings.bgColor);
    noFill();
    stroke(krabGridSettings.ptColor);
    strokeWeight(krabGridSettings.weight);
    let offset = krabGridSettings.offset;
    let step = krabGridSettings.step;
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
