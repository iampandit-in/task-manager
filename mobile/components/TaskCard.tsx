import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TaskCardProps = {
  task: {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
  };
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "red";
      case "in-progress":
        return "orange";
      case "done":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <View
      style={[styles.card, { borderLeftColor: getStatusColor(task.status) }]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.priority}>{task.priority}</Text>
      </View>
      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.footer}>
        <Text style={[styles.status, { color: getStatusColor(task.status) }]}>
          {task.status.toUpperCase().replace("-", " ")}
        </Text>
        <TouchableOpacity onPress={() => onDelete(task._id)}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  priority: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#666",
    marginLeft: 10,
  },
  description: {
    color: "#444",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
