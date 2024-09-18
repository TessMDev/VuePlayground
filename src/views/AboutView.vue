<script setup lang="ts">
  import PageHeader from '@/components/PageHeader.vue';
  import SectionLink from '@/components/SectionLink.vue';
  import { useDateFormat, useMediaQuery, useTitle } from '@vueuse/core';

  const title = useTitle("About");
</script>

<template>
  <div class="about-view">
    <PageHeader>
      <template #title>Vue Playground</template>
      <template #body>
        <p>This is a Vue 3 app made to learn various Vue principles and best practices!  </p>
        <p>As each demo is completed, it will be added to its own section!</p>
      </template>
    </PageHeader>

    <div class="links-container">
      <div class="section-links">
        <SectionLink route="cars">
          <template #body>
            <v-icon name="fa-car" animation="float" speed="slow"></v-icon>
          </template>
          <template #title>
            Cars List!
          </template>
        </SectionLink>
        <SectionLink></SectionLink>
        <SectionLink></SectionLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .links-container {
    width: 100%;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;

    .section-links {
      width: 100%;
      max-width: 1000px;
    }
  }
</style>
