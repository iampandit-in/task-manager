import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { getAllTasks } from "../../services/task";
import { useFocusEffect } from "expo-router";
import TaskCard from "../../components/TaskCard";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

export default function ScrumBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  /* const handleStatusChange = async (task: any, newStatus: string) => {
     try {
       const response = await updateTask(task._id, { status: newStatus });
       if (response.success) {
         fetchTasks();
       }
     } catch (error) {
       console.error("Failed to update status", error);
     }
  } */ const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.column}>
        <View style={[styles.header, styles.headerTodo]}>
          <Text style={styles.headerTitle}>To Do ({todoTasks.length})</Text>
        </View>
        {todoTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={() => {}} // Disable delete in board for now or implement generic
          />
        ))}
      </View>

      <View style={styles.column}>
        <View style={[styles.header, styles.headerProgress]}>
          <Text style={styles.headerTitle}>
            In Progress ({inProgressTasks.length})
          </Text>
        </View>
        {inProgressTasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={() => {}} />
        ))}
      </View>

      <View style={styles.column}>
        <View style={[styles.header, styles.headerDone]}>
          <Text style={styles.headerTitle}>Done ({doneTasks.length})</Text>
        </View>
        {doneTasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={() => {}} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  column: {
    marginBottom: 20,
  },
  header: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerTodo: {
    backgroundColor: "#ffebee",
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  headerProgress: {
    backgroundColor: "#fff3e0",
    borderWidth: 1,
    borderColor: "#ffe0b2",
  },
  headerDone: {
    backgroundColor: "#e8f5e9",
    borderWidth: 1,
    borderColor: "#c8e6c9",
  },
  headerTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
