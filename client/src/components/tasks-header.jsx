import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function TasksHeader() {
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
      </nav>
    </header>
  );
}
