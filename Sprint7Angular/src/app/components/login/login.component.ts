import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = {
    nome:"",
    senha:""
  }

  //injetar o authservice e o router para usar os metodos 
  constructor(private authService: AuthService, private router:Router){}

  errorMessage:string|null=null;

  login(){
    this.errorMessage = null //limpar erros anteriores 
    this.authService.login(this.usuario).subscribe({
      //Caso o usuario consiga fazer login
      next:(reponse)=>{
        console.log("Parabens, conseguiu entrar");
        this.router.navigate(['/home'])
      },
      //Caso deu problema no login
      error:(err)=>{
        console.log("Falhou em fazer login");
      }
    });
  }

}
