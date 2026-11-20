import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css',
})
export class LazyImageComponent implements OnInit {
  @Input() src!: string;
  @Input() alt: string = '';

  isLoading: boolean = true;

  ngOnInit(): void {
    if (!this.src) throw new Error('url is required');
  }

  onLoad() {
    this.isLoading = false;
  }
}
