<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Button from '@/components/ui/button/Button.vue';
import { Truck, Car, Bus, Box, MapPin } from 'lucide-vue-next';
import { useVehicleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import VehicleIcon from '@/components/common/VehicleIcon.vue';
import VehicleStatusTag from '@/components/common/VehicleStatusTag.vue';

// Setup store
const vehicleStore = useVehicleStore();
const { vehicles } = storeToRefs(vehicleStore);
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>All Vehicles</CardTitle>
      <CardDescription
        >Browse the complete list of registered vehicles.</CardDescription
      >
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow class="uppercase text-black">
            <TableHead class="w-[50px]">#</TableHead>
            <TableHead>Plate</TableHead>
            <TableHead>Vehicle Name</TableHead>
            <TableHead>Vehicle Type</TableHead>
            <TableHead class="w-[100px]">Status</TableHead>
            <TableHead>Last Location</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(vehicle, index) in vehicles" :key="vehicle.id">
            <TableCell class="text-slate-400">{{ index + 1 }}</TableCell>
            <TableCell class="font-bold">{{ vehicle.plate }}</TableCell>
            <TableCell>{{ vehicle.name }}</TableCell>
            <TableCell>
              <VehicleIcon :type="vehicle.type" :show-name="true" />
            </TableCell>
            <TableCell>
              <VehicleStatusTag :status="vehicle.status" />
            </TableCell>
            <TableCell>
              <span class="flex text-xs gap-1 items-center">
                <MapPin class="size-4 pl-0.5" />
                <span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span class="flex gap-2">
                          <span
                            ><em>Lat: </em
                            >{{ vehicle.location.lat.toFixed(6) }}...</span
                          >
                          <span
                            ><em>Lat: </em
                            >{{ vehicle.location.lat.toFixed(6) }}...</span
                          >
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span
                          >Lat: {{ vehicle.location.lat }} <br />Lng:
                          {{ vehicle.location.lng }}</span
                        >
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </span>
            </TableCell>
            <TableCell>{{ vehicle.lastUpdated }}</TableCell>
            <TableCell> <Button size="sm">Locate</Button> </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<!-- export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  status: VehicleStatus;
  type: VehicleType;
  location: Location;
  lastUpdated: DateString;
  history: LocationEntry[];
} -->
