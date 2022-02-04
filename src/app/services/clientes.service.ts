import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/clientes';

@Injectable({
  providedIn: 'root'
})
  
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientes():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrl);
  }

  getTiposIdentificacion(): Observable<TipoIdentificacion[]> {
    return this.http.get<TipoIdentificacion[]>(baseUrl+'/tipos');
  }
  
  getCliente(id:any): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${baseUrl}/${id}`)
  }

  getClienteByIdentidad(id:any): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${baseUrl}/ident/${id}`)
  }

  createCliente(cliente:any):Observable<any>{
    return this.http.post(baseUrl, cliente);
  }

  updateCliente(cliente: any, id:any): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`, cliente);
  }
}

export class Cliente {
  cliente?: any; //ids
  t_identificacion?:TipoIdentificacion;
  identificacion?: string;
  razonSocial?: string;
  fechaRegistro?:Date;
}

export class TipoIdentificacion {
  tipo_identificacion?: any; //id
  abreviatura?: string;
  descripcion?: string;
}
