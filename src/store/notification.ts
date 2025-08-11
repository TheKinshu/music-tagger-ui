import { acceptHMRUpdate, defineStore } from 'pinia';

interface State {
  isVisible: boolean;
}

export const useNotificationStore = defineStore('notification', {
  state: (): State => ({
    isVisible: false,
  })
});