import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="max-w-5xl mx-auto p-4 flex items-center justify-between">
      <h1 className="text-xl">Task Manager</h1>
      <nav className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="outline">Login</Button>
      </nav>
    </header>
  );
}
