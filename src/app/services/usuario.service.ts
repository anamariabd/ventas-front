import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtDTO } from './token.service';

const baseUrl = 'http://localhost:8080/api/usuario';
const AuthUrl = "http://localhost:8080/api/auth/login";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(baseUrl);
  }

  createUsuario(Usuario:any):Observable<any>{
    return this.http.post(baseUrl, Usuario);
  }

  updateUsuario(Usuario: any, id:any): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`, Usuario);
  } 

  loginUsuario(Usuario: LoginUsuario):Observable<any> {
    return this.http.post(AuthUrl, Usuario);
  }
}

export class LoginUsuario {
  username: string;
  password: string;

  constructor(nombreUsuario: string, password: string) {
      this.username = nombreUsuario;
      this.password = password;
  }
}

export class Perfil{
  idPerfil?: number;
  nombre?: string
}

export class Usuario {
  idUsuario?: any;
  nombre?: string;
  apellido?: string;
  usuario?: string;
  contraseña?: string;
  perfil?: Perfil;
}


