#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_img;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.y = 1.-st.y;
    vec3 clr = texture2D(u_img, st).rgb;
    gl_FragColor = vec4(clr.rgb,1.0);
}
