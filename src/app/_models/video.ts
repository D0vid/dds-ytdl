export class Video {

  public id : string;
  public title : string;
  public thumbnail : string;

  constructor(id : string, title : string, thumbnail : string) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
  }

  getUrl() : string {
    return `https://www.youtube.com/watch?v=${this.id}`;
  }
}
