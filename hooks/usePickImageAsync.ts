import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const usePickImageAsync = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return {
    selectedImage,
    pickImageAsync,
  };
};

export default usePickImageAsync;
