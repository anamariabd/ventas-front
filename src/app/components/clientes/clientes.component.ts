import { Component, OnInit} from '@angular/core';
import { ClientesService, Cliente, TipoIdentificacion } from 'src/app/services/clientes.service';
import * as bootstrap from 'bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  
  clientes: any;
  TipoIdent: TipoIdentificacion = {} ;
  newCliente: any;
  editCliente: any;
  Modal: any;
  formCliente: any;
  Action: any;
  Id: any;

  constructor(private clienteService: ClientesService, private formBuilder: FormBuilder) { 
    this.formCliente = this.formBuilder.group({
      tipo_identificacion: null,
      identificacion: '',
      razonSocial:''
  });  
  }

  ngOnInit(): void {
    this.listClientes()
  }

  listClientes(): void {
    this.clienteService.getClientes().subscribe(
      {
        next: (data) => {
          this.clientes = data;

          for (let i in this.clientes)
            this.clientes[i].tipoIden = this.clientes[i].t_identificacion.abreviatura;
          
        }
      }
    )
  }

  agregarCliente(cliente:Cliente):void {
    this.clienteService.createCliente(cliente).subscribe({
      next: (data) => {  
        this.clientes.push(cliente);
      },
      error: (e) => console.error(e)
    });
  }

  editarCliente(cliente: Cliente):void {
    this.clienteService.updateCliente(cliente, this.Id).subscribe({
      next: (res:any) => {
        this.editCliente = cliente;
      },
      error: (e) => console.error(e)
    })
  }
  
  openModal(element: any, action: any, id:any) {
    
    this.Action = action;
    this.Modal = new bootstrap.Modal(element,{} ) 
    this.Modal?.show()

    if (action == 'Editar') {
      this.clienteService.getCliente(id).subscribe({
        next: (data) => {
          this.editCliente = data;
          this.formCliente = this.formBuilder.group({
            tipo_identificacion: this.editCliente.t_identificacion.tipo_identificacion,
            identificacion: this.editCliente.identificacion,
            razonSocial:this.editCliente.razonSocial
         });
        }
      })
   }
  }

  onSubmit(Data: any) {

    console.log(Data);
   // this.newCliente.reset();
    this.TipoIdent = {
      tipo_identificacion: Data.tipo_identificacion
    }

    this.newCliente = { 
      t_identificacion: this.TipoIdent,
      identificacion: Data.identificacion,
      razonSocial: Data.razonSocial
    };

    if(this.Action == 'Agregar')
      this.agregarCliente(this.newCliente)
    
    if (this.Action == 'Editar')     
      this.editarCliente(this.newCliente)
    this.formCliente.reset();
  }
}
