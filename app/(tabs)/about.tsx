import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";

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
    <View className="flex items-center justify-center h-full">
      <Animated.View
        className={"w-[100px] h-[80px] bg-foreground m-[30px]"}
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
