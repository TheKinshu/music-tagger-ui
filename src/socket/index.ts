import { WSMessage } from '@/api/data-contracts';
import { camelize } from '@/utils';

export class WebSocketService {
  private ws: WebSocket | null = null;

  private userId: string;
  private retry: boolean;
  private reconnectTimeout: number;
  private shouldReconnect = true;

  private openHandlers: Array<() => void> = [];
  private closeHandlers: Array<(event: CloseEvent) => void> = [];
  private messageHandlers: Array<(event: WSMessage) => void> = [];
  private errorHandlers: Array<(event: Event) => void> = [];

  constructor(userId: string, retry = true, reconnectTimeout = 5000) {
    this.userId = userId;
    this.retry = retry;
    this.reconnectTimeout = reconnectTimeout;
    this.connect();
  }

  private connect(): void {
    console.log(`${import.meta.env.VITE_APP_WS_URL}/ws/console/${this.userId}`);
    const wsUrl = `${import.meta.env.VITE_APP_WS_URL}/ws/console/${this.userId}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('[ws]: WebSocket connection established');
      this.openHandlers.forEach((handler) => handler());
    };

    this.ws.onmessage = (event) => {
      console.log('[ws]: WebSocket message received:', event.data);
      const parsedData = JSON.parse(event.data);
      //this.outputLog.value.push({ type: parsedData.message_type, message: parsedData.message });
      this.messageHandlers.forEach((handler) => handler(camelize(parsedData)));
    };

    this.ws.onerror = (error) => {
      console.error('[ws]: WebSocket error:', error);
      this.errorHandlers.forEach((handler) => handler(error));
    };

    this.ws.onclose = (ev: CloseEvent) => {
      console.log('[ws]: WebSocket connection closed');
      this.closeHandlers.forEach((handler) => handler(ev));
      this.ws = null;
      if (this.retry && this.shouldReconnect) {
        console.log(`[ws]: Retrying WebSocket connection in ${this.reconnectTimeout}ms...`);
        setTimeout(() => this.connect(), this.reconnectTimeout);
      }
    };
  }

  public close(): void {
    this.shouldReconnect = false;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }

  public addHandler(event: 'open' | 'close' | 'message' | 'error', handler: (...args: any[]) => void): void {
    switch (event) {
      case 'open':
        this.openHandlers.push(handler as () => void);
        break;
      case 'close':
        this.closeHandlers.push(handler as () => void);
        break;
      case 'message':
        this.messageHandlers.push(handler as (event: WSMessage) => void);
        break;
      case 'error':
        this.errorHandlers.push(handler as (event: Event) => void);
        break;
      default:
        throw new Error(`[ws]: Unsupported event: ${event}`);
    }
  }

  public removeHandler(event: 'open' | 'close' | 'message' | 'error', handler: (...args: any[]) => void): void {
    switch (event) {
      case 'open':
        this.openHandlers = this.openHandlers.filter((h) => h !== handler);
        break;
      case 'close':
        this.closeHandlers = this.closeHandlers.filter((h) => h !== handler);
        break;
      case 'message':
        this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
        break;
      case 'error':
        this.errorHandlers = this.errorHandlers.filter((h) => h !== handler);
        break;
      default:
        throw new Error(`[ws]: Unsupported event: ${event}`);
    }
  }
}
