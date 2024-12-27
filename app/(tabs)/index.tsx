import { View } from "react-native";

import ImageViewer from "@/components/ImageViewer";
import { Button } from "@/components/ui/Button";
import usePickImageAsync from "@/hooks/usePickImageAsync";

const PlaceholderImage = require("@/assets/images/background-image.webp");

export default function Index() {
  const { selectedImage, pickImageAsync } = usePickImageAsync();

  return (
    <View className="flex flex-col items-center h-full p-4">
      <View className="flex-1">
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View className="flex flex-col gap-4 items-center">
        <Button onPress={pickImageAsync}>Choose a photo</Button>
        <Button variant={"secondary"}>Use this photo</Button>
      </View>
    </View>
  );
}
