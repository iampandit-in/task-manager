import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { SignOutUser } from "@/services/user";
import { useContext } from "react";
import { TaskManagerContext } from "@/context";
import { toast } from "sonner";

export default function TasksHeader() {
  const { setUser } = useContext(TaskManagerContext);
  const navigate = useNavigate();
  return (
    <header className="max-w-5xl mx-auto p-4 flex items-center justify-between">
      <Link to={"/tasks"} className="text-xl">
        Dashboard
      </Link>
      <nav className="flex items-center gap-2">
        <Button variant="outline">
          <Link to={"/tasks/list"}>Tasks</Link>
        </Button>
        <Button variant="outline">
          <Link to={"/tasks/scrum-board"}>Scrum Board</Link>
        </Button>
        <ModeToggle />
        <Button
          className="cursor-pointer"
          onClick={async () => {
            await SignOutUser();
            setUser(null);
            navigate("/signin");
            toast.error("Signed out successfully");
          }}
          variant="destructive"
        >
          Sign Out
        </Button>
      </nav>
    </header>
  );
}
