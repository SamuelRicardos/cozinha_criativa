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
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { Router } from '@angular/router';
import { CargosService } from '../../../../services/cargos.service';
import { catchError, throwError } from 'rxjs';

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
    EditorModule
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
  excluirReceitas: string = "Excluir receitas"
  receitas: any[] = [];
  receitasDescricao: any[] = [];
  items: any;
  visible: boolean = false;
  receitasForm!: FormGroup<any>;
  text: string = "";

  constructor(
    private receitaService: ReceitaService,
    private messagemService: MessageService,
    private router: Router,
  ) {
    this.receitasForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.email]),
      num_porcao: new FormControl('', [Validators.required, Validators.minLength(6)]),
      descricao: new FormControl('', Validators.required),
      nome_categoria: new FormControl('', Validators.required),
      modo_preparo: new FormControl('', Validators.required),
      ind_inedita: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.getReceitas();
    this.getReceitasDescricao();
    this.configurarMenu();
  }

  enviarReceitas(): void {
  
    // Obtém os valores do formulário
    const receita = this.receitasForm.value;
  
    // Envia os dados ao serviço
    this.receitaService
      .adicionarReceitas(
        receita.nome,
        receita.descricao,
        receita.nome_categoria?.descricao, // Verifique se este campo está no formato esperado pelo backend
        receita.modo_preparo,
        receita.num_porcao,
        receita.ind_inedita
      )
      .pipe(
        // Trata possíveis erros na requisição
        catchError((error) => {
          this.messagemService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao adicionar receita.' });
          return throwError(() => new Error(error));
        })
      )
      .subscribe(() => {
        this.messagemService.add({ severity: 'success', summary: 'Sucesso', detail: 'Receita adicionada com sucesso.' });
        this.getReceitas(); // Atualiza a lista de receitas
        this.visible = false;    // Fecha a modal
      });
  }

  getReceitas(): any {
    this.receitaService.getReceitas().subscribe((dataReceitas: any) => {
      this.receitas = dataReceitas;
      console.log(this.receitas)
    });
  }

  getReceitasDescricao(): any {
    this.receitaService.getReceitas().subscribe((dataReceitas: any) => {
      this.receitasDescricao = dataReceitas.map((receita: any) => ({
        descricao: receita.categoria?.descricao,
      }));
      console.log(this.receitasDescricao);
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
