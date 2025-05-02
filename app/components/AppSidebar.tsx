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
      url: "/web2/e074df49-59f4-4eda-a2fe-d6bc687d3d83",
      icon: GlobeIcon,
      isActive: true,
    },
    {
      title: "Web2 Simulator 2",
      url: "/web2/ee4e4ede-3676-47eb-952a-5d22696559b4",
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
