<script setup lang="ts">
  defineProps<{
    message: string
  }>();

  const emit = defineEmits<{
    (e: "clicked"): void
  }>();

  function clicked(): void {
    emit("clicked");
  }
</script>

<template>
  <div class="centered-add-link" @click="clicked()">
    <p><v-icon name="bi-plus-square-dotted"></v-icon> {{ message }}</p>
  </div>
</template>

<style>
   .centered-add-link {
    text-align: center;
    width: 100%;
    padding: 16px;
    margin-top: 10px;
    border: 1px dashed var(--color-border);
    border-radius: 10px;
    cursor: pointer;
    color: #777;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .centered-add-link:hover {
    border-color: rgb(93 73 205);
    color: rgb(93 73 205);
  }
</style>
