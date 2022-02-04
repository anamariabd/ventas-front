import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from 'src/app/services/productos.service';
import * as bootstrap from 'bootstrap';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: []
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  newProduct: any;
  editProduct: any;
  Id: any;
  Modal: any;
  submitted = false;
  Action: any;
  suscription: Subscription | undefined;

  constructor(private productosService: ProductosService, private formBuilder: FormBuilder) { 
    this.newProduct = this.formBuilder.group({
      nombre: '',
      estado: '' ,
      valorUnitario: null
    });    
  }

  ngOnInit(): void {
    this.listProductos();
    
  }
  
  openModal(element: any, action: any, id: any) {
    
    console.log(id)
    this.Id = id;
    this.Action = action;
    this.Modal = new bootstrap.Modal(element,{} ) 
    this.Modal?.show()

    if (action == 'Editar') {
       this.productosService.getProducto(id).subscribe({
         next: (data) => {
           this.editProduct = data;
           this.newProduct = this.formBuilder.group({
            nombre: this.editProduct.nombre,
            estado: this.editProduct.estado,
            valorUnitario: this.editProduct.valorUnitario
          });
         }
       })
    }
  }

  listProductos(): void {
    this.productosService.getProductos().subscribe(
      {
        next: (data) => {
          this.productos = data;
        }
      }
    )
  }

  agregarProducto(Data:any):void {
    this.productosService.createProducto(Data).subscribe({
      next: (data) => {  
        this.productos.push(Data);
      },
      error: (e) => console.error(e)
    });
  }

  editarProducto(Data: any) {
    this.productosService.updateProducto(Data, this.Id).subscribe({
      next: (res) => {
        this.editProduct = Data;
      },
      error: (e) => console.error(e)
    })
  }

  Buscar(data: any) {
    
    console.log(data)
    
  }

  onSubmit(Data: any) {

    this.newProduct.reset();

    if(this.Action == 'Agregar')
      this.agregarProducto(Data)
    
    if (this.Action == 'Editar')     
      this.editarProducto(Data)
  }
}
