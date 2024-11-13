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

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.senha).subscribe({
      next: () => { this.tostr.success("Login feito com sucesso!")
        this.router.navigate(['crud_admin_funcionarios']);
       },
      error: () => this.tostr.error("Usuário não cadastrado!")
    })
  }


navigate(){
  this.router.navigate(["cadastro"])
}

senha() {
  this.router.navigate(["senha"])
}

}
