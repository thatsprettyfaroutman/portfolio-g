// TODO: clean up

#ifdef USE_MAP

diffuseColor = getDiffuseColor(vMapUv);

// Blurry bottom bar
// if(vMapUv.y > (1.0 - 128.0 / uResolution.y)) {
// vec4 edgeColor = texture2D(map, vec2(0.0, 0.99));
// diffuseColor.rgb = mix(blurDiffuseColor(vMapUv, 8.0, 16.0, 16.0).rgb, edgeColor.rgb, 0.9);
// }

// diffuseColor = mixTitle(diffuseColor);

diffuseColor = mixMouseBlob(diffuseColor);
diffuseColor = mixIcon(diffuseColor, vMapUv);

#endif