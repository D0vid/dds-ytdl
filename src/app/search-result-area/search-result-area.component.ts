import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Video } from '../_models/video';
import { TokenHandler } from '../_services/token-handler';
import { YoutubeDataAPI } from 'youtube-v3-api';

interface InputChange extends SimpleChange {
  searchtoken?: SimpleChange;
}

@Component({
  selector: 'app-search-result-area',
  templateUrl: './search-result-area.component.html',
  styleUrls: ['./search-result-area.component.scss']
})

export class SearchResultAreaComponent implements OnInit {

  @Input() searchtoken : string;
  result : Video[] = [];
  message : string = "";
  api = new YoutubeDataAPI(environment.API_KEY);

  constructor(private handler : TokenHandler) { }

  ngOnInit() {
    this.message = '';
  }

  ngOnChanges(changes : InputChange) {

    this.message = '';
    let token: string = changes.searchtoken.currentValue;
    this.result = [];

    if (this.handler.tokenIsVideoUrl(token)) {
      this.searchByToken(this.handler.extractVideoId(token),1);
    } else if (this.handler.tokenIsPlaylistUrl(token)) {
      this.searchPlaylist(this.handler.extractPlaylistId(token));
    } else if (this.handler.tokenIsText(token)) {
      this.searchByToken(token,21);
    }
  }

  searchPlaylist(id : string) {
    this.api.searchPlaylistItems(id,50).then((data : any) => {
      data.items.forEach(vid => {
        this.result.push(new Video(vid.id.videoId,vid.snippet.title, vid.snippet.thumbnails.medium.url));
      });
      if (this.result.length == 0) { this.message = "No result found"}
    }).catch(() => this.message = "An error occured during the search operation");
  }

  searchByToken(token : string, maxresults : number) {
    this.api.searchAll(token, maxresults,{type:'video'}).then((data : any) => {
      data.items.forEach(vid => {
        this.result.push(new Video(vid.id.videoId,vid.snippet.title, vid.snippet.thumbnails.medium.url));
      });
      if (this.result.length == 0) { this.message = "No result found"}
    }).catch(() => this.message = "An error occured during the search operation");
  }

  goToVideo(video : Video) {
    window.open(video.getUrl(), '_blank');
  }

  download(video : Video) {
    let title = video.title.replace(new RegExp(/[^\w]/g),' ').replace(new RegExp(/[ ]{2,}/g),' ');
    window.location.href = `${environment.SERVER_URL}/download?URL=${video.getUrl()}&title=${title}`;
  }
}
