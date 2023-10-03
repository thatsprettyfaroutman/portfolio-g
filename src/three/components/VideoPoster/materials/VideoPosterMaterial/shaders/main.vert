vec3 pos = transformed;
transformed = distort(transformed);
vNormal = distortNormal(transformedNormal, pos, transformed);
