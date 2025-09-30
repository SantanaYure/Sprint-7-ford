import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { HeaderComponent } from '../base/header/header.component';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../../services/dashboard-service.service';
import {
  Veiculo,
  VeiculoData,
  Veiculos,
  VeiculosAPI,
} from '../../models/veiculo.model';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private dashboard: DashboardServiceService, router: Router) {}

  vehicle: Veiculo = {} as Veiculo;
  vehicles: Veiculos = [];

  foundVehiclesData: VeiculoData | null = null;
  searchError: string | null = null;

  // Dados padrão específicos para cada veículo
  private defaultVehicleData: { [key: string]: VeiculoData } = {
    '1': {
      // Ranger
      id: 1,
      odometro: 75000,
      lat: -23.5505,
      long: -46.6333,
      status: 'on',
      nivelCombustivel: 85,
    },
    '2': {
      // Mustang
      id: 2,
      odometro: 50000,
      lat: -12.2322,
      long: -35.2314,
      status: 'on',
      nivelCombustivel: 90,
    },
    '3': {
      // Territory
      id: 3,
      odometro: 32000,
      lat: -15.7942,
      long: -47.8822,
      status: 'on',
      nivelCombustivel: 70,
    },
    '4': {
      // Bronco Sport
      id: 4,
      odometro: 18000,
      lat: -22.9068,
      long: -43.1729,
      status: 'on',
      nivelCombustivel: 95,
    },
  };

  // Códigos VIN específicos para cada veículo
  private vehicleVinCodes: { [key: string]: string } = {
    '1': '1FTZR45E17BA12345', // Ranger
    '2': '2FRHDUYS2Y63NHD22455', // Mustang
    '3': '3FMTK1RM4LMA67890', // Territory
    '4': '5FMCR9B67KLA54321', // Bronco Sport
  };

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicleVin(): string {
    const vehicleId = this.vehicle.id?.toString() || '2';
    return this.vehicleVinCodes[vehicleId] || this.vehicleVinCodes['2'];
  }

  getVehicles() {
    this.dashboard.getVehicles().subscribe((vehicle: VeiculosAPI) => {
      this.vehicles = vehicle.vehicles;
      // Seleciona automaticamente o Mustang após carregar os veículos
      this.selectDefaultVehicle();
    });
  }

  private selectDefaultVehicle(): void {
    // Seleciona o Mustang (id: 2) como padrão
    const defaultVehicle = this.vehicles.find((v) => v.id == '2');
    if (defaultVehicle) {
      this.vehicle = defaultVehicle;
      this.loadDefaultVehicleData('2');
    }
  }

  getSelectVehicle(event: Event): void {
    const select = event.target as HTMLSelectElement;
    for (let vehicle of this.vehicles) {
      if (vehicle.id == select.value) {
        this.vehicle = vehicle;
        // Busca automaticamente os dados do VIN para o veículo selecionado
        this.searchVehicleData(vehicle.id.toString());
      }
    }
  }

  private loadDefaultVehicleData(vehicleId: string): void {
    if (this.defaultVehicleData[vehicleId]) {
      this.foundVehiclesData = this.defaultVehicleData[vehicleId];
    }
  }

  private searchVehicleData(vehicleId: string): void {
    this.foundVehiclesData = null;
    this.searchError = null;

    // Primeiro carrega os dados padrão
    this.loadDefaultVehicleData(vehicleId);

    this.dashboard.getVehiclesData(vehicleId).subscribe({
      next: (data) => {
        this.foundVehiclesData = data;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do veículo:', err);
        this.searchError =
          err.error?.message || 'Falhou na busca dos dados do veículo';
        // Mantém os dados padrão em caso de erro
        this.loadDefaultVehicleData(vehicleId);
      },
    });
  }

  searchByVin(vin: string): void {
    if (!vin) return;
    this.foundVehiclesData = null;
    this.searchError = null;

    this.dashboard.getVehiclesData(vin).subscribe({
      next: (data) => {
        this.foundVehiclesData = data;
      },

      error: (err) => {
        console.error('erro');
        this.searchError = err.error.message || 'falhou na busca';
      },
    });
  }
}
