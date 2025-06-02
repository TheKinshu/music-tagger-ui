import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { WebSocketService } from '@/socket';
import { WSMessage } from '@/api/data-contracts';
import { isPayloadProcess } from '@/types';

interface State {
  isError: boolean;
  errorMessage: string;
  errorCode: string;
  isLoading: boolean;
  isBusy: boolean;
  isOnline: boolean;
  isProcessRunning: boolean;
  componentKey: number;
  theme: 'dark' | 'light';
  ws: null | WebSocketService;
}

export const useAppStore = defineStore('appStore', {
  state: (): State => ({
    isError: false,
    errorMessage: '',
    errorCode: '',
    isLoading: true,
    isBusy: false,
    isOnline: false,
    isProcessRunning: false,
    componentKey: 0,
    theme: 'dark',
    ws: null,
  }),
  actions: {
    onWebsocketConnected() {
      this.isOnline = true;
    },
    onWebsocketDisconnected() {
      this.isOnline = false;
    },
    onWebsocketMessageProcess(message: WSMessage) {
      if (message.messageType === 'process') {
        const payload = message.messagePayload;
        if (isPayloadProcess(payload)) {
          this.isProcessRunning = payload.isRunning;
          // const scriptName = payload.scriptName;
          // const { selectedScriptName } = storeToRefs(useScriptListStore());
          // const { currentTab } = storeToRefs(useScriptDashboardStore());
          // if (this.isProcessRunning && scriptName) {
          //   currentTab.value = 'script';
          //   console.log('>>> Setting currentTab to script');
          //   if (selectedScriptName.value !== scriptName) {
          //     selectedScriptName.value = scriptName;
          //   }
          // }
        }
      }
    },
  },
  // persist: {
  //   storage: localStorage,
  //   paths: ['theme'],
  // },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
