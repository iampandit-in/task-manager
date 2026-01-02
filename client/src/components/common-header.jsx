import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useContext } from "react";
import { TaskManagerContext } from "@/context";
import { SignOutUser } from "@/services/user";
import { toast } from "sonner";

export default function Header() {
  const { user, setUser } = useContext(TaskManagerContext);
  const navigate = useNavigate();
  console.log(user);
  return (
    <header className="max-w-5xl mx-auto p-4 flex items-center justify-between">
      <Link to={"/"} className="text-xl">
        Task Manager
      </Link>
      {user ? (
        <nav className="flex items-center gap-2">
          <ModeToggle />
          <Button className="cursor-pointer" variant="outline">
            {user?.name?.split(" ")[0]}
          </Button>
          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={async () => {
              await SignOutUser();
              setUser(null);
              navigate("/signin");
              toast.error("Signed out successfully");
            }}
          >
            Sign Out
          </Button>
        </nav>
      ) : (
        <nav className="flex items-center gap-2">
          <ModeToggle />
          <Button className="cursor-pointer">
            <Link to={"/signin"}>Sign In</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
