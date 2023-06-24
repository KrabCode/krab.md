
precision mediump float;

uniform vec3 clrBg;
uniform vec3 clrFg;
uniform vec2 resolution;
uniform float res;
uniform float freq;
uniform float time;
uniform float d;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy) / resolution.y;
    vec2 gv = fract(uv*res) - 0.5;
    vec2 id = floor(uv*res) + 0.5;
    vec2 p = id;
    float t = time;
    float n = 0.5+sin(length(p)*freq+t);
    n = clamp(n, 0., 1.);
    n *= smoothstep(0., 1., d-length(gv));
    vec3 mixed = mix(clrBg, clrFg,  n);
    vec4 outColor = vec4(mixed, 1.);

    gl_FragColor = outColor;
}