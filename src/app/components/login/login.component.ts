import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  senha: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private tostr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    const { email, senha } = this.loginForm.value;
    this.loginService.login(email, senha).subscribe({
      next: (response) => {
        this.tostr.success("Login feito com sucesso!");
  
        localStorage.setItem('token', response.token);

        switch (response.nome_cargo) {
          case 'editor':
            this.router.navigate(['crud_editor_livros']);
            break;
          case 'degustador':
            this.router.navigate(['crud_admin_funcionarios']);
            break;
          case 'cozinheiro':
            this.router.navigate(['crud_cozinheiro_receitas']);
            break;
            case 'admin':
              this.router.navigate(['crud_degustador_receitas']);
              break;
          default:
            this.tostr.warning("Cargo não reconhecido, redirecionando para a página padrão.");
            this.router.navigate(['login']);
        }
      },
      error: () => this.tostr.error("Usuário não cadastrado!")
    });
  }


navigate(){
  this.router.navigate(["cadastro"])
}

senha() {
  this.router.navigate(["senha"])
}

}
