uniform float uResolution;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform float uBaseOpacity;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vec3 baseColor = mix(uColor0, uColor1, vUv.y);
  vec3 lightColor =  mix(uColor0, uColor1, max(0.0, vNormal.y));
  
  float colorAmount = (vNormal.y + 1.0) * 0.5;
  // vec3 color = mix(lightColor, baseColor, pow(colorAmount, 10.0));
  vec3 color = mix(lightColor, baseColor, colorAmount);
  color.rgb = vec3(
    pow(color.r, 1.0 + colorAmount),
    pow(color.g, 1.0 + colorAmount),
    pow(color.b, 1.0 + colorAmount)
  );
  
  // More opacity when in light or shadow
  float power = 4.0;
  float maxTransformedOpacity = pow(2.0, power);
  float transformedOpacity = pow(abs(vNormal.y) + 1.0, power);
  
  gl_FragColor = vec4(color, uBaseOpacity + (transformedOpacity) / maxTransformedOpacity);
}
