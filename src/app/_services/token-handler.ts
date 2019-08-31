import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenHandler {

  videoRegex : RegExp = new RegExp(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\\-\\_]*)(&(amp;)?[\w\?‌​=]*)?/);
  playlistRegex : RegExp = new RegExp(/http(?:s?):\/\/(?:www\.)?youtube\.com\/playlist\?list=(.+)/);

  constructor() {}

  tokenIsVideoUrl(token : string) : boolean {
    return this.videoRegex.test(token);
  }

  tokenIsPlaylistUrl(token : string) : boolean {
    return this.playlistRegex.test(token);
  }

  tokenIsText(token : string) : boolean {
    return token != "";
  }

  extractVideoId(url : string) : string {
    if (this.tokenIsVideoUrl(url)) {
      return url.match(this.videoRegex)[1];
    }
    return "";
  }

  extractPlaylistId(url : string) : string {
    if (this.tokenIsPlaylistUrl(url)) {
      return url.match(this.playlistRegex)[1];
    }
    return "";
  }
}
