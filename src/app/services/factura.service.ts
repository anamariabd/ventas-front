import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './clientes.service';
import { Producto } from './productos.service';

const baseUrl = 'http://localhost:8080/api/detalles';
const baseUrlFactura = 'http://localhost:8080/api/facturas';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  createFactura(Factura:any):Observable<any>{
    return this.http.post(baseUrlFactura, Factura);
  }

  getAllFactDetalles():Observable<Detalles[]> {
    return this.http.get<Detalles[]>(baseUrl);
  }

  getFactDetalles(id:any): Observable<Detalles[]> {
    return this.http.get<Detalles[]>(`${baseUrl}/${id}`)
  }

  createDetalles(Detalles:any):Observable<any>{
    return this.http.post(baseUrl, Detalles);
  }

  getAllFacturas():Observable<Factura[]> {
    return this.http.get<Factura[]>(baseUrl);
  }

}

export class Detalles { // detalles de factura
  id?: any; //ids
  consecutivo?: Factura; // id de factura
  cantidad?: string;
  idProducto?: Producto;
  valorUnitario?: number; // valor total
}

export class Factura {
  consecutivo?: any; // id de factura
  fecha?: Date;
  cliente?: Cliente;
}