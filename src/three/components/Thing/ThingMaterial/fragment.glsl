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

  // TODO: remove commented wip code
  // float strength = clamp(uOpacity + innerEdge + outerEdge, 0.0, 1.0);
  // float strength = uOpacity;
  float strength = 0.125;
  vec3 color = mix(vec3(0.0), uColor, strength);
  
  vec3 topColor =  mix(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), max(0.0, -vNormal.y));
  
  color = mix(topColor, vec3(1.0, 0.0, 1.0), (vNormal.y + 1.0) * 0.5);
  // color = mix(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), vNormal.y * 10.0);
  
  
  float factor = 4.0;
  float maxOp = pow(2.0, factor);
  float maxOpHalf = maxOp * 0.5;
  float op = pow(abs(vNormal.y) + 1.0, factor);
  
  gl_FragColor = vec4(color, strength + (op) / maxOp);
}
