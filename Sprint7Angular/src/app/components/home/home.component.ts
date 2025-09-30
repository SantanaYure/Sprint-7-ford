import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../base/header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService:AuthService){}

  logout():void{
    this.authService.logout();
  }

  flagDialog: boolean = true;

  closeDialog(): void {
    this.flagDialog = false
    console.log(this.flagDialog)
    return
  }
}
