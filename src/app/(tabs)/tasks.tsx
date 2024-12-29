import { api } from "@/convex/_generated/api";
import TaskCard from "@/src/components/TaskCard";
import { Button } from "@/src/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/Card";
import { TextInput } from "@/src/components/ui/TextInput";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";

const TasksPage = () => {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);

  const [form, setForm] = useState({
    input: "",
  });
  const [modal, setModal] = useState({ visible: false });
  const handleShowModal = () => setModal({ visible: true });

  const handleCreateTask = async () => {
    if (form.input.trim() !== "") {
      await createTask({ text: form.input });
      setForm({ input: "" });
      setModal({ visible: false });
    }
  };

  // Today's date, written as 'Wednesday, 11 May'
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View className="h-full px-6 py-4 gap-8 bg-background">
      <Modal
        key={"modal"}
        isVisible={modal.visible}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
      >
        {/* Footer */}
        <Card className="bg-background">
          <CardContent>
            <CardHeader className="px-0">
              <CardTitle className="text-center">Create a new task</CardTitle>
            </CardHeader>
            <View className="flex flex-col items-left gap-2 mb-6 p-4 bg-muted rounded-lg">
              <Text className="text-foreground text-base">Task:</Text>
              <TextInput
                value={form.input}
                onChangeText={(text) => setForm({ input: text })}
                placeholder="Name of the task"
              />
            </View>

            <CardFooter className="px-0 pb-0">
              <View className="flex flex-row justify-between gap-2 w-full">
                <Button
                  variant={"secondary"}
                  onPress={() => setModal({ visible: false })}
                >
                  Close
                </Button>
                <Button
                  onPress={handleCreateTask}
                  disabled={form.input.trim() === ""}
                  variant={"default"}
                >
                  Create
                </Button>
              </View>
            </CardFooter>
          </CardContent>
        </Card>
      </Modal>

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
        <Button onPress={handleShowModal} variant="secondary">
          New Task
        </Button>
      </View>

      {/* Task List */}
      <View className="flex flex-col gap-2">
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
    </View>
  );
};

export default TasksPage;
