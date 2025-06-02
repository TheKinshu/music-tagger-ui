/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** CommonResponse */
export interface CommonResponse {
  /** Success */
  success: boolean;
}

/** DownloadBody */
export interface DownloadBody {
  /**
   * Output Path
   * @default "/tmp/"
   */
  outputPath?: string;
  /**
   * Resolution
   * @default "360p"
   */
  resolution?: string;
  /** Url */
  url: string;
}

/** ErrorEnum */
export enum ErrorEnum {
  Forbidden = 'forbidden',
  BadRequest = 'bad-request',
  UnprocessableEntity = 'unprocessable-entity',
  Unauthorized = 'unauthorized',
  ServerError = 'server-error',
  NotFound = 'not-found',
  UnknownError = 'unknown-error',
}

/** ErrorResponseModel */
export interface ErrorResponseModel {
  /** Detail */
  detail: string;
  error: ErrorEnum;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthStatus */
export interface HealthStatus {
  /** Status */
  status: boolean;
}

/** Lyrics */
export interface Lyrics {
  /** Lyrics */
  lyrics: string;
  /** Success */
  success: boolean;
}

/** LyricsRequest */
export interface LyricsRequest {
  /** Artist */
  artist: string;
  /** Song Title */
  songTitle: string;
  /** Url */
  url?: string | null;
}

/** LyricsTag */
export interface LyricsTag {
  /** Lyrics */
  lyrics: string;
  musicObject: MusicObject;
}

/** MusicList */
export interface MusicList {
  /** Music List */
  musicList: MusicObject[];
}

/** MusicObject */
export interface MusicObject {
  /** Album */
  album: string;
  /** Album Artist */
  albumArtist: string;
  /** Artist */
  artist: string;
  /** File Name */
  fileName: string;
  /** Genre */
  genre: string;
  /** Release Date */
  releaseDate: string | null;
  /** Title */
  title: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** WSMessage */
export interface WSMessage {
  /** Message Payload */
  messagePayload: WSMessagePayloadLog | WSMessagePayloadDownload | WSMessagePayloadProcess;
  /**
   * Message Type
   * @default "log"
   */
  messageType?: 'info' | 'error' | 'log' | 'link' | 'process';
}

/** WSMessagePayloadDownload */
export interface WSMessagePayloadDownload {
  /** Created At */
  createdAt: number;
  /** File Name */
  fileName: string;
  /** Link */
  link: string;
  /** Script Name */
  scriptName: string;
}

/** WSMessagePayloadLog */
export interface WSMessagePayloadLog {
  /** Message */
  message: string;
}

/** WSMessagePayloadProcess */
export interface WSMessagePayloadProcess {
  /** Is Running */
  isRunning: boolean;
  /**
   * Script Name
   * @default null
   */
  scriptName?: string | null;
}
