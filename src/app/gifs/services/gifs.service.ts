import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '2Z6bAI4ZoHVLQS4Pnx2vTpUEbUVlMo1T';
  private _historial : string[] = [];

  public resultados: Gif[] = [];
  
  constructor(private http: HttpClient){
    //Estas opción es rquivalente al las líneas que conforman el if.
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

    this.resultados = JSON.parse(localStorage.getItem('ultimaBusquedaGif')!) || [];
  }

  //Con este get puedo obtener una copia de los valores que haya en el historial.
  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }    

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2Z6bAI4ZoHVLQS4Pnx2vTpUEbUVlMo1T&q=${query}&limit=10`).subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;

      localStorage.setItem('ultimaBusquedaGif', JSON.stringify(this.resultados));
    })

    
  }
}
