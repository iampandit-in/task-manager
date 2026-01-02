import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { getAllTasks, updateTask } from "@/services/task";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function ScrumBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateTask(id, { status: newStatus });
      if (response.success) {
        toast.success(`Task moved to ${newStatus}`);
        fetchTasks();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.error("Failed to update task status");
    }
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Scrum Board</h1>
        <div className="flex gap-2">
          {/* Future: Add Filtering/Sorting here */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-auto pb-4">
        <Column
          title="To Do"
          tasks={todoTasks}
          statusColor="bg-red-500"
          headerColor="bg-red-50 dark:bg-red-950/30"
          type="todo"
          onStatusChange={handleStatusChange}
        />
        <Column
          title="In Progress"
          tasks={inProgressTasks}
          statusColor="bg-yellow-500"
          headerColor="bg-yellow-50 dark:bg-yellow-950/30"
          type="in-progress"
          onStatusChange={handleStatusChange}
        />
        <Column
          title="Done"
          tasks={doneTasks}
          statusColor="bg-green-500"
          headerColor="bg-green-50 dark:bg-green-950/30"
          type="done"
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

function Column({
  title,
  tasks,
  statusColor,
  headerColor,
  type,
  onStatusChange,
}) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div
        className={`p-4 rounded-xl border flex justify-between items-center ${headerColor}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${statusColor}`} />
          <h2 className="font-semibold text-foreground">{title}</h2>
        </div>
        <Badge variant="secondary" className="bg-background/80 font-mono">
          {tasks.length}
        </Badge>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        {tasks.map((task) => (
          <ScrumCard
            key={task._id}
            task={task}
            type={type}
            onStatusChange={onStatusChange}
            statusColor={statusColor}
          />
        ))}
        {tasks.length === 0 && (
          <div className="h-24 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground text-sm">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}

function ScrumCard({ task, type, onStatusChange }) {
  const priorityColors = {
    low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    high: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  };

  const borderColors = {
    todo: "border-l-red-500",
    "in-progress": "border-l-yellow-500",
    done: "border-l-green-500",
  };

  return (
    <Card
      className={`hover:shadow-md transition-shadow group relative border-l-4 ${borderColors[type]}`}
    >
      {/* Note: Tailwind color mapping for dynamic border colors is tricky, simpler to use class logic or inline style if var exists. 
          Let's stick to simple border classes if possible, but for now standard Card is fine. 
          Actually, let's use the statusColor prop to set the border color if it was a real color value.
          Instead, we'll keep the design clean.
      */}
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge
            className={`${priorityColors[task.priority]} hover:${
              priorityColors[task.priority]
            } border-none`}
          >
            {task.priority}
          </Badge>
          {/* <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
             <MoreHorizontal className="h-4 w-4" />
          </Button> */}
        </div>
        <CardTitle className="text-base font-semibold leading-tight mb-1">
          {task.title}
        </CardTitle>
        <CardDescription className="text-xs line-clamp-2">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex justify-end gap-2 mt-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
          {type === "todo" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(task._id, "in-progress")}
              className="h-7 text-xs"
            >
              Start
            </Button>
          )}
          {type === "in-progress" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusChange(task._id, "todo")}
                className="h-7 text-xs"
              >
                Back
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(task._id, "done")}
                className="h-7 text-xs bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800"
              >
                Done
              </Button>
            </>
          )}
          {type === "done" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStatusChange(task._id, "in-progress")}
              className="h-7 text-xs"
            >
              Re-open
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
