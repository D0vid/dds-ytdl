export class Video {

  public id : string;
  public title : string;
  public thumbnail : string;
  public duration : string;

  constructor(id : string, title : string, thumbnail : string, duration : string) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.duration = duration.startsWith('00:') ? duration.substring(3) : duration;
  }

  getUrl() : string {
    return `https://www.youtube.com/watch?v=${this.id}`;
  }
}
