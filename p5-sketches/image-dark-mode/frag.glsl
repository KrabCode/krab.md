#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_minColor;
uniform float u_time;
uniform bool u_invert;
uniform sampler2D u_img;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    if(st.x > 1. || st.y > 1.){
        discard;
    }
    st.y = 1.-st.y;
    vec3 clr = texture2D(u_img, st).rgb;
    if(u_invert){
        clr = vec3(1.-clr);
    }
    clr = max(u_minColor, clr);
    gl_FragColor = vec4(clr.rgb,1.0);
}
