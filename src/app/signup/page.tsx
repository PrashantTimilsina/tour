"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    const user = { name, email, password, confirmPassword };
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", user);
      await signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: "/",
      });
      toast.success("User created", { autoClose: 1500 });
      router.push("/");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.status === 400) {
        toast.error("Invalid credentials", { autoClose: 1500 });
      } else {
        toast.error("server error", { autoClose: 1500 });
        console.log(err);
      }
    }
  };
  const handleProvider = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    e.preventDefault();
    signIn(value, { callbackUrl: "/" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to primary-100 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 dark:bg-gray-800">
          <div className="text-center space-y-2 ">
            <h1 className="text-3xl font-bold tracking-tighter">
              Create your account
            </h1>
            <p className=" text-muted-foreground">
              Fill in the details to create a new account
            </p>
          </div>
          <form className="space-y-4 " onSubmit={handleSubmit}>
            <div className="space-y-2 ">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="username"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="dummy@gmail.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmpass">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPass ? "text" : "password"}
                  id="confirmpass"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="******"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="#"
                className="text-sm text-primary-500 hover:text-primary-600"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground dark:bg-slate-800">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => handleProvider(e, "github")}
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => handleProvider(e, "google")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
