import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormBuilder } from '@angular/forms';
import { UsuarioService, Perfil } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) { 

    this.newUsuario = this.formBuilder.group({
      nombre: '',
      apellido: '',
      contraseña: '',
      usuario: '',
      idPerfil: null
    }); 
    
    this.usuarioService.getUsuarios().subscribe(
      {
        next: (data: any) => {
          this.usuarios = data;
          this.usuarios[0].perfil = data[0].perfil.nombre;
        }
      }
    )
  }

  Action: any;
  newUsuario: any;
  editUsuario: any;
  Modal: any;
  Id: any;
  usuarios: any;
  perfiles: Perfil[] = [];

  ngOnInit(): void {
  }

  save() {
    this.Modal?.toggle()
   }
  
  openModal(element: any, action: string, id: any) {
     
    this.Id = id;
    this.Action = action;
    this.Modal = new bootstrap.Modal(element,{} ) 
    this.Modal?.show()
  }

  onSubmit(Data: any) {

    this.newUsuario.reset();

    if(this.Action == 'Agregar')
      this.registrarUsuario(Data)
    
    if (this.Action == 'Editar')     
      this.editarUsuario(Data) 
  }

  registrarUsuario(user: any) {

    user.perfil = { idPerfil: user.idPerfil }
    console.log(user);
    this.usuarioService.createUsuario(user).subscribe({
      next: (data) => {  
        this.usuarios.push(user);
      },
      error: (e) => console.error(e)
    }); 
  }

  editarUsuario(user: any) {
    this.usuarioService.updateUsuario(user, this.Id).subscribe({
      next: (res) => {
        this.editUsuario = user;
      },
      error: (e) => console.error(e)
    })   
  }
}
