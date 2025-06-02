<template>
  <v-navigation-drawer :width="212" v-model="drawer">
    <v-list-item title="Music Tagger" subtitle=""></v-list-item>
    <v-divider></v-divider>

    <v-list v-model="selectedPath">
      <v-list-item
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
        :active="selectedPath === item.value"
        @click="selectedPath = item.value"
        :to="item.value"
        rounded
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);
const selectedPath = ref('dashboard');
const options = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    value: 'dashboard',
  },
  {
    title: 'Tagger',
    icon: 'mdi-tag',
    value: 'tagger',
  },
  {
    title: 'Settings',
    icon: 'mdi-cog',
    value: 'settings',
  },
];
</script>

<style scoped></style>
