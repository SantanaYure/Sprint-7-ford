import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../base/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logoutComplete();
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  flagDialog: boolean = true;

  closeDialog(): void {
    this.flagDialog = false;
    console.log(this.flagDialog);
    return;
  }
}
