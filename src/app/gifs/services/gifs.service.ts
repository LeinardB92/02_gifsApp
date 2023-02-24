import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '2Z6bAI4ZoHVLQS4Pnx2vTpUEbUVlMo1T';
  private servicioUrl: string = "https://api.giphy.com/v1/gifs"; 
  private _historial: string[] = [];

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

    const param = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', 10)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: param}).subscribe((resp) => {
      
      console.log(resp.data);
      this.resultados = resp.data;

      localStorage.setItem('ultimaBusquedaGif', JSON.stringify(this.resultados));
    })

    
  }
}
