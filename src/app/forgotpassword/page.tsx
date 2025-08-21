"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/forgotpassword", { email });
      const data = res.data;
      toast.success(data.message, { autoClose: 1500 });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message, { autoClose: 1500 });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to primary-100 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 dark:bg-gray-800">
          <div className="text-center space-y-2 ">
            <h1 className="text-3xl font-bold tracking-tighter">
              Forgot Password
            </h1>
          </div>
          <form className="space-y-8 " onSubmit={handleSubmit}>
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

            <Button type="submit" className="w-full cursor-pointer">
              Forgot Password
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
