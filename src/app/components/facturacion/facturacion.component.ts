import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from 'src/app/services/productos.service';
import { ClientesService, Cliente, TipoIdentificacion } from 'src/app/services/clientes.service';
import { FacturaService, Factura, Detalles } from 'src/app/services/factura.service';
import * as bootstrap from 'bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styles: [
  ]
})
export class FacturacionComponent implements OnInit {
  
  // para formBuilder
  addProduct: any; 
  selectCliente: any; 

  //para listar opciones
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  tipoIdent: TipoIdentificacion[] = [];
  //para la api
  cliente: any; 
  factura: Factura = {}
  productoFact: any;
  productosFact:any = [];

  //de la template
  Total: number = 0;
  Modal: any;
  TipoConsulta: string = '';
  
  constructor(private productosService: ProductosService,
    private clienteService: ClientesService,
    private facturaService: FacturaService,
    private formBuilder: FormBuilder) {
    
      this.addProduct = this.formBuilder.group({
        id: null,
        cantidad: ''
      });   
    this.selectCliente = this.formBuilder.group({
      cliente: null,
      tipo_identificacion: ''
    });   
  }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({ next: (data) => this.productos = data})
    this.clienteService.getClientes().subscribe({ next: (data) => this.clientes = data})
    this.clienteService.getTiposIdentificacion().subscribe({ next: (data => this.tipoIdent = data) })
    if (localStorage.getItem('Productos') && !this.productoFact){
      this.productosFact = JSON.parse(localStorage.getItem('Productos')!.toString())
      for (let i in this.productosFact) {
        this.Total += this.productosFact[i].total
      } 
    }
    if (localStorage.getItem('Cliente') && !this.cliente)
      this.cliente = JSON.parse(localStorage.getItem('Cliente')!.toString())
  }

  openModal(element: any, tipo: string) {
  
    this.TipoConsulta = tipo;
    this.Modal = new bootstrap.Modal(element,{} ) 
    this.Modal?.show()
  }

  onSubmitProduct(Data: any) {

    this.productosService.getProducto(Data.id).subscribe(
      {
        next: (res) => {
          this.productoFact = res;       
          this.productoFact.cantidad = Data.cantidad;
          this.productoFact.total = Data.cantidad * this.productoFact.valorUnitario;
               
        //  if (localStorage.getItem('Productos')) {
            this.productosFact.push(this.productoFact)
            this.Total += this.productoFact.total
          
          localStorage.setItem('Productos', JSON.stringify(this.productosFact));
        }
      }
    )
  }

  onSubmitClient(Data: any) {

    this.clienteService.getCliente(Data.cliente).subscribe(
      {
        next: (res) => {
          this.cliente = res;   
          if( !localStorage.getItem('Cliente') ) {
            localStorage.setItem('idCliente', this.cliente.cliente)    
            localStorage.setItem('Cliente', JSON.stringify(this.cliente));
          }
        },
        error: (e) => {
          delete this.cliente;
          alert("El cliente no ha sido encontrado")
        }
      }
    )
    this.selectCliente.reset();
  }

  GuardarFactura() {
    console.log(localStorage.getItem('Cliente'))
    var id:number = +localStorage.getItem('idCliente')!

    var idCliente = {cliente: id};

    this.factura = {cliente: idCliente}

    var factDetalles: Detalles = {}
  
    this.facturaService.createFactura(this.factura).subscribe(
      {
        next: (data) => { console.log(data.consecutivo)
          for (let i in this.productosFact) {

              factDetalles = {
              consecutivo: { consecutivo: data.consecutivo},
              idProducto: { id: this.productosFact[i].id },
              valorUnitario: this.productosFact[i].total,
              cantidad: this.productosFact[i].cantidad
               }
               this.facturaService.createDetalles(factDetalles).subscribe(
              { error: (e) => alert("Error") }
            ) 
          } 
          if (factDetalles) {
            alert("Facturización realizada");
            localStorage.removeItem('Productos');
            this.productosFact = [];
            this.Total = 0;
          } 
        },
        error: (e) => { console.error(e); console.info("ERROR")}
      });

 }

  eliminarItem(index: any) {
    var List = JSON.parse(localStorage.getItem('Productos')!.toString());

    for (let i in List) { 
      if( List[i].id == index ){
        console.log(List[i])  
        List.splice(i, 1)
      }
    }

    this.Total -= this.productoFact.total
    this.productosFact = List;
    localStorage.setItem('Productos', JSON.stringify(List));    
     this.productosFact = JSON.parse(localStorage.getItem('Productos')!.toString());
  }
}
