import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';

interface cargos {
  name: string;
  code: string;
}
interface SignupForm {
  name: FormControl,
  email: FormControl,
  cargo: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit{
  cargos: cargos[] | undefined;

  CargoSelecionado: cargos | undefined;


  ngOnInit() {
      this.cargos = [
          { name: 'Cozinheiro', code: ''},
          { name: 'Editor', code:''},
          { name: 'Degustador',code: ''}
      ];
  }
  cadastroForm!: FormGroup<SignupForm>;
  
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.cadastroForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      cargo: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }
  
  cadastro() {
    this.loginService.signup(this.cadastroForm.value.name, this.cadastroForm.value.email, this.cadastroForm.value.cargo, this.cadastroForm.value.password).subscribe({
      next: () => {
        this.toastr.success("Cadastro feito com sucesso!"),
        this.router.navigate(['']);
      },
      error: () => this.toastr.error("Erro inesperado! Tente novamente.")
    });
  }

}
