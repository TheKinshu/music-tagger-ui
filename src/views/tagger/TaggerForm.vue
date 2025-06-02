<template>
  <v-card height="300px">
    <v-card-title>Tagger</v-card-title>
    <div class="pa-2">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        <v-row>
          <v-col>
            <v-text-field v-model="title" :disabled="isLoading" :loading="isLoading" label="Title" variant="outlined" clearable></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="artist" :disabled="isLoading" :loading="isLoading" label="Artist" variant="outlined" clearable></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="albumArtist" :disabled="isLoading" :loading="isLoading" label="Album Artist" variant="outlined" clearable></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="album" :disabled="isLoading" :loading="isLoading" label="Album" variant="outlined" clearable></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="genre" :disabled="isLoading" :loading="isLoading" label="Genre" variant="outlined" clearable></v-text-field>
          </v-col>
          <v-col>
            <v-date-input clearable variant="outlined" v-model="releaseDate" :disabled="isLoading" :loading="isLoading" label="Release Date"></v-date-input>
          </v-col>
        </v-row>
      </v-form>
      <v-btn width="100%" color="primary" @click="applyChanges">Apply Changes</v-btn>

    </div>
  </v-card>
</template>
<script setup lang="ts">
import { MusicObject } from '@/api/data-contracts';
import { ref, watch } from 'vue';
import { VForm } from 'vuetify/components';
import { storeToRefs } from 'pinia';
import { useMusicTaggerStore } from '@/store/music-tagger';

const { isLoading, title, artist, album, genre, releaseDate, albumArtist, fileName } = storeToRefs(useMusicTaggerStore());
const { applyMusicTagger, resetMusicTagger, fetchMusicList } = useMusicTaggerStore();
const form = ref<VForm | null>(null);

const props = defineProps<{
  musicObject: MusicObject | null;
}>();

const isFormValid = ref<boolean>(true);

watch(
  () => props.musicObject,
  (newVal) => {
    if (newVal) {
      fileName.value = newVal.fileName;
      title.value = newVal.title || '';
      artist.value = newVal.artist || '';
      album.value = newVal.album || '';
      albumArtist.value = newVal.albumArtist || '';
      genre.value = newVal.genre || '';
      if (newVal.releaseDate) {
        releaseDate.value = new Date(newVal.releaseDate);
      } else {
        releaseDate.value = new Date();
      }
    }
  },
  { immediate: true }
);

async function applyChanges() {
  isLoading.value = true;
  await form.value?.validate();

  if (!isFormValid.value) {
    isLoading.value = false;
    return;
  }

  await applyMusicTagger();
  await fetchMusicList();
  resetMusicTagger();
}
</script>

<style scoped></style>
