<script setup lang="ts">
  import { useDateFormat, useMediaQuery, useTitle } from '@vueuse/core';
  import { useRouter, useRoute } from 'vue-router'
  const props = defineProps<{
    route?: string
  }>();

  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const router = useRouter();

  function goToRoute() {
    router.push('/' + (props.route || ''));
  }
</script>

<template>
  <div class="section-link no-select" :class="{'disabled': !$slots.title}" @click="goToRoute()" >
    <div class="test">
      <div class="tile">
        <slot name="body">
          <v-icon name="fa-ban"></v-icon>
        </slot>
      </div>
      <div class="title-container">
        <div class="title">
          <slot name="title">
            Coming Soon!
          </slot>
        </div>
        <div class="subtitle">
          <slot name="subtitle">
            Nothing here yet...
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .section-link{
    cursor: pointer;
    width: 33%;
    padding: 20px;
    display: inline-block;
    text-align: center;
    position: relative;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

    &.disabled {
      cursor: not-allowed;

      .tile {
        border: 1px dashed var(--color-border);
        color: var(--color-border);
      }
      .title-container {
        .title {
          color: #555;
        }
        .subtitle {
          color: #777;
        }
      }
      
    }

    &:hover:not(.disabled) {
      .tile {
        color: rgb(141, 93, 231);
        border-color: rgb(141, 93, 231);
        background-color: rgba(93, 73, 205, 0.1);
      }
      .title-container {
        .title {
          color: rgb(141, 93, 231);
        }
      }
      
    }

    .tile, .title-container {
      display: inline-block;
    }

    .tile {
      border-radius: 10px;
      border: 1px solid rgb(93 73 205);
      color: rgb(93, 73, 205);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      justify-content: center;
      aspect-ratio: 1 / 1;
      width: 33%;
      text-align: center;
      position: relative;

      svg {
        width: 50%;
        height: 50%;
      }
    }

    .title-container {
      width: 67%;
      text-align: left;
      padding-left: 25px;
      position: relative;
      top: -5px;
      display: inline-block;

      .title {
        font-size:1.2rem;
        color: rgb(93, 73, 205);
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        font-weight: 500;
      }

      .subtitle {
        font-weight: 200;
      }
    }
    
  }

  @media screen and (max-width: 900px){
    
   .section-link {
    width:100%;
   }
  }

  @media screen and (max-width: 500px){
    
    .section-link {
      .title {
        font-size: 1.1rem;
      }
    }
  }
</style>
