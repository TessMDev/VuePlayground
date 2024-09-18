<script setup lang="ts">
  defineProps<{}>();
</script>

<template>
  <div class="page-section">
    <h1 class="page-title">
      <slot name="title"></slot>
    </h1>
    <h3 class="page-description">
      <slot name="body"></slot>
    </h3>
  </div>
</template>

<style lang="scss">
  .page-section {
    margin-top: 35px;
    margin-bottom: 25px;
    padding: 16px;
    border-radius: 10px;
    position: relative;
    background: var(--color-background);
    text-align: center;

    &::before {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      z-index: -1;
      margin: -1px; /* !importanté */
      border-radius: inherit; /* !importanté */
      background: linear-gradient(349deg, rgba(222,94,224,1) 16%, rgb(93 73 205) 91%);
    }

    .page-title {
      font-weight: 400;
    }
    .page-description {
      margin-top:5px;
      font-weight: 100;
      line-height: 2rem;
    }
  }
</style>
