uniform vec3 uColor;
uniform float uOpacity;
uniform float uResolution;
uniform float uR0;
uniform float uR1;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  float lineWidth = 1.0 / uResolution;
  float aa = lineWidth * 2.0;
  float edgeDistance = distance(vUv, vec2(0.5)) * 2.0;
  float outerEdge = smoothstep(uR1 - lineWidth - aa, uR1 - lineWidth, edgeDistance);
  float innerEdge = 1.0 - smoothstep(uR0 + lineWidth, uR0 + lineWidth + aa, edgeDistance);

  float strength = clamp(uOpacity + innerEdge + outerEdge, 0.0, 1.0);
  vec3 color = mix(vec3(0.0), uColor, strength);
  color *= abs(vNormal.z);
  gl_FragColor = vec4(color, strength * abs(vNormal.z));
}
