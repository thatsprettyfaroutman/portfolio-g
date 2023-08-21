
#ifdef USE_MAP

diffuseColor = getDiffuseColor(vMapUv);
diffuseColor = mixMouseBlob(diffuseColor);
diffuseColor = mixIcon(diffuseColor, vMapUv);

#endif