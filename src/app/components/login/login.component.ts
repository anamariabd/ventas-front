import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from "@angular/router"
import { TokenService } from 'src/app/services/token.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: any;
  newUsuario: any;
  usuarios: any;
  Modal: any;

  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private tokenService: TokenService) {
    this.loginUser = this.formBuilder.group({
    username: '',
    password: '' 
    });

    this.newUsuario = this.formBuilder.group({
      nombre: '',
      apellido: '',
      contraseña: '',
      usuario: '',
      idPerfil: null
    }); 
  }

  ngOnInit(): void {
  }
  openModal(element: any) {
     
    this.Modal = new bootstrap.Modal(element,{} ) 
    this.Modal?.show()
  }
  onSubmit(usuario: any) {
    
    this.usuarioService.loginUsuario(usuario).subscribe(
      {
        next: (data) => {
          this.tokenService.setToken(data.accessToken)
          localStorage.setItem('perfil', data.perfil)

          if(data.perfil == 'Cajero'){
            this._router.navigate(['/facturacion']);
          }
          if(data.perfil == 'Administrador'){
            this._router.navigate(['/reportes']);
          }
        },
        
        error: (e) => {
          console.error(e);
          alert("Usuario o contraseña incorrectos")
        }

      }
    )
  }

  registrarUsuario(user: any) {

    user.perfil = { idPerfil: user.idPerfil }
    console.log(user);
    this.usuarioService.createUsuario(user).subscribe({
      next: (data) => {  
        if(user.idPerfil  == '1'){
          this._router.navigate(['/facturacion']);
        }
        if(user.idPerfil  == '2'){
          this._router.navigate(['/reportes']);
        }
    console.log(data);
      },
      error: (e) => console.error(e)
    }); 
  }

}
