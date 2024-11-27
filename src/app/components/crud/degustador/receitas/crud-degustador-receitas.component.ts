import { Component, Injectable, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { HttpClient } from "@angular/common/http";
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
import { Observable } from 'rxjs';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-admin-receitas',
  standalone: true,
  imports: [
    InputTextareaModule,
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
  templateUrl: './crud-degustador-receitas.component.html',
  styleUrl: './crud-degustador-receitas.component.scss'
})
@Injectable({
  providedIn: "root"
})


export class CrudDegustadorReceitasComponent {
  apiUrl: string = "http://localhost:8080/receitas/";
  @ViewChild('dt2') dt2!: Table;
  visible: boolean = false;
  receitasForm!: FormGroup<any>;
  products: any[] = [];
  items: any;
  text: string = "";
  visibleVerReceita: boolean = false;
  receitaSelecionada: any = {};
  
  constructor(
    private httpClient: HttpClient,
    private receitaService: ReceitaService,
    private messagemService: MessageService,
    private tostr: ToastrService,
    private router: Router
  ) {
    this.receitasForm = new FormGroup({
      nome_receita: new FormControl('', [Validators.required, Validators.minLength(3)]),  // Corrigido para validação de nome
      quantidade_pessoas: new FormControl('', [Validators.required, Validators.min(1)]),  // Ajustado para validação numérica
      descricao: new FormControl('', Validators.required),  // Mantido como obrigatório
      ingredientes: new FormControl('', Validators.required),  // Mantido como obrigatório
      modo_de_preparo: new FormControl('', Validators.required),  // Mantido como obrigatório
      avaliacao: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),  // Ajustado para validação de 1 a 5
      comentario: new FormControl('', Validators.required),  // Mantido como obrigatório
    });
  }

  verReceita(receita: any) {
    if (!receita) {
      console.log('Receita inválida');
      return;
    }
  
    this.receitaSelecionada = receita;
    this.visibleVerReceita = true;

    if (Array.isArray(this.receitaSelecionada.ingredientes)) {
      this.receitaSelecionada.ingredientes = this.receitaSelecionada.ingredientes
        .map((ingrediente: any) => ingrediente.nome) // ou qualquer outro campo que represente o ingrediente
        .join(', ');  // Concatena os ingredientes em uma string, separados por vírgula
  }}

  ngOnInit() {
    this.loadReceitas(); // Carregar receitas do banco de dados
    this.itemsMenu();
  }

  loadReceitas(): void {
    this.receitaService.getReceitas().subscribe({
      next: (dataReceitas) => {
        this.products = dataReceitas; // Armazena as receitas no array products
      },
      error: (err) => {
        console.error('Erro ao carregar receitas:', err);
      }
    });
  }

  getReceitas(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/`);
  }

  filtroReceitas(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  itemsMenu() {
    this.items = [
      {
        label: 'Perfil',
        items: [
          {
            label: 'Degustador',
            icon: 'pi pi-user',
          },
          {
            label: 'Configurações',
            icon: 'pi pi-cog',
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.sairDaConta(), // Chama a função logout ao clicar
          }
        ]
      },
    ];
  }

  // Verifica se o formulário é válido antes de enviar
  adicionarAvaliacao() {
 
    const avaliacao = {
      id_receita: this.receitaSelecionada.id_receita,
      descricao: this.receitasForm.value.comentario,
      nota: this.receitasForm.value.avaliacao
    };
  
    // Envio da avaliação para o backend
    this.receitaService.adicionarAvaliacao(avaliacao).subscribe({
      next: (response) => {
        this.tostr.success("Avaliação adicionada com sucesso")
        this.visibleVerReceita = false;
        this.loadReceitas();
      },
      error: (err) => {
        console.error('Erro ao adicionar avaliação:', err);
        this.tostr.error("Erro ao adicionar avaliação")
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  sairDaConta(): void {
    // Aqui você pode limpar qualquer dado armazenado na sessão
    localStorage.clear();
    sessionStorage.clear(); // Opcional: Remove todos os dados da sessão
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }
}