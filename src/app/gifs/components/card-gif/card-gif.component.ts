import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card-gif',
  templateUrl: './card-gif.component.html',
  styleUrl: './card-gif.component.css',
})
export class CardGifComponent implements OnInit {
  @Input() gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) {
      throw new Error('Gif is required');
    }
  }
}
