<template>
  <v-sheet class="dashboard" fluid>
    <v-card>
      <v-card-title class="text-h4" style="color: white">Enter your link below</v-card-title>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field variant="outlined" v-model="url" :disabled="isProcessRunning" :loading="isProcessRunning" label="Enter Link" />
            </v-col>
            <v-row class="pa-2">
              <v-col cols="3">
                <v-btn-toggle v-model="downloadType" mandatory rounded="lg">
                  <v-btn :loading="isProcessRunning" value="single">Single</v-btn>
                  <v-btn :loading="isProcessRunning" value="playlist">Playlist</v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="3">
                <v-btn-toggle v-model="fileType" mandatory rounded="lg">
                  <v-btn :loading="isProcessRunning" value="music">Music</v-btn>
                  <v-btn :loading="isProcessRunning" value="video">Video</v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="3"></v-col>
              <v-col cols="3">
                <v-btn :loading="isProcessRunning" color="primary" text="Submit Data" @click="onSubmit" height="98%" block></v-btn>
              </v-col>
            </v-row>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
    <v-row class="mt-2">
      <v-col cols="12yu">
        <v-card>
          <v-card-title>Logs</v-card-title>
          <v-card-text>
            <div class="log-window">
              <div v-for="(log, index) in outputLog" :key="index">
                <span :class="log.type">[{{ log.type }}]</span>: {{ log.message }}
              </div>
            </div>
            <!--            <v-textarea disabled />-->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useMusicDownloaderStore } from '@/store/music-downloader';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';

const { fetchSingleDownload, fetchPlaylistDownload, fetchSingleVideo, fetchPlaylistVideo, onWebsocketMessageLog } = useMusicDownloaderStore();
const { url, downloadType, fileType, isLoading, outputLog } = storeToRefs(useMusicDownloaderStore());
const { isProcessRunning, ws } = storeToRefs(useAppStore());
const value = ref(70);

async function onSubmit() {
  // Handle form submission
  if (!url.value || !downloadType.value || !fileType.value) {
    console.error('Please fill in all fields');
    return;
  }
  isLoading.value = true;
  console.log('Form submitted with:', {
    url: url.value,
    downloadType: downloadType.value,
    fileType: fileType.value,
  });
  if (fileType.value === 'video') {
    console.log('>>> downloading video');
    if (downloadType.value === 'playlist') {
      await fetchPlaylistVideo();
    } else {
      await fetchSingleVideo();
    }
  } else {
    console.log('>>> downloading music');
    if (downloadType.value === 'playlist') {
      await fetchPlaylistDownload();
    } else {
      await fetchSingleDownload();
    }
  }
}

onBeforeMount(() => {
  ws.value?.addHandler('message', onWebsocketMessageLog);
});

onBeforeUnmount(() => {
  ws.value?.removeHandler('message', onWebsocketMessageLog);
});
</script>

<style scoped>
.dashboard {
  background-color: #555353;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.log-window {
  width: 100%;
  overflow-y: auto;
  padding: 10px;
  min-height: 175px;
  background-color: #000000;
  color: #ffffff;
  font-family: monospace, monospace;
  font-size: 12px;
  box-shadow:
    0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 1px 5px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}

.log {
  color: #00ff00;
}

.error {
  color: #ff0000;
}

.warning {
  color: #ffff00;
}

.info {
  color: #6495edff;
}
</style>
