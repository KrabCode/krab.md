
const pane = new Tweakpane.Pane();

let PARAMS = {
    "background" : '#242424'
}

let constraints = new Map();
// constraints.set('step', {min: 20, max: 100, step: 1});

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
    update();
});

// https://p5js.org/
function setup() {
    createCanvas(windowWidth, windowHeight);
    // update();
}

function draw() {
    background(PARAMS.background);
    // update();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
