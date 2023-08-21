
#ifdef USE_MAP

diffuseColor = getDiffuseColor(vMapUv);
diffuseColor = mixMouseBlob(diffuseColor);

if(uMixIcon) {
diffuseColor = mixIcon(diffuseColor, vMapUv);
}

#endif