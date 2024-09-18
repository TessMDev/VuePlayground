<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useChangeCase } from '@vueuse/integrations/useChangeCase';

  const props = defineProps<{
    columns: string[],
    sortColumn: string,
    sortOrder: number
  }>();

  const emit = defineEmits<{
    (e: "sortClick", column: string): void
  }>();

  function sortBy(columnName: string) {
    emit("sortClick", columnName);
  }

  function capitalize(value: string): string {
    return useChangeCase(value, 'capitalCase').value;
  }
</script>

<template>
  <tr class="cars-header-row">
    <th v-for="columnName in columns" @click="sortBy(columnName)" class="no-select cars-header" :class="{active: sortColumn == columnName}">
      {{ capitalize(columnName) }} <span class="sort-arrow" v-if="sortColumn == columnName" :class="sortOrder > 0 ? 'asc' : 'dsc'"></span>
    </th>
    <th class="no-select no-click button-column cars-header">
      <span> </span>
    </th>
  </tr>
</template>

<style lang="scss">
  .cars-header-row {

    th:first-of-type {
      border-top-left-radius: 10px;
    }

    th:last-of-type {
      border-top-right-radius: 10px;
    }

    .cars-header {
      background-color: rgb(93 73 205);
      font-weight: 600;
      cursor: pointer;
      position: relative;
      transition: background-color 0.5s cubic-bezier(0.55, 0, 0.1, 1);

      &:hover, &.active {
        background-color: rgb(114, 93, 231);
      }

      &.no-click {
        &:hover {
          background-color: rgb(93 73 205);
        }
      }

      .sort-arrow {
        display: inline-block;
        width: 0;
        height: 0;
        opacity: 0.66;
        position: absolute;
        right:20px;
        margin-top: 10px;
        border-radius: 10px;
        transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);

        &.asc {
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #fff;
        }
        &.dsc {
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #fff;
        }
      }
    }
  }
</style>
