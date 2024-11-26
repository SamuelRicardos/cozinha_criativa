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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { CategoriaService } from '../../../../services/categoria.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-admin-receitas',
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
    FileUploadModule,
    FormsModule,
    EditorModule,
    InputTextareaModule
  ],
  providers: [
    MessageService,
  ],
  templateUrl: './crud-admin-receitas.component.html',
  styleUrl: './crud-admin-receitas.component.scss'
})
export class CrudAdminReceitasComponent {
  @ViewChild('dt2') dt2!: Table;
  editarReceitas: string = "Editar receitas"
  verReceitas: string = "Ver receitas"
  receitas: any[] = [];
  items: any;
  visible: boolean = false;
  receitasForm!: FormGroup<any>;
  text: string = "";
  categorias: any[] = [];
  isEditMode: boolean = false;
  receitaSelecionada: any;

  constructor(
    private receitaService: ReceitaService,
    private categoriaService: CategoriaService,
    private messagemService: MessageService,
    private tostr: ToastrService,
    private router: Router,
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
    // this.getCategorias();
    this.categorias = [
      {
        'nome': 'carne'
      }
    ]

  }

  ingredientes: {
    descricao: any; nome: string
  }[] = [];

  // Adicionar um novo ingrediente
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

  enviarReceitas(): void {
    const receita = this.receitasForm.value;
    receita.ingredientes = this.ingredientes;

    this.receitaService
      .adicionarReceitas(
        receita.nome,
        receita.descricao,
        receita.nome_categoria?.nome,
        receita.modo_preparo,
        receita.num_porcao,
        receita.ingredientes
      )
      .pipe(
        tap(() => console.log('Receita enviada com sucesso')),
        catchError((error) => {
          console.error('Erro capturado:', error);
          this.tostr.error('Erro ao adicionar receitas');
          return throwError(() => new Error(error));
        })
      )
      .subscribe({
        next: () => {
          this.tostr.success('Receita adicionada com sucesso');
          this.getReceitas(); // Atualiza a lista de receitas
          this.visible = false; // Fecha a modal
        },
        error: (error) => console.error('Erro ao adicionar receita:', error)
      });
  }

  abrirModalEdicao(receita: any): void {
    this.isEditMode = true;
    this.receitaSelecionada = receita; // Armazena a receita atual para edição

    // Atualizar o formulário com os valores da receita
    this.receitasForm.patchValue({
        id_receita: receita.id_receita,
        nome: receita.nome,
        descricao: receita.descricao,
        nome_categoria: receita.nome_categoria, // Preenche com o nome da categoria
        modo_preparo: receita.modo_preparo,
        num_porcao: receita.num_porcao,
        ingredientes: receita.ingredientes?.nome,
    });

    this.visible = true; // Abre a modal
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
          error: (error) => console.error('Erro ao alterar receita:', error)
      });
}
  // getCategorias(): any {
  //   this.categoriaService.getCategoria().subscribe((categorias: any) => {
  //     this.categorias = categorias;
  //   })
  // }

  getReceitas(): any {
    this.receitaService.getReceitas().subscribe((dataReceitas: any) => {
      this.receitas = dataReceitas;
      console.log(this.receitas)
    });
  }

  filtroReceitas(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  isActive(route: string): boolean {
    return this.router.url === route;
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

  showDialog() {
    this.visible = true;
  }

  onUpload() {
    this.messagemService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }
}
