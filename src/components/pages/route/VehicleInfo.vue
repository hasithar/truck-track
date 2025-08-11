<script lang="ts" setup>
import VehicleIcon from '@/components/common/VehicleIcon.vue';
import VehicleStatusTag from '@/components/common/VehicleStatusTag.vue';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { VehicleStatus, VehicleType } from '@/types';

const { name, type, status, plate } = defineProps<{
  name: string;
  status: VehicleStatus;
  type: VehicleType;
  plate: string;
}>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex justify-between gap-4">
        <span class="inline-flex gap-2 items-center">
          <VehicleIcon :type="type" :show-name="false" />
          <span>{{ name }}</span>
        </span>
        <span>
          <VehicleStatusTag :status="status" />
        </span>
      </CardTitle>
      <CardDescription>Plate Number: {{ plate }}</CardDescription>
    </CardHeader>
  </Card>
</template>

<style scoped></style>
