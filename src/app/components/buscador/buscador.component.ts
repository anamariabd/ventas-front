import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
})
export class BuscadorComponent implements OnInit {

  @Input() buscarPalabra: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  Buscar(data: any) {
    
    console.log(data)
    
  }

}
