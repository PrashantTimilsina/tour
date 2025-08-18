"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
function ChangePassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = { currentPassword, newPassword, confirmPassword };
    console.log("chalyo");
    try {
      const res = await axios.post("/api/auth/changepassword", user);
      const data = res.data;

      toast.success(data.message, { autoClose: 1500 });
      router.push("/");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.status === 400) {
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      } else if (err.response?.status === 403) {
        toast.error(err.response.data.message, { autoClose: 1500 });
      } else {
        toast.error("server error", { autoClose: 1500 });
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 dark:bg-gray-800">
          <div className="text-center space-y-2 ">
            <h1 className="text-2xl font-bold tracking-tighter">
              Change your password
            </h1>
          </div>
          <form className="space-y-4 ">
            <div className="space-y-2">
              <Label htmlFor="currentpassword">Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentpassword"
                  value={currentPassword}
                  required
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newpassword">New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  id="newpassword"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmpass">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmpass"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
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
            <Button
              type="submit"
              className="w-full cursor-pointer"
              onClick={handleSubmit}
            >
              Change Password
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ChangePassword;
