import { acceptHMRUpdate, defineStore } from 'pinia';
import apiClient from '@/api';

interface State {
  url: string;
  downloadType: 'single' | 'playlist';
  fileType: 'music' | 'video';
  isLoading: boolean;
}

export const useMusicDownloaderStore = defineStore('musicDownloader', {
  state: (): State => ({
    url: '',
    downloadType: 'single',
    fileType: 'music',
    isLoading: false,
  }),
  actions: {
    async fetchSingleDownload() {
      await apiClient
        .singleDownload({
          url: this.url,
        })
        .then((response) => {
          console.log('Single download response', response);
        })
        .finally(() => {
          this.url = '';
          this.isLoading = false;
        });
    },
    async fetchPlaylistDownload() {
      await apiClient
        .playlistDownload({
          url: this.url,
        })
        .then((response) => {
          console.log('Single download response', response);
        })
        .finally(() => {
          this.url = '';
          this.isLoading = false;
        });
    },
    async fetchSingleVideo() {
      await apiClient
        .singleVideo({
          url: this.url,
        })
        .then((response) => {
          console.log('Single download response', response);
        })
        .finally(() => {
          this.url = '';
          this.isLoading = false;
        });
    },
    async fetchPlaylistVideo() {
      await apiClient
        .playlistVideo({
          url: this.url,
        })
        .then((response) => {
          console.log('Single download response', response);
        })
        .finally(() => {
          this.url = '';
          this.isLoading = false;
        });
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMusicDownloaderStore, import.meta.hot));
}
