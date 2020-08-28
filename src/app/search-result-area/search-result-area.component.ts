import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Video } from '../_models/video';
import { SearchService } from '../_services/search-service';
import { TokenHandler } from '../_services/token-handler';

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
  loading : number = 0;
  loadingHeight : number = 0;
  downloadUrl : string = `${environment.SERVER_URL}/download/`;

  constructor(private searchService : SearchService, private handler : TokenHandler) { }

  ngOnInit() {
    this.message = '';
  }

  ngOnChanges(changes : InputChange) {

    this.message = '';
    let token: string = changes.searchtoken.currentValue;
    this.result = [];
    if (token != "") {
      this.loading = 0.3;
      this.loadingHeight = 200;
    }
    if (this.handler.tokenIsPlaylistUrl(token)) {
      this.searchByPlaylistId(this.handler.extractPlaylistId(token));
    } else if (this.handler.tokenIsVideoUrl(token)) {
      this.searchByVideoId(this.handler.extractVideoId(token));
    } else if (this.handler.tokenIsText(token)) {
      this.searchByToken(token);
    }
  }

  searchByPlaylistId(id : string) {
    this.searchService.getSearchResultsForPlaylist(id).subscribe((data : any) => {
      data.forEach(vid => this.result.push(new Video(vid.Id.Value,vid.Title, vid.Thumbnails.MediumResUrl)));
      if (this.result.length == 0) this.message = "No result found";
      this.loading = 0;
      this.loadingHeight = 0;
    },
    error => {
      this.message = "Couldn't conduct search succesfully";
      this.loading = 0;
      this.loadingHeight = 0;
    });
  }

  searchByVideoId(id : string) {
    this.searchService.getSearchResultsForVideo(id).subscribe((data : any) => {
      this.result.push(new Video(data.Id.Value,data.Title, data.Thumbnails.MediumResUrl));
      if (this.result.length == 0) this.message = "No result found";
      this.loading = 0;
      this.loadingHeight = 0;
    },
    error => {
      this.message = "Couldn't conduct search succesfully";
      this.loading = 0;
      this.loadingHeight = 0;
    });
  }

  searchByToken(token : string) {
    this.searchService.getSearchResultsForToken(token).subscribe((data : any) => {
      data.forEach(vid => this.result.push(new Video(vid.Id.Value,vid.Title, vid.Thumbnails.MediumResUrl)));
      if (this.result.length == 0) this.message = "No result found";
      this.loading = 0;
      this.loadingHeight = 0;
    },
    error => {
      this.message = "Couldn't conduct search succesfully";
      this.loading = 0;
      this.loadingHeight = 0;
    });
  }

  goToVideo(video : Video) {
    window.open(video.getUrl(), '_blank');
  }
}
