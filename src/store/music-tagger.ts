import { acceptHMRUpdate, defineStore } from 'pinia';
import apiClient from '@/api';
import { MusicObject } from '@/api/data-contracts';

interface State {
  isLoading: boolean;
  title: string;
  artist: string;
  album: string;
  genre: string;
  releaseDate: Date;
  albumArtist: string;
  fileName: string;
  musicList: MusicObject[];
  queryList: MusicObject[];
  lyricUrl: string;
  lyrics: string;
}

export const useMusicTaggerStore = defineStore('musicTagger', {
  state: (): State => ({
    isLoading: false,
    title: '',
    artist: '',
    album: '',
    genre: '',
    releaseDate: new Date(),
    albumArtist: '',
    fileName: '',
    musicList: [],
    queryList: [],
    lyricUrl: '',
    lyrics: '',
  }),
  actions: {
    async fetchMusicList() {
      console.log('fetchMusicList');
      await apiClient
        .musicList()
        .then((response) => {
          console.log('fetchMusicList', response);
          const { musicList } = response.data;
          console.log(response.data);
          this.musicList = musicList;
        })
        .catch((error) => {
          console.error('Error fetching music list:', error);
        });
    },

    async applyMusicTagger() {
      await apiClient
        .tagMusic({
          title: this.title,
          artist: this.artist,
          album: this.album,
          genre: this.genre,
          releaseDate: this.releaseDate.toISOString().split('T')[0],
          albumArtist: this.albumArtist,
          fileName: this.fileName,
        })
        .then()
        .finally(() => (this.isLoading = false));
    },
    async applyLyrics(selectedMusic: MusicObject) {
      await apiClient.tagLyrics({
        lyrics: this.lyrics,
        musicObject: selectedMusic
      })

    },
    async getMusicQuery(selectedMusic: MusicObject) {
      await apiClient
        .queryMusic({
          album: selectedMusic.album,
          artist: selectedMusic.artist,
          genre: selectedMusic.genre,
          releaseDate: selectedMusic.releaseDate,
          title: selectedMusic.title,
          albumArtist: selectedMusic.albumArtist,
          fileName: selectedMusic.fileName,
        })
        .then((response) => {
          console.log('getMusicQuery', response);
          console.log(response.data);
          this.queryList = response.data;
        })
        .finally(() => (this.isLoading = false));
    },
    async fetchLyrics(selectedMusic: MusicObject) {
      console.log('url', this.lyricUrl);
      await apiClient.queryLyrics({
        artist: selectedMusic.artist,
        songTitle: selectedMusic.title,
        url: this.lyricUrl
      }).then((response) => {
        const { lyrics } = response.data;
        this.lyrics = lyrics;
        console.log('getLyrics', response);
      })
    },
    resetMusicTagger() {
      this.isLoading = false;
      this.title = '';
      this.artist = '';
      this.album = '';
      this.genre = '';
      this.releaseDate = new Date();
      this.albumArtist = '';
    },
  },
});
