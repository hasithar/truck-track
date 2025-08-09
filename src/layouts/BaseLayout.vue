<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { RouterView } from 'vue-router';
</script>

<template>
  <SidebarProvider>
    <!-- Sidebar -->
    <AppSidebar />

    <SidebarInset>
      <!-- Main content -->
      <div class="flex flex-1 flex-col">
        <!-- Header -->
        <AppHeader />

        <!-- Page Content -->
        <main class="flex-1 overflow-auto p-6">
          <RouterView />
        </main>

        <!-- Footer -->
        <footer
          class="border-t bg-card px-6 py-3 text-xs text-muted-foreground justify-between flex"
        >
          <span>© {{ new Date().getFullYear() }} Truck Track.</span>
          <span>By: Hasitha Rukmal</span>
        </footer>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
