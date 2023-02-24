import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  
  constructor(private gifsService: GifsService) {}
  
  get hist() {   
    return this.gifsService.historial;
  }

  buscar(query: any) {
    this.gifsService.buscarGifs(query);
  }
}
