<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Car } from '../models/Car';
import { useDateFormat } from '@vueuse/core';

  const props = defineProps<{
    car: Car,
    columns: string[],
    isEditing: boolean,
    isDisabled: boolean
  }>();

  const emit = defineEmits<{
    (e: "editItem", carID: number): void,
    (e: "deleteItem", carID: number): void,
    (e: "saveEdit", car: Car): void,
    (e: "cancelEdit"): void
  }>();

  let editCar: Car = new Car();
  watch(props, (newValue, oldValue) => {
    if (newValue.isEditing) {
      editCar = { ...props.car }
    }
  });

  // Year options should be 2000 - current year
  const yearOptions = ref<Array<number>>([]);
  for (let i: number = 2000; i <= new Date().getFullYear(); i++) {
    yearOptions.value.push(i);
  }

  function emitSave(): void {
    emit("saveEdit", editCar);
  }

  function emitCancel(): void {
    emit("cancelEdit");
  }

  function emitEdit() {
    emit("editItem", props.car.id);
  }

  function emitDelete() {
    emit("deleteItem", props.car.id);
  }

  function formatDate(value: Date) {
    return useDateFormat(value, "DD MMM YYYY");
  }
</script>

<template>
  <Transition name="fade">
    <!-- View Row -->
    <tr class="car-row" v-if="!isEditing" :class="{'disabled': isDisabled}">
      <td v-for="columnName in columns" class="no-select">
        <span v-if="! (car[columnName] instanceof Date)">{{ car[columnName] }}</span>
        <span v-else>{{ formatDate(car[columnName]) }}</span>
      </td>
      <td class="no-select button-column">
        <v-icon class="edit-button" name="bi-pencil" animation="float" hover @click="emitEdit()" /> 
        <v-icon class="trash-button" name="bi-trash3" animation="float" hover @click="emitDelete()" />
      </td>
    </tr>
  
    <!-- Editing Row -->
    <tr class="car-row-edit" v-else>
      <td class="hide-mobile">
        <span>{{ editCar.id }}</span>
      </td>
      <td>
        <select placeholder="Year" v-model.number="editCar.year">
          <option v-for="year in yearOptions" :value="year">{{year}}</option>
        </select>
      </td>
      <td>
        <input size="1" type="text" placeholder="Make" v-model="editCar.make"/>
      </td>
      <td>
        <input size="1" type="text" placeholder="Model" v-model="editCar.model"/>
      </td>
      <td class="hide-mobile">
        <input size="1" type="text" placeholder="Color" v-model="editCar.color"/>
      </td>
      <td class="hide-small">
        {{ formatDate(editCar.dateAdded) }}
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
