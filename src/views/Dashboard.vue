<template>
  <v-sheet class="dashboard" fluid>
    <v-card>
      <v-card-title class="text-h4" style="color: white">Enter your link below </v-card-title>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field variant="outlined" v-model="url" :disabled="isLoading" :loading="isLoading" label="Enter Link" />
            </v-col>
            <v-row class="pa-2">
              <v-col cols="3">
                <v-btn-toggle v-model="downloadType" mandatory rounded="lg">
                  <v-btn :loading="isLoading" value="single">Single</v-btn>
                  <v-btn :loading="isLoading" value="playlist">Playlist</v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="3">
                <v-btn-toggle v-model="fileType" mandatory rounded="lg">
                  <v-btn :loading="isLoading" value="music">Music</v-btn>
                  <v-btn :loading="isLoading" value="video">Video</v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="3"></v-col>
              <v-col cols="3">
                <v-btn :loading="isLoading" color="primary" text="Submit Data" @click="onSubmit" height="98%" block></v-btn>
              </v-col>
            </v-row>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
<!--    <v-row class="mt-2">-->
<!--      <v-col cols="6">-->
<!--        <v-card style="max-height: 500px; height: 238px">-->
<!--          <v-card-title> Progress </v-card-title>-->
<!--          <v-card-subtitle>10/10</v-card-subtitle>-->
<!--          <v-card-text style="text-align: center; height: 100%">-->
<!--            <v-progress-circular :model-value="value" :rotate="360" :size="100" :width="15" color="teal">-->
<!--              {{ value }}-->
<!--            </v-progress-circular>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--      <v-col cols="6">-->
<!--        <v-card>-->
<!--          <v-card-title>Logs</v-card-title>-->
<!--          <v-card-text>-->
<!--            <v-textarea disabled />-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMusicDownloaderStore } from '@/store/music-downloader';
import { storeToRefs } from 'pinia';

const { fetchSingleDownload, fetchPlaylistDownload, fetchSingleVideo, fetchPlaylistVideo } = useMusicDownloaderStore();
const { url, downloadType, fileType, isLoading } = storeToRefs(useMusicDownloaderStore());
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
</script>

<style scoped>
.dashboard {
  background-color: #555353;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.v-btn {
  background-color: #121212;
  color: white;
  font-weight: bold;
}
</style>
