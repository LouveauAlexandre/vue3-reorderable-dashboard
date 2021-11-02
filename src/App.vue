<template>
  <div id="app">
    <div class="color-header">
      <Icon :color="selected" :index="-1" style="width: auto">
        Resizable Grid Dashboard
      </Icon>
    </div>
    <div class="test">
      <Grid
        :center="true"
        :draggable="true"
        :sortable="true"
        :auto-cell-size="true"
        :items="colors"
        :drag-delay="200"
        :column-count-max="3"
        :row-count-max="3"
        :cell-min-width="200"
        :cell-min-height="200"
        @change="change"
        @remove="remove"
        @click="click"
        @sort="sort"
      >
        <template #cell="props">
          <Icon
            :color="props.item"
            :index="props.index"
            :with-button="true"
            @remove="props.remove()"
          />
        </template>
      </Grid>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from '@vue/reactivity';
  import Icon from '@/components/Icon.vue';
  import Grid from '@/components/Grid.vue';
  import { generateRGBColors } from './composables/utils';
  import { GridEvent } from './composables/gridEmitParam';

  const colors = ref(generateRGBColors(8));
  const selected = ref(colors.value[0]);

  function click({ items, index }: GridEvent) {
    let value = items.find((v) => v.index === index);
    if (value) selected.value = value.item;
  }

  function change(event: GridEvent) {
    console.log('change', event);
  }

  function remove(event: GridEvent) {
    console.log('remove', event);
  }

  function sort(event: GridEvent) {
    console.log('sort', event);
  }
</script>

<style>
  body {
    background: #fafafa;
    width: 100vw;
    height: 100vh;
    margin: 0%;
    padding: 0%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    margin: 0%;
    padding: 0%;
    display: flex;
    flex-direction: column;
  }
  .color-header {
    box-sizing: border-box;
    margin-bottom: 2%;
    justify-content: center;
    text-align: center;
  }

  .test {
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    outline: auto;
    flex: auto;
  }
</style>
