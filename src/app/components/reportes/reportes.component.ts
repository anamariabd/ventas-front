import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  Modal: any;
  productos: any = [];
  productArray: any[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosMasVendidos();
  }

  openModal(element: any, action: any, id:any) {
    
    this.Modal = new bootstrap.Modal(element,{} ) 
    this.Modal?.show()

  }

  productosMasVendidos() {
   let fila:any = {}
    this.productosService.getProductosMasVendidos().subscribe({
      next: (res) => {
        this.productos = res;

        for (let i in this.productos) {
           fila[i] = {
            nombre: this.productos[i][0],
            total: this.productos[i][2],
            fecha: this.productos[i][3]
           }
          this.productArray.push(fila[i])
        }        
      }
    })
  }

}
