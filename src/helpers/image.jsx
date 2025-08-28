import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import Animated from 'react-native-reanimated';


export const CachedImage = ({ uri, ...props }) => {
  const [cachedUri, setCachedUri] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      if (!uri) return;

      const filename = uri.split("/").pop();
      const path = `${FileSystem.cacheDirectory}${filename}`;

      const file = await FileSystem.getInfoAsync(path);
      if (file.exists) {
        setCachedUri(file.uri);
      } else {
        const downloaded = await FileSystem.downloadAsync(uri, path);
        setCachedUri(downloaded.uri);
      }
    };

    loadImage();
  }, [uri]);

  return <Animated.Image source={{ uri: cachedUri || uri }} {...props} />;
};
