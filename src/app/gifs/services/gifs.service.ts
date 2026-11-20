import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GIFSearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  gifResponse: Gif[] = [];

  private _gifList: string[] = [];
  private apiKey: string = '43X918ryiHGzIEwOzaobrcnVHX2AId4U';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();

    if (this._gifList.length === 0) return;
    this.searchGif(this._gifList[0]);
  }

  get gifList(): string[] {
    return [...this._gifList];
  }

  private organizeGifList(gif: string) {
    gif = gif.toLowerCase();

    if (this._gifList.includes(gif)) {
      this._gifList = this._gifList.filter((g) => g !== gif);
    }

    this._gifList.unshift(gif);
    this._gifList = this.gifList.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('gifList', JSON.stringify(this._gifList));
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('gifList')) return;
    this._gifList = JSON.parse(localStorage.getItem('gifList') || '[]');
  }

  searchGif(tag: string): void {
    if (tag.length === 0) return;
    this.organizeGifList(tag);

    // OPCIÓN FETCH
    // fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=43X918ryiHGzIEwOzaobrcnVHX2AId4U&q=valorant&limit=10',
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data));

    //OPCIÓN ASYNC AWAIT
    // const res = await fetch(
    //   `https://api.giphy.com/v1/gifs/search?api_key=43X918ryiHGzIEwOzaobrcnVHX2AId4U&q=${tag}&limit=10`,
    // );
    // const data = await res.json();
    // console.log(data);

    //OPCIÓN HTTPClient
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<GIFSearchResponse>(`https://api.giphy.com/v1/gifs/search`, {
        params,
      })
      .subscribe((data) => {
        this.gifResponse = data.data;
      });
  }
}
