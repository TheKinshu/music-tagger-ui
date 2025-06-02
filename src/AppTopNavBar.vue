<template>
  <v-app-bar scroll-behavior="elevate" rounded :elevation="1">
    <v-spacer />
    <v-menu :close-on-content-click="false" :modelValue="userMenuValue" @update:modelValue="(value) => (userMenuValue = value)">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-account" />
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-icon icon="mdi-logout"></v-icon>
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userMenuValue = ref(false);
</script>

<style scoped></style>
