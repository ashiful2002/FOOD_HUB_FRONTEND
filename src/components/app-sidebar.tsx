"use client";
import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import LogOut from "./modules/auth/logout/LogOut";

const data = {
  user: {
    name: "Food Hub",
    email: "support@foodhub.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [],
  navMain: [
    {
      title: "AdminDashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

const admin_dash = [
  {
    title: "Admin Dashboard",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Users",
        url: "/dashboard/users",
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
      },
      {
        title: "Categories",
        url: "/dashboard/categories",
      },
    ],
  },
];
const provider_dash = [
  {
    title: "Provider Dashboard",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Add Menu",
        url: "/dashboard/add-menu",
      },

      {
        title: "Manage Menu",
        url: "/dashboard/menu",
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
      },
    ],
  },
];
// customer routes

const customer_dash = [
  {
    title: "customer Dashboard",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "My Orders",
        url: "/dashboard/orders",
      },
      { title: "Cart", url: "/cart" },
      { title: "Checkout", url: "/checkout" },
      { title: "My Orders", url: "/orders" }, // order details /:id
      { title: "profile", url: "/profile" },
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "PROVIDER" | "CUSTOMER";
}
export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  let navItem = null;
  if (userRole === "ADMIN") {
    navItem = admin_dash;
  }
  if (userRole === "PROVIDER") {
    navItem = provider_dash;
  }
  if (userRole === "CUSTOMER") {
    navItem = customer_dash;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItem!} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <LogOut />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
