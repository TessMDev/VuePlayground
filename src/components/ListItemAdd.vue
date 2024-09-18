<script setup lang="ts">
import { ref, computed } from 'vue';
import { Car } from '../models/Car';
import { useDateFormat } from '@vueuse/core';

  const props = defineProps<{}>();

  const emit = defineEmits<{
    (e: "saveAdd", car: Car): void,
    (e: "cancelAdd"): void
  }>();

  const addCar = ref<Car>(new Car());

  // Year options should be 2000 - current year
  const yearOptions = ref<Array<number>>([]);
  for (let i: number = 2000; i <= new Date().getFullYear(); i++) {
    yearOptions.value.push(i);
  }

  function emitSave(): void {
    emit("saveAdd", addCar.value);
    addCar.value = new Car();
  }

  function emitCancel(): void {
    emit("cancelAdd");
    addCar.value = new Car();
  }

  function formatDate(value: Date) {
    return useDateFormat(value, "DD MMM YYYY");
  }
</script>

<template>
  <!-- View Row -->
  <Transition name="fade">
    <tr class="car-row-edit">
      <td class="hide-mobile">
        <!-- empty td for the id-->
      </td>
      <td>
        <select placeholder="Year" v-model.number="addCar.year">
          <option v-for="year in yearOptions" :value="year">{{year}}</option>
        </select>
      </td>
      <td>
        <input size="1" type="text" placeholder="Make" v-model="addCar.make"/>
      </td>
      <td>
        <input size="1" type="text" placeholder="Model" v-model="addCar.model"/>
      </td>
      <td class="hide-mobile">
        <input size="1" type="text" placeholder="Color" v-model="addCar.color"/>
      </td>
      <td class="hide-small">
        {{ formatDate(new Date()) }}
      </td>
      <td class="no-select button-column">
        <v-icon class="check-button" name="bi-check2" animation="float" hover @click="emitSave()"/> 
        <v-icon class="cancel-button" name="bi-x" animation="float" hover @click="emitCancel()"/>
      </td>
    </tr>
  </Transition>
</template>

<style>

</style>
