
const pane = new Tweakpane.Pane();

let PARAMS = {
    "background" : '#242424',
    "draw a" : true,
    "color a" : '#ffffff',
    "weight a" : 3,
    "draw b" : true,
    "color b" : '#dadada',
    "weight b" : 1,
    "step b" : 50,
    "draw c" : true,
    "color c" : '#7a7a7a',
    "weight c" : 1,
    "step c" : 10,
}

let constraints = new Map();
constraints.set('step b', {min: 1, max: 100, step: 1});
constraints.set('step c', {min: 1, max: 100, step: 1});

const folder = pane.addFolder({
    title: document.title,
    expanded: true,
});

const btn = folder.addButton({
    title: 'save',
    label: 'png',   // optional
});

btn.on('click', () => {
    save(document.title+".png");
});

let paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    let name = paramNames[i];
    folder.addInput(PARAMS, name, constraints.get(name));
}

folder.on('change', function(ev){

});

// https://p5js.org/
function setup() {
    createCanvas(windowWidth, windowHeight);
    // update();
}

let ww = 0;
let hh = 0;

function draw() {
    ww = windowWidth / 2;
    hh = windowHeight / 2;
    background(PARAMS.background);
    translate(ww, hh);

    if(PARAMS["draw c"]){
        stroke(PARAMS["color c"]);
        strokeWeight(PARAMS["weight c"]);
        drawLines(0, ww, PARAMS["step c"], 'x');
        drawLines(0, hh, PARAMS["step c"], 'y');
    }

    if(PARAMS["draw b"]) {
        stroke(PARAMS["color b"]);
        strokeWeight(PARAMS["weight b"]);
        drawLines(0, ww, PARAMS["step b"], 'x');
        drawLines(0, hh, PARAMS["step b"], 'y');
    }

    if(PARAMS["draw a"]){
        strokeWeight(PARAMS["weight a"]);
        stroke(PARAMS["color a"]);
        line(0,-hh, 0, hh);
        line(-ww,0,ww,0);
    }

}

function drawLines(start, stop, step, dir){
    for(let dirIndex = 0; dirIndex < 2; dirIndex++){
        if(dirIndex === 0){
            for(let n = start; n < stop; n += step){
                if(dir === 'x'){
                    line(n, -hh, n, hh);
                }else{
                    line(-ww, n, ww, n);
                }
            }
        }else{
            for(let n = start - step; n > -stop; n -= step){ // start minus step to not repeat the center
                if(dir === 'x'){
                    line(n, -hh, n, hh);
                }else{
                    line(-ww, n, ww, n);
                }
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
