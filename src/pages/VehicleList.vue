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
import { Truck, Car, Bus, Box, MapPin, Locate } from 'lucide-vue-next';
import { useVehicleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import VehicleIcon from '@/components/common/VehicleIcon.vue';
import VehicleStatusTag from '@/components/common/VehicleStatusTag.vue';
import { DateTime } from 'luxon';

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
            <TableHead class="w-[120px]">Status</TableHead>
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
            <TableCell
              >{{
                DateTime.fromISO(vehicle.lastUpdated).toFormat(
                  'dd LLL yyyy, hh:mm:ss a'
                )
              }}
            </TableCell>
            <TableCell>
              <RouterLink :to="`/route/${vehicle.id}`">
                <Button size="sm" class="cursor-pointer hover:bg-slate-700"
                  ><Locate :size="4" /> Locate</Button
                >
              </RouterLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
