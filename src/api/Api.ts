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

import { CommonResponse, DownloadBody, ErrorResponseModel, HTTPValidationError, Lyrics, LyricsRequest, LyricsTag, MusicList, MusicObject } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags music
   * @name SingleDownload
   * @summary Single Download
   * @request POST:/api/v1/music/single-download
   */
  singleDownload = (data: DownloadBody, params: RequestParams = {}) =>
    this.request<CommonResponse, ErrorResponseModel | HTTPValidationError>({
      path: `/api/v1/music/single-download`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags music
   * @name PlaylistDownload
   * @summary Playlist Download
   * @request POST:/api/v1/music/playlist-download
   */
  playlistDownload = (data: DownloadBody, params: RequestParams = {}) =>
    this.request<CommonResponse, ErrorResponseModel | HTTPValidationError>({
      path: `/api/v1/music/playlist-download`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags music
   * @name SingleVideo
   * @summary Single Video Download
   * @request POST:/api/v1/music/single-download-video
   */
  singleVideo = (data: DownloadBody, params: RequestParams = {}) =>
    this.request<CommonResponse, ErrorResponseModel | HTTPValidationError>({
      path: `/api/v1/music/single-download-video`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags music
   * @name PlaylistVideo
   * @summary Playlist Video Download
   * @request POST:/api/v1/music/playlist-download-video
   */
  playlistVideo = (data: DownloadBody, params: RequestParams = {}) =>
    this.request<CommonResponse, ErrorResponseModel | HTTPValidationError>({
      path: `/api/v1/music/playlist-download-video`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags tagger
   * @name MusicList
   * @summary Music List
   * @request POST:/api/v1/tagger/list
   */
  musicList = (params: RequestParams = {}) =>
    this.request<MusicList, ErrorResponseModel>({
      path: `/api/v1/tagger/list`,
      method: 'POST',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags tagger
   * @name TagLyrics
   * @summary Tag Lyrics
   * @request POST:/api/v1/tagger/tag-lyrics
   */
  tagLyrics = (data: LyricsTag, params: RequestParams = {}) =>
    this.request<CommonResponse, ErrorResponseModel | HTTPValidationError>({
      path: `/api/v1/tagger/tag-lyrics`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags tagger
   * @name TagMusic
   * @summary Tag Music
   * @request POST:/api/v1/tagger/tag-music
   */
  tagMusic = (data: MusicObject, params: RequestParams = {}) =>
    this.request<CommonResponse, ErrorResponseModel | HTTPValidationError>({
      path: `/api/v1/tagger/tag-music`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags tagger
   * @name QueryMusic
   * @summary Query Music
   * @request POST:/api/v1/tagger/query-music
   */
  queryMusic = (data: MusicObject, params: RequestParams = {}) =>
    this.request<MusicObject[], ErrorResponseModel | HTTPValidationError>({
      path: `/api/v1/tagger/query-music`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Query lyrics for the given music object. :param artist: :param title: :return: Lyrics as a string.
   *
   * @tags tagger
   * @name QueryLyrics
   * @summary Query Lyrics
   * @request POST:/api/v1/tagger/query-lyrics
   */
  queryLyrics = (data: LyricsRequest, params: RequestParams = {}) =>
    this.request<Lyrics, ErrorResponseModel | HTTPValidationError>({
      path: `/api/v1/tagger/query-lyrics`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
