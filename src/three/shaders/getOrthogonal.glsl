// http://lolengine.net/blog/2013/09/21/picking-orthogonal-vector-combing-coconuts
vec3 getOrthogonal(vec3 v) {
  return normalize(
    abs(v.x) > abs(v.z) ? 
    vec3(-v.y, v.x, 0.0) : 
    vec3(0.0, -v.z, v.y)
  );
}

#pragma glslify: export(getOrthogonal)