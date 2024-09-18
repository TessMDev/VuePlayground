<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Car } from '../models/Car';
  import { useDateFormat, useMediaQuery, useTitle } from '@vueuse/core';
  import { useChangeCase } from '@vueuse/integrations/useChangeCase';
  import ListAddButton  from '../components/ListAddButton.vue';
  import ListItemCar from '@/components/ListItemCar.vue';
  import ListItemAdd from '@/components/ListItemAdd.vue';
  import PageHeader from '@/components/PageHeader.vue';
  import ListHeader from '@/components/ListHeader.vue';

  const title = useTitle("Cars List");
  const sortColumn = ref<string>("id");
  const sortOrder = ref<number>(1);
  const isAdding = ref<Boolean>(false);
  let id: number = 1;
  let currDate = new Date();
  const editingCarID = ref<number>(0);
  const isSmallScreen = useMediaQuery('(max-width: 699px)');
  const isMobile = useMediaQuery('(max-width: 500px)');

  // mock data to fill the table
  const Cars = ref<Array<Car>>([
    new Car(id++, 2017, "Ford", "Explorer", "Blue", new Date(currDate.setDate(currDate.getDate() - 5))),
    new Car(id++, 2020, "Honda", "Civic", "Gray", new Date(currDate.setDate(currDate.getDate() - 2))),
    new Car(id++, 2018, "Toyota", "RAV4", "White", new Date(currDate.setDate(currDate.getDate() - 3))),
    new Car(id++, 2005, "Nissan", "350Z", "Black", new Date(currDate.setDate(currDate.getDate() - 10))),
    new Car(id++, 2024, "Toyota", "Prius", "Silver", new Date()),
    new Car(id++, 2000, "Chevrolet", "Blazer", "Red", new Date(currDate.setDate(currDate.getDate() - 32))),
  ]);

  const allColumns: string[] = [
    "id", "year", "make", "model", "color", "dateAdded"
  ];

  const visibleColumns = computed<Array<string>>(() => {
    if (isMobile.value) {
      return ["year", "make", "model"];
    }
    else if (isSmallScreen.value) {
      return ["id", "year", "make", "model", "color"];
    }
    else {
      return allColumns;
    }
  });

  // Year options should be 2000 - current year
  const yearOptions = ref<Array<number>>([]);
  for (let i: number = 2000; i <= new Date().getFullYear(); i++) {
    yearOptions.value.push(i);
  }

  const sortedCars = computed<Car[]>(() => {

    let sortedArray: Car[] = Cars.value;

    if (Cars.value.length > 0) {
      // sort cars by sortColumn ASC
      if (sortOrder.value == 1) {
        sortedArray.sort((a, b) => {
          // it's a string, lowercase before we sort
          if (typeof a[sortColumn.value] == "string") {
            return a[sortColumn.value].toLowerCase() < b[sortColumn.value].toLowerCase() ? -1 : 1;
          }
          // not a string, just compare
          else {
            return a[sortColumn.value] < b[sortColumn.value] ? -1 : 1;
          }
        });
      }
      // sort cars by sortColumn DESC
      else if (sortOrder.value == -1) {
        sortedArray.sort((a, b) => {
          // it's a string, lowercase before we sort
          if (typeof a[sortColumn.value] == "string") {
            return a[sortColumn.value].toLowerCase() > b[sortColumn.value].toLowerCase() ? -1 : 1;
          }
          // not a string, just compare
          else {
            return a[sortColumn.value] > b[sortColumn.value] ? -1 : 1;
          }
        });
      }
    }

    return sortedArray;
  });


  function sortBy(columnName: string) {
    // only if we're not editing..
    if (editingCarID.value == 0 && !isAdding.value) {
      let prevValue: string = sortColumn.value;
      sortColumn.value = columnName;

      // Sort the same column again, so just flip it between asc and desc
      if (sortColumn.value == prevValue) {
        sortOrder.value = (sortOrder.value < 0) ? 1 : -1;
      }
      // Sorting this column for the first time, start it as asc
      else {
        sortOrder.value = 1;
      }
    }
  }

  function capitalize(value: string): string {
    return useChangeCase(value, 'capitalCase').value;
  }

  function formatDate(value: Date) {
    return useDateFormat(value, "DD MMM YYYY");
  }

  function toggleAddRow(show: boolean): void {
    isAdding.value = show;
  }

  function saveAddRow(car: Car): void {
    if (car.make !== "" && car.model != "") {
      car.id = id++;
      Cars.value.push(car);
      toggleAddRow(false);
    }
  }

  function saveEditRow(car: Car): void {
    if (car.make !== "" && car.model != "") {
      let newCar: Car = new Car(car.id, car.year, car.make, car.model, car.color, car.dateAdded);
      let carIndex = Cars.value.findIndex((car) => car.id == editingCarID.value);
      Cars.value[carIndex] = newCar;
    }

    toggleEditCar(false);
  }

  function toggleEditCar(isEditing: boolean, carID?: number): void {
    // editing
    if (isEditing && carID) {
      editingCarID.value = carID;
    }

    // done editing
    else {
      editingCarID.value = 0;
    }
  }

  function deleteCar(carID: number) {
    let carIndex = Cars.value.findIndex((car) => car.id == carID);
    Cars.value.splice(carIndex, 1);
  }

  function getCarById(carID: number): Car {
    return Cars.value.find((car) => car.id == carID) || new Car();
  }

</script>


<template>
  <div class="cars-view">
    <PageHeader>
      <template #title>Vehicle Inventory List</template>
      <template #body>Built using Vue 3. &nbsp;List of vehicles is reactive, sortable, and inline-editable! &nbsp;Add/Modify cars in the list below!</template>
    </PageHeader>

    
    <div class="list-container">
      <table class="car-table">
        <thead>
          <ListHeader 
            :columns="visibleColumns" 
            :sort-column="sortColumn" 
            :sort-order="sortOrder" 
            @sort-click="(column) => sortBy(column)">
          </ListHeader>
        </thead>
        <TransitionGroup tag="tbody" name="fade" class="table-body">
          <template v-for="car in sortedCars" :key="car.id">
            <!-- Individual Car Item Row-->
            <ListItemCar
              :car="car" 
              :columns="visibleColumns" 
              :is-editing="car.id == editingCarID" 
              :is-disabled="(isAdding || editingCarID > 0) as boolean" 
              @edit-item="toggleEditCar(true, car.id)"
              @delete-item="deleteCar(car.id)"
              @save-edit="(car) => saveEditRow(car)"
              @cancel-edit="toggleEditCar(false)">
            </ListItemCar>
          </template>
          <!-- Add Row -->
          <ListItemAdd v-if="isAdding" @save-add="(car) => saveAddRow(car)" @cancel-add="toggleAddRow(false)"></ListItemAdd>
        </TransitionGroup>
      </table>
      <!-- Add Button below Table -->
      <ListAddButton v-if="!isAdding && editingCarID == 0" @clicked="toggleAddRow(true)" :message="'Add a car to the inventory list!'"></ListAddButton>
    </div>
  </div>
</template>


<style lang="scss">
  .car-table {
    border-collapse: collapse;
    width: 100%;

    th {
      text-align: left;
      padding: 12px 16px;
    }

    td {
      text-align: left;
      padding: 16px;

      input {
        width: 100%;
        box-sizing: border-box;
        background-color: #2f2e2e;
        border: none;
        outline: none;
        color: #ccc;
        font-size: 14px;
        font-weight: 400;
        padding: 5px;
        border-radius: 10px;
      }
      select {
        width: 100%;
        box-sizing: border-box;
        background-color: #2f2e2e;
        border: none;
        outline: none;
        color: #ccc;
        font-size: 14px;
        font-weight: 400;
        padding: 5px 0 5px 5px;
        border-radius: 10px;
      }
    }

    .car-row {
      border-bottom: 0.1em solid var(--color-border);
      background-color: rgba(256, 256, 256, 0.02);

      &.disabled {
        cursor:not-allowed;

        td {
          background-color: rgba(256, 256, 256, 0.1);
          pointer-events: none;
        }

        .button-column {
          svg {
            display: none;
          }
        }
      }

      &:last-of-type {
        border-bottom: none;
      }
    }

    .car-row-edit {
      background-color: rgba(256, 256, 256, 0.02);
      outline: 2px solid #725de7;
      border-radius: 10px;
    }

    .button-column {
        max-width: 100px;
        padding: 16px 0 !important;
        white-space: no-wrap;

        .edit-button, .check-button{
          margin: 0 5px;
          cursor: pointer;
        }
        .trash-button, .cancel-button {
          margin: 0 -15px 0 5px;
          cursor: pointer;
        }

        .edit-button:hover, .check-button:hover {
          color: rgb(93, 125, 184);
        }
        .trash-button:hover, .cancel-button:hover {
          color: rgb(192, 52, 52);
        }
        .check-button:hover {
          color: rgb(93, 223, 110);
        }
      }
  }

  .fade-move, .fade-enter-active, .fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
  }

  .fade-leave-active {
    position: absolute;
  }

  @media screen and (max-width: 699px){
    .hide-small {
      display: none;
    }

    .trash-button, .cancel-button {
      margin: 0 0 0 5px;
    }
  }
  @media screen and (max-width: 500px){
    .hide-mobile {
      display: none;
    }
  }
  
</style>
