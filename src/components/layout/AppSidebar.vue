<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar';
import { LayoutDashboard, Truck, TruckElectric } from 'lucide-vue-next';
import NavMain from './sidebar/NavMain.vue';
import NavUser from './sidebar/NavUser.vue';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
});

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },

  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: 'Trucks',
      url: '#',
      icon: Truck,
      isActive: true,
      items: [
        {
          title: 'List',
          url: '/about',
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="flex gap-3 items-center mb-2 overflow-hidden">
        <div
          class="flex aspect-square size-12 items-center justify-center shadow-teal-200 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 text-white p-1 rounded-lg shadow-[0_4px_12px_rgba(94,234,212,0.4)]"
        >
          <TruckElectric class="size-8" />
        </div>
        <div class="flex flex-col text-left text-sm leading-tight">
          <span class="text-xl font-bold uppercase text-slate-500"
            ><strong class="text-slate-600">Truck</strong> Track</span
          >
          <span class="truncate text-xs">Live Tracking</span>
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>

    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
