import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { addNewTask } from "../../services/task";
import { TaskManagerContext } from "../../context";

export default function AddTask() {
  const router = useRouter();
  const { user } = useContext(TaskManagerContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("low");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) return;
    setLoading(true);
    try {
      const response = await addNewTask({
        title,
        description,
        status,
        priority,
        userId: user?._id,
      });
      if (response.success) {
        setTitle("");
        setDescription("");
        setStatus("todo");
        setPriority("low");
        router.back(); // Or navigate to list
        router.replace("/(tabs)");
      } else {
        alert(response.message || "Failed to add task");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>New Task</Text>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Task Title"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Task Details"
          multiline
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.row}>
          {["todo", "in-progress", "done"].map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.chip, status === s && styles.chipActive]}
              onPress={() => setStatus(s)}
            >
              <Text
                style={[styles.chipText, status === s && styles.chipTextActive]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Priority</Text>
        <View style={styles.row}>
          {["low", "medium", "high"].map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.chip, priority === p && styles.chipActive]}
              onPress={() => setPriority(p)}
            >
              <Text
                style={[
                  styles.chipText,
                  priority === p && styles.chipTextActive,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Task</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f0f0f0",
  },
  chipActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  chipText: {
    color: "#333",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
