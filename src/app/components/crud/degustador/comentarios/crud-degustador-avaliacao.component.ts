import { ApplicationRef, ChangeDetectorRef, Component, Injectable, Pipe, PipeTransform, ViewChild } from '@angular/core';
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
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  templateUrl: './crud-degustador-avaliacao.component.html',
  styleUrl: './crud-degustador-avaliacao.component.scss'
})
@Injectable({
  providedIn: "root"
})


export class CrudDegustadorComentariosComponent {
  apiUrl: string = "http://localhost:8080/receitas/";
  apiUrlNota: string = "http://localhost:8080/avaliacao"
  @ViewChild('dt2') dt2!: Table;
  excluirReceitas: string = "Excluir receitas"
  visible: boolean = false;
  receitasForm!: FormGroup<any>;
  products: any[] = [];
  avaliacao: any[] = [];
  items: any;
  text: string = "";
  visibleVerReceita: boolean = false;
  receitaSelecionada: any = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private comentario: ReceitaService,
    private receitaService: ReceitaService,
    private tostr: ToastrService,
    private router: Router,
  ) {
    this.receitasForm = new FormGroup({
      nome_receita: new FormControl('', [Validators.required, Validators.minLength(3)]),  // Corrigido para validação de nome
      quantidade_pessoas: new FormControl('', [Validators.required, Validators.min(1)]),  // Ajustado para validação numérica
      descricao: new FormControl('', Validators.required),  // Mantido como obrigatório
      ingredientes: new FormControl('', Validators.required),  // Mantido como obrigatório
      modo_de_preparo: new FormControl('', Validators.required),  // Mantido como obrigatório
      avaliacao: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),  // Ajustado para validação de 1 a 5
    });
  }

  ExcluirAvaliacao(id: number) {
    this.receitaService.excluirAvaliacao(id).pipe(
      catchError((error) => {
        this.tostr.error("Erro ao excluir receita");
        return throwError(() => new Error(error));
      })
    ).subscribe(() => {
      this.getAvaliacao();
      this.loadReceitas();
      this.tostr.success("Sucesso ao remover avaliação de receita");
      this.cdr.detectChanges(); // Força a detecção de mudanças
    });
  }
  ngOnInit() {
    this.loadReceitas(); // Carregar as receitas com comentários e notas
    this.itemsMenu();
    this.getAvaliacao();
    this.cdr.detectChanges();
  }

  getAvaliacao(): void {
    this.comentario.getAvaliacao().subscribe({
      next: (dataAvaliacao) => {
        this.avaliacao = dataAvaliacao; // Armazena as receitas no array products
      },
      error: (err) => {
        console.error('Erro ao carregar comentarios:', err);
      }
    });
  }

  updateView() {
    this.loadReceitas();
    this.appRef.tick(); // Força a atualização da view
  }

  loadReceitas(): void {
    this.receitaService.getReceitas().subscribe({
      next: (dataReceitas) => {
        console.log("Receitas retornadas:", dataReceitas); // Log para depuração
        this.products = dataReceitas; // Atualiza os produtos
      },
      error: (err) => {
        console.error("Erro ao carregar receitas:", err);
      }
    });
  }

  adicionarAvaliacao(avaliacao: any) {
    this.receitaService.adicionarAvaliacao(avaliacao).subscribe({
      next: () => {
        console.log("Avaliação adicionada com sucesso");
        this.loadReceitas(); // Atualiza os dados da tabela
      },
      error: (err) => {
        console.error("Erro ao adicionar avaliação:", err);
      }
    });
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

  isActive(route: string): boolean {
    return this.router.url === route; // Verifica se a URL atual é igual à rota passada
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