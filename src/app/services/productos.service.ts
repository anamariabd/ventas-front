import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private _refresh = new Subject<void>();
  constructor(private http: HttpClient) { }
  
  get refresh() {
    return this._refresh;
  }
  
    getProductos():Observable<Producto[]> {
      return this.http.get<Producto[]>(baseUrl);
    }
    
    getProducto(id:any): Observable<Producto[]> {
      return this.http.get<Producto[]>(`${baseUrl}/${id}`)
    }
  
    createProducto(Producto:any):Observable<any>{
      return this.http.post(baseUrl, Producto);
    }
  
    updateProducto(Producto: any, id:any): Observable<any>{
      return this.http.put(`${baseUrl}/${id}`, Producto);
    }
  
  getProductosMasVendidos(): Observable<any> {
    return this.http.get(baseUrl+"/vendidos")    
  }
}

export class Producto {
  id?: any; //ids
  nombre?: string;
  estado?: string;
  valorUnitario?: number;
}