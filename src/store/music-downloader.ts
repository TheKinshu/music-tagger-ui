import { acceptHMRUpdate, defineStore } from 'pinia';
import apiClient from '@/api';
import { WSMessage } from '@/api/data-contracts';
import { isPayloadLog } from '@/types';

interface OutputLogEntry {
  type: 'info' | 'error' | 'log';
  message: string;
}

interface State {
  url: string;
  downloadType: 'single' | 'playlist';
  fileType: 'music' | 'video';
  isLoading: boolean;
  outputLog: OutputLogEntry[];

}

export const useMusicDownloaderStore = defineStore('musicDownloader', {
  state: (): State => ({
    url: '',
    downloadType: 'single',
    fileType: 'music',
    isLoading: false,
    outputLog: [],
  }),
  actions: {
    onWebsocketMessageLog(message: WSMessage) {
      if (message.messageType === 'log' || message.messageType === 'error' || message.messageType === 'info') {
        const payload = message.messagePayload;
        if (isPayloadLog(payload)) {
          this.outputLog.push({ type: message.messageType, message: payload.message });
          console.log(this.outputLog)
        }
      }
    },
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
