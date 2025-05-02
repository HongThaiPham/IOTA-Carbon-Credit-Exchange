"use client";

import * as React from "react";
import {
  ArrowDownUpIcon,
  Globe2Icon,
  GlobeIcon,
  HistoryIcon,
  LayersIcon,
  LeafyGreenIcon,
  LifeBuoy,
  PlusCircleIcon,
  RefreshCwIcon,
  Send,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";

const data = {
  user: {
    name: "Leo Pham",
    email: "hongthaipro@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Data endpoints",
      url: "/admin/endpoints",
      icon: SettingsIcon,
      isActive: true,
    },
    {
      title: "Create token",
      url: "/admin/create-token",
      icon: PlusCircleIcon,
    },
    {
      title: "User Idenity",
      url: "/admin/user-identity",
      icon: UsersIcon,
    },
  ],
  navMainForMinter: [
    {
      title: "Mint token",
      url: "/minter/mint-token",
      icon: LayersIcon,
      isActive: true,
    },
    {
      title: "Mint history",
      url: "/minter/mint-history",
      icon: HistoryIcon,
    },
  ],
  navMainForTrader: [
    {
      title: "Swap",
      url: "/trader/swap",
      icon: ArrowDownUpIcon,
      isActive: true,
    },
    {
      title: "Retire",
      url: "/trader/retire",
      icon: RefreshCwIcon,
    },
  ],
  navMainSimulator: [
    {
      title: "Web2 Simulator 1",
      url: "/web2/cace65ff-fbba-46ab-814a-71b8f67f40df",
      icon: GlobeIcon,
      isActive: true,
    },
    {
      title: "Web2 Simulator 2",
      url: "/web2/ede84f08-0de1-4a63-a5d6-ced8e940ade4",
      icon: Globe2Icon,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LeafyGreenIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Carbon Credit</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="ADMIN" items={data.navMain} />
        <NavMain label="MINTER" items={data.navMainForMinter} />
        <NavMain label="TRADER" items={data.navMainForTrader} />
        <NavMain label="SIMULATOR" items={data.navMainSimulator} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
