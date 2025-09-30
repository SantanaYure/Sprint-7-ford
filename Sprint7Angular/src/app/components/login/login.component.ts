import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  usuario = {
    nome: '',
    senha: '',
  };

  rememberMe: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verifica se há dados salvos no localStorage
    this.checkSavedLogin();
  }

  private checkSavedLogin(): void {
    const savedUser = localStorage.getItem('rememberedUser');
    const isRemembered = localStorage.getItem('rememberLogin') === 'true';

    if (savedUser && isRemembered) {
      const userData = JSON.parse(savedUser);
      this.usuario = userData;
      this.rememberMe = true;
      // Auto-login se os dados estão salvos
      this.autoLogin();
    }
  }

  private autoLogin(): void {
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        console.log('Login automático realizado com sucesso');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('Falha no login automático');
        // Remove dados inválidos
        this.clearSavedLogin();
      },
    });
  }

  private clearSavedLogin(): void {
    localStorage.removeItem('rememberedUser');
    localStorage.removeItem('rememberLogin');
    this.rememberMe = false;
  }

  login() {
    this.errorMessage = null;

    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso');

        // Salva ou remove dados baseado no checkbox
        if (this.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify(this.usuario));
          localStorage.setItem('rememberLogin', 'true');
        } else {
          this.clearSavedLogin();
        }

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('Falha no login');
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      },
    });
  }
}
