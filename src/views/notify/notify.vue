<template>
  <transition name="fade" mode="out-in">
    <v-alert
      type="error"
      class="alert"
      elevation="2"
      closable
      transition="fade-transition"
      v-if="isVisible"
      @click:close="isVisible = false"
      :model-value="isVisible"
      border="start"
    >
      <v-row>
        <v-col cols="12">
          <h4>Error</h4>
          <p>Failed to load query</p>
        </v-col>
      </v-row>
    </v-alert>
  </transition>
</template>
<script setup lang="ts">
import { useNotificationStore} from '@/store/notification';
import { storeToRefs } from 'pinia';

const { isVisible } = storeToRefs(useNotificationStore());

</script>
<style scoped>
.alert {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>