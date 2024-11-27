import { Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReceitaService } from '../../../../services/receitas.service';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-crud-cozinheiro-receitas',
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
    ReactiveFormsModule,
    InputTextareaModule
  ],
  templateUrl: './crud-cozinheiro-receitas.component.html',
  styleUrl: './crud-cozinheiro-receitas.component.scss'
})
export class CrudCozinheiroReceitasComponent {
  editarReceitas: string = "Editar receitas"
  verReceitas: string = "Ver receitas"
  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  items: any;
  visible: boolean = false;
  isEditMode: boolean = false;
  receitasForm!: FormGroup<any>;
  visibleVerReceita: boolean = false;
  receitaSelecionada: any = {
    nome: '',
    descricao: '',
    ingredientes: '',
    modo_preparo: ''
  };
  categorias: any[] = [];

  constructor(
    private receitaService: ReceitaService,
    private router: Router,
    private tostr: ToastrService
  ) {
    this.receitasForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.email]),
      num_porcao: new FormControl('', [Validators.required, Validators.minLength(6)]),
      descricao: new FormControl('', Validators.required),
      nome_categoria: new FormControl('', Validators.required),
      modo_preparo: new FormControl('', Validators.required),
      ingredientes: new FormControl('', Validators.required),
    })
   }

  ngOnInit() {
    this.getReceitas();
    this.configurarMenu();
    this.categorias = [
      {
        'nome': 'carne'
      }
    ]
  }

  ingredientes: {
    descricao: any; nome: string
  }[] = [];

  adicionarIngrediente(): void {
    this.ingredientes.push({
      nome: '',
      descricao: ''
    });
  }

  // Remover um ingrediente
  removerIngrediente(index: number): void {
    this.ingredientes.splice(index, 1);
  }

  isActive(route: string): boolean {
    return this.router.url === route; // Verifica se a URL atual é igual à rota passada
  }

  getReceitas(): any {
    this.receitaService.getReceitas().subscribe((dataReceitas: any) => {
      this.products = dataReceitas;
    });
  }

  filtroReceitas(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  alterarReceita(): void {
    if (!this.isEditMode || !this.receitaSelecionada?.id_receita) {
      console.error("Modo de edição não ativado ou ID da receita não encontrado!");
      return;
    }

    const receita = this.receitasForm.value;
    receita.ingredientes = this.ingredientes; // Atualiza os ingredientes caso tenham sido modificados

    this.receitaService
      .atualizarReceita(
        this.receitaSelecionada.id_receita, // ID da receita a ser alterada
        receita.nome,
        receita.descricao,
        receita.nome_categoria?.nome, // Certifica-se de enviar apenas o nome da categoria
        receita.modo_preparo,
        receita.num_porcao,
        receita.ingredientes
      )
      .pipe(
        tap(() => console.log('Receita alterada com sucesso')),
        catchError((error) => {
          console.error('Erro ao alterar receita:', error);
          this.tostr.error('Erro ao alterar a receita');
          return throwError(() => new Error(error));
        })
      )
      .subscribe({
        next: () => {
          this.tostr.success('Receita alterada com sucesso');
          this.getReceitas(); // Atualiza a lista de receitas
          this.visible = false; // Fecha a modal
        },
        error: (error: any) => console.error('Erro ao alterar receita:', error)
      });
  }

  adicionarReceita(): void {
    this.visible = true
      const receita = this.receitasForm.value;
      receita.ingredientes = this.ingredientes;
    
      this.receitaService.adicionarReceitas(
        receita.nome,
        receita.descricao,
        receita.nome_categoria?.nome,
        receita.modo_preparo,
        receita.num_porcao,
        receita.ingredientes
      )
      .pipe(
        tap(() => {
          this.tostr.success('Receita adicionada com sucesso!');
          this.visible = false;
          this.getReceitas(); // Atualiza a lista de receitas
        }),
        catchError((error) => {
          this.tostr.error('Erro ao adicionar receita.');
          return throwError(error);
        })
      )
      .subscribe();
    }
  
    abrirModalEdicao(receita: any): void {
      // Fecha a modal de visualização, caso esteja aberta
      this.visibleVerReceita = false;
    
      this.isEditMode = true;
      this.receitaSelecionada = receita;
    
      // Atualizar o formulário com os valores da receita
      this.receitasForm.patchValue({
        id_receita: receita.id_receita,
        nome: receita.nome,
        descricao: receita.descricao,
        nome_categoria: receita.nomeCategoria,
        modo_preparo: receita.modo_preparo,
        num_porcao: receita.num_porcao,
        ingredientes: receita.ingredientes?.nome,
      });
    
      // Abre a modal de edição
      this.visible = true;
    }

  configurarMenu(): void {
    this.items = [
      {
        label: 'Perfil',
        items: [
          { label: 'Cozinheiro', icon: 'pi pi-user' },
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
    localStorage.clear();
    sessionStorage.clear(); // Opcional: Remove todos os dados da sessão
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }

  showDialog() {
    this.visible = true;
  }
}
