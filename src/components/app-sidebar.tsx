"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  LogIn,
  UserPlus,
} from "lucide-react";

import { useSession } from "next-auth/react"; // ✅ Add this

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession(); // ✅ Access session

  // Sidebar Nav Items based on login state
  const navMain = [
    {
      title: "Home",
      url: "/",
      icon: SquareTerminal,
    },
    {
      title: "Wishlist",
      url: "/wishlist",
      icon: Bot,
    },
    {
      title: "My Bookings",
      url: "/bookings",
      icon: BookOpen,
    },
    ...(session?.user
      ? [
          {
            title: "Profile",
            url: "/profile",
            icon: Settings2,
          },
        ]
      : [
          {
            title: "Login",
            url: "/login",
            icon: LogIn,
          },
          {
            title: "Signup",
            url: "/signup",
            icon: UserPlus,
          },
        ]),
  ];

  const projects = [
    {
      name: "Popular Destinations",
      url: "/populardestination",
      icon: Map,
    },
    {
      name: "Categories",
      url: "/categories",
      icon: PieChart,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            {
              name: "Tours",
              logo: GalleryVerticalEnd,
              plan: "@tours",
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        {session?.user && (
          <NavUser
            user={{
              name: session.user.name || "",
              email: session.user.email || "",
              avatar: session.user.image || "/avatars/default.png",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
