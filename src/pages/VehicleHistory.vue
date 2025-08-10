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
  <div class="flex gap-4">
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

      <div>
        <Stepper
          orientation="vertical"
          class="mx-auto flex w-full max-w-md flex-col justify-start gap-10"
        >
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full items-start gap-6"
            :step="step.step"
          >
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1].step"
              class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />

            <StepperTrigger as-child>
              <Button
                :variant="
                  state === 'completed' || state === 'active'
                    ? 'default'
                    : 'outline'
                "
                size="icon"
                class="z-10 rounded-full shrink-0"
                :class="[
                  state === 'active' &&
                    'ring-2 ring-ring ring-offset-2 ring-offset-background',
                ]"
              >
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>

            <div class="flex flex-col gap-1">
              <StepperTitle
                :class="[state === 'active' && 'text-primary']"
                class="text-sm font-semibold transition lg:text-base"
              >
                {{ step.title }}
              </StepperTitle>
              <StepperDescription
                :class="[state === 'active' && 'text-primary']"
                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
              >
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperItem>
        </Stepper>
      </div>
    </div>

    <div class="w-3/4">
      <div class="w-full h-dvh rounded-2xl overflow-hidden">
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
