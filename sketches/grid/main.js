"use strict";

let gridSettings = {
    "weight" : 2.5,
    "step" : 20,
    "ptColor" : 120,
    "bgColor" : 36
}

let parseUrlParams = () => {
    let keys = Object.keys(gridSettings);
    console.log("this sketch accepts these optional url parameters: " + keys);
    let thisUrl = new URL(window.location);
    let urlParams = new URLSearchParams(thisUrl.search);
    console.log("thisUrl", thisUrl);
    console.log("example url: " + thisUrl.origin + thisUrl.pathname + "?step=30&weight=3&bgColor=36&ptColor=255,0,150");
    for(let i in keys){
        let key = keys[i];
        if(urlParams.has(key)){
            let val = urlParams.get(key);
            console.log("found param " + key + " : " + val);
            if(key.toLowerCase().includes("color")){
                let rgb = val.split(',');
                console.log("rgb", rgb);
                if(rgb.length > 2){
                    gridSettings[key] = color(rgb[0], rgb[1], rgb[2]);
                }else{
                    gridSettings[key] = color(parseFloat(rgb[0]));
                }
            }else{
                gridSettings[key] = parseFloat(val);
            }

        }
    }
    console.log("gridSettings after parsing url params: " + JSON.stringify(gridSettings));

    //
    var entire = (drawDotGrid).toString();
    var body = entire.substring(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
    console.log("grid code in p5.js: ", body);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    parseUrlParams();
    drawDotGrid();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawDotGrid();
}

function draw() {

}

function drawDotGrid() {
    background(gridSettings.bgColor);
    noFill();
    stroke(gridSettings.ptColor);
    strokeWeight(gridSettings.weight);
    let offset = gridSettings.step / 2;
    let step = gridSettings.step;
    for (let x = offset; x < width; x+= step) {
        for (let y = offset; y < height; y+= step) {
            point(x,y);
        }
    }
}
