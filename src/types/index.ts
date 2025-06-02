import { WSMessagePayloadDownload, WSMessagePayloadLog, WSMessagePayloadProcess } from '@/api/data-contracts';

export interface DataTableHeader<T> {
  key: keyof T | 'actions';
  title: string;
  colspan?: number;
  rowspan?: number;
  fixed?: boolean;
  align?: 'end' | 'start' | 'center';
  width?: number;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  sort?: (a: any, b: any) => number;
}

export interface ViewTableOptions {
  page: number;
  itemsPerPage: number;
  sortBy: { key: string; order: 'asc' | 'desc' }[];
}

type SortByItem = {
  key: string;
  order?: boolean | 'asc' | 'desc';
};

export interface ListState<T> {
  tableItems: T[];
  totalTableItems: number;
  tableItemsPerPage: number;
  tableSortBy: SortByItem[];
  tablePageNumber: number;
  isTableListLoading: boolean;
  tableAbortController: AbortController | null;
  tableKey: number;
}

export interface ListStateDeposit<T> {
  depositTableItems: T[];
  depositTotalTableItems: number;
  depositTableItemsPerPage: number;
  depositTableSortBy: SortByItem[];
  depositTablePageNumber: number;
  isDepositTableListLoading: boolean;
  depositTableAbortController: AbortController | null;
  depositTableKey: number;
}

export interface menuOption {
  title: string;
  to: {
    name: string;
  };
  icon: string;
}

export function isPayloadDownload(payload: WSMessagePayloadDownload | WSMessagePayloadLog | WSMessagePayloadProcess): payload is WSMessagePayloadDownload {
  return (payload as WSMessagePayloadDownload).link !== undefined;
}

export function isPayloadLog(payload: WSMessagePayloadDownload | WSMessagePayloadLog | WSMessagePayloadProcess): payload is WSMessagePayloadLog {
  return (payload as WSMessagePayloadLog).message !== undefined;
}

export function isPayloadProcess(payload: WSMessagePayloadDownload | WSMessagePayloadLog | WSMessagePayloadProcess): payload is WSMessagePayloadProcess {
  return (payload as WSMessagePayloadProcess).isRunning !== undefined;
}
