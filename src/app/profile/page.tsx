"use client";
import axios, { AxiosError } from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useData } from "@/context/userContext";

function Profile() {
  const { data: session, update } = useSession();
  const { user, fetchUser } = useData();
  const [publicId, setPublicId] = useState(
    user?.cloudinaryId || session?.user.cloudinaryId || ""
  );

  const handleImageUpload = async (image: string) => {
    try {
      setPublicId(image);
      const res = await axios.put(
        "/api/user/updateImage",
        { image },
        { withCredentials: true }
      );
      await update();

      toast.success(res.data.message, { autoClose: 1500 });
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message, { autoClose: 1500 });
    }
  };

  useEffect(() => {
    fetchUser();
    setPublicId(user?.cloudinaryId || session?.user.cloudinaryId || "");
  }, [user?.cloudinaryId, session?.user.cloudinaryId]);

  const deleteProvider = async () => {
    try {
      await axios.delete("/api/auth/deleteaccount");
      toast.success("User deleted", { autoClose: 1500 });
      signOut({ callbackUrl: "/" });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message, { autoClose: 1500 });
    }
  };

  const profileImage =
    publicId || user?.cloudinaryId || user?.image || session?.user.image;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full sm:w-[90%] mx-auto mt-6 p-4">
      <div className="bg-white dark:bg-[#283548] rounded-lg p-6 flex flex-col items-center gap-5 shadow-md">
        <h1 className="text-2xl font-semibold">Profile</h1>

        <div className="relative h-72 w-72 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
          {profileImage ? (
            publicId || session?.user.cloudinaryId ? (
              <CldImage
                src={profileImage}
                alt="Profile picture"
                width={288}
                height={288}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={profileImage as string}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            )
          ) : (
            <Image
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile picture"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="text-lg flex flex-col gap-1 text-center">
          <h3 className="font-medium">Name: {session?.user?.name}</h3>
          <h3 className="font-medium">Email: {session?.user?.email}</h3>
        </div>

        <CldUploadWidget
          uploadPreset="blogwebapp"
          onSuccess={({ event, info }) => {
            if (
              event === "success" &&
              info &&
              typeof info !== "string" &&
              info.public_id
            ) {
              setPublicId(info.public_id);
              handleImageUpload(info.public_id);
            }
          }}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded transition cursor-pointer"
            >
              Update Picture
            </button>
          )}
        </CldUploadWidget>
      </div>

      <div className="bg-white dark:bg-[#283548] rounded-lg p-6 flex flex-col items-center gap-5 shadow-md justify-center">
        <h3 className="text-xl font-semibold">Manage Account</h3>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link href="/changepassword">
            <button className="bg-gray-200 dark:bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-300 transition cursor-pointer">
              Change Password
            </button>
          </Link>
          <button
            onClick={deleteProvider}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
