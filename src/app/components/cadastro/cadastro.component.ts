import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { CargosService } from '../../services/cargos.service';

interface SignupForm {
  nome: FormControl,
  rg: FormControl,
  email: FormControl,
  nome_cargo: FormControl,
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
  cargos: any[] = [];


  ngOnInit() {
this.getCargos()
  }
  cadastroForm!: FormGroup<SignupForm>;
  
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private cargosService: CargosService
  ) {
    this.cadastroForm = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      rg: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      nome_cargo: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }
  
  cadastro() {
    const nomeCargo = this.cadastroForm.value.nome_cargo?.nome; // Extrai o nome do cargo selecionado
  
    this.loginService.signup(
      this.cadastroForm.value.nome,
      this.cadastroForm.value.email,
      nomeCargo, // Passa apenas o nome do cargo
      this.cadastroForm.value.rg,
      this.cadastroForm.value.password
    ).subscribe({
      next: () => {
        this.toastr.success("Cadastro feito com sucesso!");
        this.router.navigate(['']);
      },
      error: () => this.toastr.error("Erro inesperado! Tente novamente.")
    });
  }

  getCargos() {
    this.cargosService.getCargos().subscribe((cargos) => {
      this.cargos = cargos;
      console.log(this.cargos)
    })
  }

}
