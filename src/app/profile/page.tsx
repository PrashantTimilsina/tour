"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Profile() {
  const { data: session } = useSession();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#F5F5F5] w-full sm:w-[90%] mx-auto justify-between gap-4 mt-3 p-4 rounded dark:bg-[#1E293B] ">
      <div className="bg-[#FFFFFF] flex flex-col gap-4 items-center justify-center p-4 mt-1 rounded dark:bg-[#283548]">
        <h1 className="text-2xl tracking-wide ">Profile</h1>
        {session?.user.image ? (
          <div className="relative h-72 w-72 object-cover rounded ">
            <Image
              src={session?.user.image as string}
              alt="Profile picture"
              width={256}
              height={256}
              className="object-cover rounded  shadow-2xl"
            />
          </div>
        ) : (
          <div className="relative h-72 w-72 object-cover rounded ">
            <Image
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile picture"
              width={256}
              height={256}
              className="object-cover rounded "
            />
          </div>
        )}
        <div className="text-xl flex flex-col gap-1">
          <h3>Name: {session?.user?.name}</h3>
          <h3>Email: {session?.user?.email}</h3>
        </div>
        <button className="bg-blue-500 text-white  flex items-center justify-center px-8 py-1.5  text-xl cursor-pointer rounded">
          Update Picture
        </button>
      </div>
      <div className="bg-[#FFFFFF] flex flex-col gap-4 items-center justify-center p-4 mt-1 rounded dark:bg-[#283548]">
        <h3 className="sm:text-2xl tracking-wide text-xl">Manage Account</h3>
        <div className="flex  gap-5 flex-wrap items-center justify-center">
          <Link href="/changepassword">
            <button className="bg-slate-100 rounded px-6 py-2 cursor-pointer border-none dark:text-black">
              Change Password
            </button>
          </Link>
          <button className="bg-red-500 rounded px-6 py-2 cursor-pointer border-none text-white">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
