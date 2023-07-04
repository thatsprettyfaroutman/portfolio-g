float roundRect(vec2 center, vec2 size, float radius) {
  return length(max(abs(center) - size + radius, 0.0)) - radius;
}

// Usage:

// vec2 uvMid = vUv * 2.0 - 1.0;
// vec2 boxSize = vec2(1.0, 1.0 / uAspect);
// vec2 boxCenter = uvMid / vec2(1.0, uAspect);
// float borderDistance = roundedBox(boxCenter, boxSize, 0.1);
// color.a = step(1.0 , 1.0 - borderDistance);

#pragma glslify: export(roundRect)