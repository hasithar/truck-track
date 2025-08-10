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
import type { LocationEntry } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const { history } = defineProps<{
  history: LocationEntry[];
}>();
console.log('🚀 ~ history:', history);

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
  <ScrollArea class="h-[500px] w-full rounded-md border">
    <div class="p-4">
      <h4 class="mb-8 text-sm font-medium leading-none">Route History</h4>

      <Stepper
        orientation="vertical"
        class="mx-auto flex w-full max-w-md flex-col justify-start gap-5 pl-1"
      >
        <StepperItem
          v-for="(entry, index) in history"
          :key="entry.timestamp"
          class="relative flex w-full items-start gap-6"
          :step="index"
        >
          <div
            class="absolute left-[3px] top-[5px] block h-[130%] w-0.5 shrink-0 rounded-full bg-slate-300"
            v-if="index !== history.length - 1"
          />

          <StepperTrigger as-child>
            <Button
              variant="default"
              size="icon"
              class="z-10 rounded-full shrink-0 ring-2 ring-ring ring-offset-2 ring-offset-background w-2 h-2"
            >
              <Circle />
            </Button>
          </StepperTrigger>

          <div class="flex flex-col gap-1 -mt-2.5">
            <StepperTitle class="text-sm font-semibold transition lg:text-base">
              {{ entry.timestamp }}
            </StepperTitle>
            <StepperDescription
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              {{ entry.location.lat }}
            </StepperDescription>
          </div>
        </StepperItem>
      </Stepper>
    </div>
  </ScrollArea>
</template>
