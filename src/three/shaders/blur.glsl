// Usage:
//  
//    vec4 color = blur(
//     map,    // texture<sampler2D>
//     uv,     // uv<vec2>
//     0.1,    // radius<float>
//     4.0,    // quality<float> (perf hit)
//     16.0    // directions<float> (perf hit)
//   );

vec4 blur(sampler2D map, vec2 uv, float radius, float quality, float directions) {
  float DOUBLE_PI = 6.28318530718;
  vec4 color = texture(map, uv);
  float dStep = DOUBLE_PI / directions;
  float qStep = 1.0 / quality;

  // Blur calculations
  for(float d = 0.0; d < DOUBLE_PI; d += dStep) {
    for(float i = qStep; i <= 1.0; i += qStep) {
      color += texture2D(map, uv + vec2(cos(d), sin(d)) * radius * i);
    }
  }

  return color /= quality * directions + ((directions / 2.0) - 1.0);
}

#pragma glslify: export(blur)