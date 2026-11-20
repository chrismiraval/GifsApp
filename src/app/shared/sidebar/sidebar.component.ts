import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get gifs(): string[] {
    return this.gifsService.gifList;
  }

  onGifClick(gif: string) {
    this.gifsService.searchGif(gif);
  }
}
