// noinspection DuplicatedCode
let time = 0;
let frag;
const pane = new Tweakpane.Pane();
const chunks = [];


const PARAMS = {
    "background" : '#000000',
    "foreground" : '#ffffff',
    "res": 150,
    "time": 4,
    "weight": 0.4,
    "sinPower": 1.2,
    "sinAmp" : 1.,
    "sinFreq" : 100,
    "noiseFreq" : 100,
    "noiseAmp" : 0.2
}

const constraints = new Map();
// constraints.set('step', {min: 20, max: 100, step: 1});
constraints.set('weight', {min: 0, max: 1, step: 0.01});

const folder = pane.addFolder({
    title: document.title,
    expanded: true,
});

const btnSaveMp4 = folder.addButton({
    title: 'record',
    label: 'mp4',
    hidden: true
});
btnSaveMp4.on('click', () => {
    record();
});

const btnSavePng = folder.addButton({
    title: 'save',
    label: 'png',   // optional
});

btnSavePng.on('click', () => {
    save(document.title+".png");
});

let paramNames = Object.keys(PARAMS);
for(let i = 0; i < paramNames.length; i++){
    let name = paramNames[i];
    folder.addInput(PARAMS, name, constraints.get(name));
}

function preload() {
    frag = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(RGB,1,1,1,1);


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    frag.setUniform("clrBg", [red(PARAMS.background), green(PARAMS.background), blue(PARAMS.background)]);
    frag.setUniform("clrFg", [red(PARAMS.foreground), green(PARAMS.foreground), blue(PARAMS.foreground)]);
    time += radians(PARAMS.time)
    frag.setUniform("time", time);
    frag.setUniform("res", PARAMS.res);
    frag.setUniform("freq", PARAMS.freq);
    frag.setUniform("d", PARAMS.weight*2.);
    frag.setUniform("resolution", [width, height]);
    frag.setUniform("sinAmp", PARAMS.sinAmp);
    frag.setUniform("sinFreq", PARAMS.sinFreq);
    frag.setUniform("noiseAmp", PARAMS.noiseAmp);
    frag.setUniform("noiseFreq", PARAMS.noiseFreq);
    frag.setUniform("sinPower", PARAMS.sinPower);
    shader(frag);
    noStroke();
    rect(0, 0, width, height);
}


function record() {
    chunks.length = 0;
    let stream = document.querySelector('canvas').captureStream(30),
        recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        if (e.data.size) {
            chunks.push(e.data);
        }
    };
    recorder.onstop = exportVideo;
    btnSaveMp4.on('click', () => {
        recorder.stop();
        btnSaveMp4.title = 'record';
        btnSaveMp4.on('click', () => {
            record();
        });
    });
    recorder.start();
    btnSaveMp4.title = 'stop & download';
}

function exportVideo(e) {
    var blob = new Blob(chunks);
    var vid = document.createElement('video');
    vid.id = 'recorded'
    vid.controls = true;
    vid.src = URL.createObjectURL(blob);
    vid.download = 'rec.webm';
    document.body.appendChild(vid);
    vid.click();
    window.URL.revokeObjectURL(vid.url);
}