import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FuncionarioService } from '../../../../services/funcionarios.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CargosService } from '../../../../services/cargos.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crud-admin',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    DynamicDialogModule,
    MenuModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    FuncionarioService
  ],
  templateUrl: './crud-admin.component.html',
  styleUrl: './crud-admin.component.scss'
})
export class CrudAdminComponent implements OnInit {
  editarFuncionario: string = "Editar funcionário"
  excluirFuncionario: string = "Excluir funcionário"
  inserirFuncionario: string = "Insira um nome de funcionário"
  inserirCargo: string = "Insira um cargo"
  inserirRg: string = "Insira um rg"
  inserirSalario: string = "Insira um salário"
  funcionarios: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  items: any;
  visible: boolean = false;
  isEditMode: boolean = false; // Determina se é adição ou alteração
  funcionarioSelecionado: any; // Armazena o funcionário selecionado para edição
  funcionariosForm!: FormGroup<any>;
  id: any;
  cargos: any[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private tostr: ToastrService,
    private cargoService: CargosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarFuncionarios();
    this.carregarCargos();
    this.configurarMenu();
  }

  isActive(route: string): boolean {
    return this.router.url === route; // Verifica se a URL atual é igual à rota passada
  }
  
  inicializarFormulario(): void {
    this.funcionariosForm = new FormGroup({
      id_funcionario: new FormControl(''), // Controle para o ID
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      rg: new FormControl('', [Validators.required]),
      salario: new FormControl('', [Validators.required]),
      nome_cargo: new FormControl('', [Validators.required]),
    });
  }

  carregarFuncionarios(): void {
    this.funcionarioService
      .listarTodosFuncionarios()
      .pipe(
        catchError((error) => {
          this.tostr.error('Erro ao carregar funcionários.');
          return throwError(() => new Error(error));
        })
      )
      .subscribe((data) => {
        this.funcionarios = data;
        console.log(this.funcionarios)
      });

  }

  filtroFuncionarios(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  showDialog() {
    this.isEditMode = false;
    this.resetarFormulario();
    this.visible = true;
  }

  abrirModalEdicao(funcionario: any): void {
    this.isEditMode = true;
    this.funcionarioSelecionado = funcionario;
  
    // Encontrar o cargo correspondente na lista
    const cargoSelecionado = this.cargos.find(
      (cargo) => cargo.nome === funcionario.nome_cargo
    );
  
    this.funcionariosForm.patchValue({
      id_funcionario: funcionario.id_funcionario,
      nome: funcionario.nome,
      rg: funcionario.rg,
      salario: funcionario.salario,
      nome_cargo: cargoSelecionado, // Passar o objeto completo
    });
  
    this.visible = true;
  }

  // Salvar ou alterar funcionário
  salvarOuAlterarFuncionario(): void {
    
    if (this.isEditMode) {
      this.alterarFuncionarios();
    } else {
      this.enviarFuncionarios();
    }
  }

  alterarFuncionarios() {
    const funcionario = {
      ...this.funcionariosForm.value,
      nome_cargo: this.funcionariosForm.value.nome_cargo?.nome // Garante que seja apenas o nome
    };

    const id = funcionario?.id_funcionario; // Extrai o ID do funcionário

    if (id) {
      this.funcionarioService.updateFuncionario(funcionario, id).subscribe({
        next: () => {
          this.tostr.success('Funcionário atualizado com sucesso!');
          this.carregarFuncionarios(); // Atualiza a lista de funcionários
          this.visible = false; // Fecha a modal
        },
        error: (err: { message: string }) => {
          this.tostr.error('Erro ao atualizar funcionário: ' + err.message);
        }
      });
    } else {
      this.tostr.error('ID do funcionário não encontrado para edição.');
    }
  }

  enviarFuncionarios(): void {
    // Marca todos os campos como "tocados" para exibir mensagens de erro
    this.funcionariosForm.markAllAsTouched();

    if (this.funcionariosForm.invalid) {
      this.tostr.warning('Preencha todos os campos obrigatórios.');
      return;
    }

    const funcionario = this.funcionariosForm.value;
    this.funcionarioService
      .adicionarFuncionarios(funcionario.nome, funcionario.email, funcionario.senha, funcionario.nome_cargo.nome, funcionario.rg, funcionario.salario)
      .pipe(
        catchError((error) => {
          this.tostr.error('Erro ao adicionar funcionário.');
          return throwError(() => new Error(error));
        })
      )
      .subscribe(() => {
        this.tostr.success('Funcionário adicionado com sucesso.');
        this.carregarFuncionarios();
        this.visible = false;
      });
  }

  deletarFuncionarios(id: number): void {
    this.funcionarioService
      .deletarFuncionario(id)
      .pipe(
        catchError((error) => {
          this.tostr.error('Erro ao excluir funcionário.');
          return throwError(() => new Error(error));
        })
      )
      .subscribe(() => {
        this.tostr.success('Funcionário excluído com sucesso.');
        this.carregarFuncionarios();
      })
  }

  carregarCargos(): void {
    this.cargoService
      .getCargos()
      .pipe(
        catchError((error) => {
          this.tostr.error('Erro ao carregar cargos.');
          return throwError(() => new Error(error));
        })
      )
      .subscribe((data) => (this.cargos = data));
  }

  configurarMenu(): void {
    this.items = [
      {
        label: 'Perfil',
        items: [
          { label: 'Administrador', icon: 'pi pi-user' },
          { label: 'Configurações', icon: 'pi pi-cog' },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.sairDaConta(), // Chama a função logout ao clicar
          },
        ],
      },
    ];
  }

  sairDaConta(): void {
    // Aqui você pode limpar qualquer dado armazenado na sessão
    sessionStorage.clear(); // Opcional: Remove todos os dados da sessão
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }

  resetarFormulario() {
    this.funcionariosForm.reset(); // Reseta todos os campos do formulário
    this.funcionarioSelecionado = null;
  }
}
