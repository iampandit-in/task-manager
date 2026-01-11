import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignInUser } from "@/services/user";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TaskManagerContext } from "@/context";

const schema = z.object({
  email: z.email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export default function Signin() {
  const { setUser } = useContext(TaskManagerContext);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data) {
    try {
      const response = await SignInUser(data);
      if (response.success) {
        setUser(response.data);
        toast.success(response.message);
        form.reset();
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h1 className="text-2xl font-bold text-center">
            Sign In to Momentum
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your email and password to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="signin-email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="m@example.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="signin-password">Password</FormLabel>
                      <FormControl>
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="********"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full cursor-pointer">
                Sign In
              </Button>
            </CardFooter>
          </Card>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-400 underline">
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
