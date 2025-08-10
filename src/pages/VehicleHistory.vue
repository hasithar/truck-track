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
import { ref } from 'vue';

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
// Map state
const zoom = ref(12);
const center = ref<[number, number]>([mapConfig.base.lat, mapConfig.base.lng]);

const route = useRoute();
const vehicleId = route.params.id;
</script>

<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Create project {{ vehicleId }}</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Name</Label>
            <Input id="name" placeholder="Name of your project" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="framework">Framework</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="nuxt"> Nuxt </SelectItem>
                <SelectItem value="next"> Next.js </SelectItem>
                <SelectItem value="sveltekit"> SvelteKit </SelectItem>
                <SelectItem value="astro"> Astro </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button variant="outline"> Cancel </Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>

  <div>
    <Stepper>
      <StepperItem :step="1">
        <StepperTrigger>
          <StepperIndicator>1</StepperIndicator>
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>This is the first step</StepperDescription>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>
      <StepperItem :step="2">
        <StepperTrigger>
          <StepperIndicator>2</StepperIndicator>
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>This is the second step</StepperDescription>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  </div>

  <div class="w-full h-screen">
    <RouteMap :zoom="zoom" :center="center" />
  </div>
</template>
