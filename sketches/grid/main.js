"use strict";

let gridSettings = {
    "weight" : 2.5,
    "ptColor" : 120,
    "bgColor" : 36,
    "step" : 20,
    "offset" : 10
}

let parseUrlParams = () => {
    let keys = Object.keys(gridSettings);
    console.log("this sketch accepts the following optional url parameters with some sane defaults: " + keys);
    console.log("example url: https://krab.md/sketches/grid?step=60&ptColor=36&bgColor=200");
    let urlParams = new URLSearchParams(new URL(window.location).search);
    for(let i in keys){
        let key = keys[i];
        if(urlParams.has(key)){
            gridSettings[key] = parseFloat(urlParams.get(key));
        }
    }
    console.log("gridSettings after parsing url params:");
    console.log(gridSettings);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    parseUrlParams();
    drawDotGrid();
}

function draw() {
}

function drawDotGrid() {
    background(gridSettings.bgColor);
    noFill();
    stroke(gridSettings.ptColor);
    strokeWeight(gridSettings.weight);
    let offset = gridSettings.offset;
    let step = gridSettings.step;
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
