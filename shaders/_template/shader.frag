
precision mediump float;

uniform vec3 clrBg;
uniform vec3 clrFg;
uniform vec2 resolution;
uniform float time;
uniform float a;
uniform float b;
uniform float c;
uniform float d;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy) / resolution.y;
    vec2 gv = fract(uv*a) - 0.5;
    vec2 p = gv;
    vec3 mixed = mix(clrBg, clrFg, length(gv)*2.);
    vec4 outColor = vec4(mixed, 1.);
    gl_FragColor = outColor;
}