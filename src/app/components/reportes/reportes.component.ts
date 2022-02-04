import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ProductosService } from 'src/app/services/productos.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  Modal: any;
  productos: any = [];
  ClienteAño: any = [];
  ClienteArray: any = [];
  productArray: any[] = [];

  constructor(private productosService: ProductosService, private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.productosMasVendidos();
    this.ClientePorAño();
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

  ClientePorAño() {
    let fila:any = {}
     this.clientesService.getClientePorAño().subscribe({
       next: (res) => {
         this.ClienteAño = res;
 
         for (let i in this.ClienteAño) {
            fila[i] = {
             nombre: this.ClienteAño[i][0],
             fecha: this.ClienteAño[i][2],
             total: this.ClienteAño[i][3]
            }
           this.ClienteArray.push(fila[i])
         }

         console.log(this.ClienteArray)
       }
     })
   }

}
