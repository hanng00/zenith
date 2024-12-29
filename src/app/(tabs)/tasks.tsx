import { api } from "@/convex/_generated/api";
import TaskCard from "@/src/components/TaskCard";
import { Button } from "@/src/components/ui/Button";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const TasksPage = () => {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);

  const [newTask, setNewTask] = useState("");

  const handleCreateTask = async () => {
    if (newTask.trim() !== "") {
      await createTask({ text: newTask });
      setNewTask("");
    }
  };

  // Today's date, written as 'Wednesday, 11 May'
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View className="h-full px-6 py-4 gap-2 bg-background">
      {/* Header and soon-to-be button for adding new tasks */}
      <View className="flex flex-row justify-between items-center">
        {/* Header */}
        <View className="flex flex-col items-start">
          <Text className="text-foreground text-2xl font-bold">
            Today's Task
          </Text>
          <Text className="text-foreground/50 text-md">{today}</Text>
        </View>

        {/* New Task */}
        <Button onPress={() => {}} variant="secondary">
          New Task
        </Button>
      </View>

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
      {!tasks && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-foreground text-lg">Loading tasks...</Text>
        </View>
      )}
      {tasks && tasks.length === 0 && (
        <Text className="text-foreground text-lg text-center">
          No tasks available.
        </Text>
      )}
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task, idx) => (
          <TaskCard key={task._id} task={task} delay={idx * 100} />
        ))}
    </View>
  );
};

export default TasksPage;
