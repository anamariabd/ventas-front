import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(private LoginService: UsuarioService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private tokenService: TokenService) {
    this.loginUser = this.formBuilder.group({
    username: '',
    password: '' 
    });
  }

  ngOnInit(): void {
  }

  onSubmit(usuario: any) {
    
    console.log(usuario)    
    this.LoginService.loginUsuario(usuario).subscribe(
      {
        next: (data) => {
          console.log(data.perfil);
          this.tokenService.setToken(data.accessToken)
          localStorage.setItem('perfil', data.perfil)

          if(data.perfil == 'Cajero'){
            this._router.navigate(['/facturacion']);
          }
        }

      }
    )
  }
}
