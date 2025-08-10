<script setup lang="ts">
import RouteMap from '@/components/maps/RouteMap.vue';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mapConfig } from '@/config';
import { computed, ref } from 'vue';

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { useRoute } from 'vue-router';
import { useVehicleStore } from '@/store';
import { storeToRefs } from 'pinia';
import HistoryTimeline from '@/components/pages/dashboard/route/HistoryTimeline.vue';
// Map state
const zoom = ref(12);
const center = ref<[number, number]>([mapConfig.base.lat, mapConfig.base.lng]);

const route = useRoute();
const vehicleId = route.params.id;

const vehicleStore = useVehicleStore();
const { vehicles } = storeToRefs(vehicleStore);

const vehicle = computed(() => vehicles.value.find((v) => v.id === vehicleId));
console.log('🚀 ~ vehicle:', vehicle);

const steps = [
  {
    step: 1,
    title: 'Your details',
    description:
      'Provide your name and email address. We will use this information to create your account',
  },
  {
    step: 2,
    title: 'Company details',
    description:
      'A few details about your company will help us personalize your experience',
  },
  {
    step: 3,
    title: 'Invite your team',
    description:
      'Start collaborating with your team by inviting them to join your account. You can skip this step and invite them later',
  },
];
</script>

<template>
  <div class="flex gap-4 h-full">
    <div class="w-1/4">
      <div>
        <Card class="w-[350px]">
          <CardHeader>
            <CardTitle>Create project {{ vehicleId }}</CardTitle>
            <CardDescription
              >Deploy your new project in one-click.</CardDescription
            >
          </CardHeader>
          <CardContent> </CardContent>
          <CardFooter class="flex justify-between px-6 pb-6">
            <Button variant="outline"> Cancel </Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>

      <div v-if="vehicle?.history.length">
        <HistoryTimeline :history="vehicle?.history" />
      </div>
    </div>

    <div class="w-3/4">
      <div class="w-full h-full rounded-2xl overflow-hidden">
        <RouteMap
          :zoom="zoom"
          :center="center"
          :vehicle="vehicle"
          v-if="vehicle"
        />
        <div v-else>Vehicle not Found</div>
      </div>
    </div>
  </div>
</template>
