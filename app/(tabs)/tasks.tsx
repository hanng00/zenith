import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface TaskItemProps {
  text: string;
  onRemove: () => void;
}

const TaskItem = ({ text, onRemove }: TaskItemProps) => {
  return (
    <View className="flex-row justify-between items-center border border-foreground rounded-lg mb-4 px-4 py-2 bg-card">
      <Text className="text-foreground text-base">{text}</Text>
      <Button onPress={onRemove} variant="link" size="sm">
        Remove
      </Button>
    </View>
  );
};

const TasksPage = () => {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);
  const removeTask = useMutation(api.tasks.remove);

  const [newTask, setNewTask] = useState("");

  const handleCreateTask = async () => {
    if (newTask.trim() !== "") {
      await createTask({ text: newTask });
      setNewTask("");
    }
  };

  if (!tasks) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-foreground text-lg">Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-6 py-4">
      {/* Input Field for Adding New Task */}
      <View className="flex-row items-center gap-2 mb-6">
        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add new task"
          className="flex-1 border border-foreground rounded-lg px-4 py-2 text-base text-foreground bg-card"
        />
        <Button
          onPress={handleCreateTask}
          disabled={newTask.trim() === ""}
          variant={"default"}
        >
          Create
        </Button>
      </View>

      {/* Task List */}
      {tasks.length === 0 ? (
        <Text className="text-foreground text-lg text-center">
          No tasks available.
        </Text>
      ) : (
        tasks.map(({ _id, text }) => (
          <TaskItem
            key={_id}
            text={text}
            onRemove={() => removeTask({ taskId: _id })}
          />
        ))
      )}
    </View>
  );
};

export default TasksPage;
