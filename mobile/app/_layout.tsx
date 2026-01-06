import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect, useContext } from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import TaskManagerProvider, { TaskManagerContext } from "@/context";

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, loading } = useContext(TaskManagerContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup) {
      // Redirect to sign in if not authenticated and not already in auth group
      router.replace("/auth/signin");
    } else if (user && inAuthGroup) {
      // Redirect to tabs if authenticated and in auth group
      router.replace("/(tabs)");
    }
  }, [user, loading, segments, router]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen name="auth/signin" options={{ headerShown: false }} />
        <Stack.Screen
          name="auth/signup"
          options={{ headerTitle: "Sign Up", headerBackTitle: "Back" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <TaskManagerProvider>
      <RootLayoutNav />
    </TaskManagerProvider>
  );
}
