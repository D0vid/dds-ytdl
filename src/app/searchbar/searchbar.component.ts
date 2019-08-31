import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  searchtoken : string = "";

  constructor() { }

  ngOnInit() {

    const options = {
      q:'nodejs',
      part:'snippet',
      type:'video'
    }
  }

  updateSearchToken(newValue) : void {
    this.searchtoken = newValue.value;
  }

  loadClipboardContent() {
    let clipboardData = window['clipboardData'];
    console.log(clipboardData);
  }
}
