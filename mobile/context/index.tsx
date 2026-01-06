import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";

type User = {
  _id: string;
  name: string;
  email: string;
} | null;

type ContextType = {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
};

export const TaskManagerContext = createContext<ContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export default function TaskManagerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Function to check if user is already authenticated (via cookie/stored session)
  // For standard cookie-auth on mobile, we might trust the cookie jar or rely on a simple 'whoami' call
  const checkAuth = async () => {
    try {
      // In a real cookie-based mobile app, you might need to manually load/save cookies
      // or rely on the networking layer to persist them.
      // For now, we'll try to hit a protected route or a 'me' endpoint to see if the session is valid.
      // If we had a token, we'd load it from SecureStore.

      // Let's assume we maintain a flag or try to fetch user details.
      // Since the client uses a context that defaults to null, we'll do the same.
      // We can add a specialized endpoint '/user/auth-check' as per earlier steps in the desktop app.

      const response = await api.get("/user/auth-check");
      if (response.data?.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      // Not authenticated
      console.log("Not authenticated or server unreachable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <TaskManagerContext.Provider value={{ user, setUser, loading }}>
      {children}
    </TaskManagerContext.Provider>
  );
}
