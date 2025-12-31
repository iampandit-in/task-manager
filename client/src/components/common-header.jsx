import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="max-w-5xl mx-auto p-4 flex items-center justify-between">
      <Link to={"/"} className="text-xl">
        Task Manager
      </Link>
      <nav className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="outline">
          <Link to="/auth">Login</Link>
        </Button>
      </nav>
    </header>
  );
}
