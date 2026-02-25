"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/services/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

import { userCredentials } from "../credentials";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await loginUser(data);

      if (res.success) {
        toast.success(res.message, { position: "top-center" });
        router.push(redirectPath || "/dashboard");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Card className="w-full sm:max-w-md mx-auto mt-12">
      {/* <div className="mx-auto">
        <Logo />
      </div> */}
      <CardHeader className="flex items-center ">
        {/* Back Icon */}
        <ChevronLeft
          size={24}
          className="cursor-pointer borde  text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-200 rounded-full"
          onClick={() => router.push("/")}
        />

        {/* Title */}
        <CardTitle className="text-2xl text-center mx-auto ">Login</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Demo Account Dropdown */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Demo Account (for testing)
              </p>

              <Select
                onValueChange={(value) => {
                  const selectedUser = userCredentials.find(
                    (user) => user.role === value
                  );

                  if (selectedUser) {
                    form.setValue("email", selectedUser.email);
                    form.setValue("password", selectedUser.password);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a demo role" />
                </SelectTrigger>

                <SelectContent>
                  {userCredentials.map((user) => (
                    <SelectItem key={user.role} value={user.role}>
                      {user.role.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="your@email.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={form.formState.isSubmitting}
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        autoComplete="current-password"
                        {...field}
                      />

                      {/* Toggle Icon */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Don’t have an account?{" "}
        <Link className="ml-1 underline" href={"/register"}>
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
