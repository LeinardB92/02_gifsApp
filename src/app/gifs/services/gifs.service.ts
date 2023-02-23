import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '2Z6bAI4ZoHVLQS4Pnx2vTpUEbUVlMo1T';
  private _historial : string[] = [];

  public resultado: Gif[] = [];
  
  constructor(private http: HttpClient){}

  //Con este get puedo obtener una copia de los valores que haya en el historial.
  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }    

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2Z6bAI4ZoHVLQS4Pnx2vTpUEbUVlMo1T&q=${query}&limit=10`).subscribe((resp) => {
      console.log(resp.data);
      this.resultado = resp.data;
    })
  }
}
