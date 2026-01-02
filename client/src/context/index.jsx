import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/user.js";

const TaskManagerContext = createContext();

function TaskManagerProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          console.error("Auth check failed:", error);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const contextValue = {
    user,
    setUser,
    loading,
  };

  return (
    <TaskManagerContext.Provider value={contextValue}>
      {children}
    </TaskManagerContext.Provider>
  );
}

export { TaskManagerContext, TaskManagerProvider };
