<template>
  <v-app>
    <AppSideNavBar />
    <v-main>
      <v-container>
        <notify/>
        <router-view v-slot="{ Component }">
          <v-slide-x-transition mode="out-in">
            <component :is="Component" />
          </v-slide-x-transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { WebSocketService } from '@/socket';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import AppSideNavBar from '@/AppSideNavBar.vue';
import Notify from '@/views/notify/notify.vue';

const { onWebsocketConnected, onWebsocketDisconnected, onWebsocketMessageProcess } = useAppStore();
const { ws, isOnline, isLoading, isProcessRunning } = storeToRefs(useAppStore());

onMounted(() => {
  ws.value = new WebSocketService('854d88ea-d1c4-4144-8f77-79783300023a');
  ws.value.addHandler('open', onWebsocketConnected);
  ws.value.addHandler('close', onWebsocketDisconnected);
  ws.value.addHandler('message', onWebsocketMessageProcess);
});

onBeforeUnmount(() => {
  ws.value?.removeHandler('open', onWebsocketConnected);
  ws.value?.removeHandler('close', onWebsocketDisconnected);
  ws.value?.removeHandler('message', onWebsocketMessageProcess);
});
</script>
