import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../base/header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    // Usa logout completo para limpar todos os dados salvos, incluindo "logar automaticamente"
    this.authService.logoutComplete();
  }

  flagDialog: boolean = true;

  closeDialog(): void {
    this.flagDialog = false;
    console.log(this.flagDialog);
    return;
  }
}
