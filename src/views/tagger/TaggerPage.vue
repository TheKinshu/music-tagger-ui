<template>
  <v-sheet class="taggerContainer pa-3" rounded>
    <v-row>
      <v-col cols="4">
        <v-card height="400px">
          <v-card-title>Music List</v-card-title>
          <div class="pa-2"  style="max-height: 300px; overflow-y: auto;">

            <v-list color="primary">
              <v-list-item-group v-model="selectedMusic">
                <v-list-item
                  v-for="(item, index) in musicList"
                  :key="index"
                  :value="item"
                  :active="selectedMusic === item"
                  :disabled="isLoading"
                  @click="() => { if (!isLoading) fetchMusicQuery(item) }"
                >
                  <v-row>
                    <v-col cols="10">
                      <v-list-item-title class="tfas" v-text="item.fileName"></v-list-item-title>

                    </v-col>
                    <v-col cols="2">
                      <v-btn
                        class="copyIcon"
                        icon
                        @click.stop="onCopyToClipboard(item.fileName)"
                        :disabled="isLoading"
                      >
                        <v-icon>mdi-content-copy</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list-item-group>
            </v-list>

          </div>

        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="400px">
          <v-card-title>Online query</v-card-title>
          <div class="pa-2"  style="max-height: 300px; overflow-y: auto;">
            <v-list color="primary" :disabled="isLoading">
              <v-list-item-group v-model="selectedQuery">
                <v-list-item v-for="(item, index) in queryList" :key="index" :value="item" :active="selectedQuery === item" @click="onClickQuery(item)">
                  <v-list-item-title>{{ item.title }} - {{ item.artist }}</v-list-item-title>

                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="400px">
          <v-card-title>Lyrics</v-card-title>
          <v-text-field v-model="lyricUrl" :loading="isLoading"></v-text-field>
          <v-btn width="100%" color="primary" @click="onClickQuery(selectedMusic)" :loading="isLoading">Fetch Lyrics</v-btn>
          <div class="pa-2"  style="max-height: 400px; overflow-y: auto;">
            <v-textarea v-model="lyrics"></v-textarea>
          </div>
          <v-btn width="100%" color="primary" @click="onApplyLyrics">Save Lyrics</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TaggerForm :music-object="selectedMusic" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import TaggerForm from '@/views/tagger/TaggerForm.vue';
import { MusicObject } from '@/api/data-contracts';
import { useMusicTaggerStore } from '@/store/music-tagger';

const { musicList, queryList, isLoading, lyricUrl, lyrics} = storeToRefs(useMusicTaggerStore());
const { fetchMusicList, getMusicQuery, fetchLyrics, applyLyrics } = useMusicTaggerStore();
const selectedMusic = ref<MusicObject>({
  title: '',
  artist: '',
  album: '',
  albumArtist: '',
  genre: '',
  releaseDate: '',
  fileName: '',
  lyrics: ''
});
const selectedQuery= ref<MusicObject>({
  title: '',
  artist: '',
  album: '',
  albumArtist: '',
  genre: '',
  releaseDate: '',
  fileName: '',
  lyrics: ''
});

async function fetchMusicQuery(musicObj: MusicObject) {
  if (musicObj.lyrics)
    lyrics.value = musicObj.lyrics;
  isLoading.value = true;
  selectedMusic.value = musicObj;
  await getMusicQuery(selectedMusic.value)
}

async function onClickQuery(musicObj: MusicObject) {
  if (musicObj.title === '' || musicObj.artist === '') {
    alert('Please select a music from the list before searching');
    return;
  }

  isLoading.value = true;
  selectedMusic.value = musicObj;

  console.log(selectedQuery.value);
  await fetchLyrics(selectedMusic.value).finally(
    () => {
      lyricUrl.value = '';
      isLoading.value = false;
    }
  );

}

async function onApplyLyrics() {
  if (lyricUrl.value === '') {
    alert('Please enter a valid URL for the lyrics');
    return;
  }
  isLoading.value = true;
  try {
    await applyLyrics(selectedMusic.value);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  } finally {
    lyrics.value = '';
    isLoading.value = false;
  }
}

function onCopyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Error copying text: ', err);
  });
}

onMounted(async () => {
  await fetchMusicList();
});
</script>

<style scoped>
.taggerContainer {
  background-color: #605757;
}
.copyIcon {
  width: 1px;
  height: auto;
}

</style>
