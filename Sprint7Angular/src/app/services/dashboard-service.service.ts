import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from  '@angular/router';
import { Observable } from 'rxjs';
import { VeiculoData, VeiculosAPI } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient, router: Router) {
  }

  getVehicles(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicles`);
  }

  
  getVehiclesData(vin: String): Observable<VeiculoData> {
    return this.http.post<VeiculoData>(`${this.apiUrl}/vehicleData`, {vin});
  }
}
