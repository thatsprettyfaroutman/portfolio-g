  

#ifndef FLAT_SHADED 
  vec3 pos =  transformed;
#endif

transformed = distort(transformed);

#ifndef FLAT_SHADED 
  vNormal = distortNormal(transformedNormal, pos, transformed);
#endif

