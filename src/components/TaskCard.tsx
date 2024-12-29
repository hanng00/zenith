import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React from "react";
import { Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button } from "./ui/Button";

interface TaskCardProps {
  task: Doc<"tasks">;
  delay: number;
}

const TaskCard = ({ task, delay }: TaskCardProps) => {
  const animation = FadeIn.delay(delay).duration(200);

  const removeTask = useMutation(api.tasks.remove);

  const onRemove = async () => {
    await removeTask({ taskId: task._id });
  };

  return (
    <Animated.View
      entering={animation}
      className="flex-row justify-between items-center border border-foreground rounded-lg mb-4 px-4 py-2 bg-card"
    >
      <Text className="text-foreground text-base">{task.text}</Text>
      <Button onPress={onRemove} variant="link" size="sm">
        Remove
      </Button>
    </Animated.View>
  );
};

export default TaskCard;
