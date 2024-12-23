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
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-crud-editor-receitas',
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
    InputTextareaModule,
    ReactiveFormsModule
  ],
  templateUrl: './crud-editor-receitas.component.html',
  styleUrl: './crud-editor-receitas.component.scss'
})
export class CrudEditorReceitasComponent {
  editarReceitas: string = "Ver receita"
  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  items: any;
  visible: boolean = false;
  receitasForm!: FormGroup<any>;
  visibleVerReceita: boolean = false;
  receitaSelecionada: any = {};

  constructor(
    private receitaService: ReceitaService,
    private router: Router

  ) {
    this.receitasForm = new FormGroup({
      nome_receita: new FormControl('', [Validators.required, Validators.email]),
      quantidade_pessoas: new FormControl('', [Validators.required, Validators.minLength(6)]),
      descricao: new FormControl('', Validators.required),
      ingredientes: new FormControl('', Validators.required),
      modo_de_preparo: new FormControl('', Validators.required),
      avaliacao: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)])
    })
   }

  ngOnInit() {
    this.getReceitas();
    this.configurarMenu();
  }

  verReceita(receita: any) {
    this.receitaSelecionada = receita; // Armazena a receita selecionada
    this.visibleVerReceita = true;    // Exibe a modal

    if (Array.isArray(this.receitaSelecionada.ingredientes)) {
      this.receitaSelecionada.ingredientes = this.receitaSelecionada.ingredientes
        .map((ingrediente: any) => ingrediente.nome) // ou qualquer outro campo que represente o ingrediente
        .join(', ');  // Concatena os ingredientes em uma string, separados por vírgula
    }

    this.visibleVerReceita = true;

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

  configurarMenu(): void {
    this.items = [
      {
        label: 'Perfil',
        items: [
          { label: 'Editor', icon: 'pi pi-user' },
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
}
