import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { TaskManagerContext } from "../context";
import { signOutUser } from "../services/user";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user, setUser } = useContext(TaskManagerContext);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    router.replace("/auth/signin");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Momentum</Text>
          {user && (
            <Text style={styles.greeting}>
              Hello, {user.name.split(" ")[0]}
            </Text>
          )}
        </View>

        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <Ionicons name="log-out-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  container: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  greeting: {
    fontSize: 14,
    color: "#666",
  },
  signOutBtn: {
    padding: 5,
  },
});
