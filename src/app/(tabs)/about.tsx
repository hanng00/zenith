import { Button } from "@/src/components/ui/Button";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function AboutScreen() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View className="flex items-center justify-center h-full bg-background">
      <Animated.View
        className={"w-[100px] h-[80px] bg-primary rounded-lg m-[30px]"}
        style={style}
      />
      <Button
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      >
        Toggle
      </Button>
    </View>
  );
}
