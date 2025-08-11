<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { LocationEntry } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DateTime } from 'luxon';
import { MapPin } from 'lucide-vue-next';

const { history } = defineProps<{
  history: LocationEntry[];
}>();
</script>

<template>
  <ScrollArea class="h-[200px] lg:h-[410px] w-full rounded-md border">
    <div class="p-4">
      <h4 class="mb-8 text-sm font-medium leading-none">Route History</h4>

      <Stepper
        orientation="vertical"
        class="mx-auto flex w-full max-w-md flex-col justify-start gap-8 pl-1"
      >
        <StepperItem
          v-for="(entry, index) in history"
          :key="entry.timestamp"
          class="relative flex w-full items-start gap-6"
          :step="index"
        >
          <div
            class="absolute left-[3px] top-[5px] block h-[160%] w-0.5 shrink-0 rounded-full bg-slate-300"
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
              {{
                DateTime.fromISO(entry.timestamp).toFormat(
                  'dd LLL yyyy, hh:mm:ss a'
                )
              }}
            </StepperTitle>
            <StepperDescription
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              <span class="flex text-xs gap-1 items-center">
                <MapPin class="size-4 pl-0.5" />
                <span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span class="flex gap-2">
                          <span><em>Lat: </em>{{ entry.location.lat }}</span>
                          <span><em>Lat: </em>{{ entry.location.lat }}</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span
                          >Lat: {{ entry.location.lat }} <br />Lng:
                          {{ entry.location.lng }}</span
                        >
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </span>
            </StepperDescription>
          </div>
        </StepperItem>
      </Stepper>
    </div>
  </ScrollArea>
</template>
