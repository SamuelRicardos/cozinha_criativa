import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RestauranteService } from '../../../../services/restaurantes.service';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-crud-admin-restaurantes',
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
    FormsModule,
    DialogModule,
    DynamicDialogModule,
    MenuModule,
    AvatarModule,
    ReactiveFormsModule
  ],
  templateUrl: './crud-admin-restaurantes.component.html',
  styleUrl: './crud-admin-restaurantes.component.scss'
})
export class CrudAdminRestaurantesComponent implements OnInit {
  editarRestaurante: string = "Editar restaurante"
  excluirRestaurante: string = "Excluir restaurante"
  inserirRestaurante: string = "Insira um nome de restaurante"
  inserirEstados: string = "Insira um estado"
  restauranteSelecionado: any = {
    nome: '',
    cnpj: '',
    endereco: '',
    estado: ''
  };

  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  valoresSelecionados: any[] = [];
  items: any;
  visible: boolean = false;
  restaurantesForm!: FormGroup<any>;
  isEditMode: boolean = false;

  constructor(
    private restauranteService: RestauranteService,
    private router: Router,
    private tostr: ToastrService
    
  ) {
    this.restaurantesForm = new FormGroup({
      nome: new FormControl('', [Validators.required ]),
      cnpj: new FormControl('', [Validators.required ]),
      estado: new FormControl('', Validators.required),
      endereco: new FormControl('', Validators.required)
    })
   }

  isActive(route: string): boolean {
    return this.router.url === route; // Verifica se a URL atual é igual à rota passada
  }

  ngOnInit() {
    this.getRestaurante()
    this.configurarMenu();
  }

  adicionarRestaurante(): void {
    this.isEditMode = false
    if (this.restaurantesForm.valid) {
      const restauranteData = this.restaurantesForm.value;
  
      // Chamada ao serviço para enviar os dados
      this.restauranteService.postRestaurante(restauranteData).subscribe(
        (response) => {
          this.tostr.success('Restaurante adicionado com sucesso');
          this.visible = false; // Fecha o modal
          this.getRestaurante(); // Atualiza a lista de restaurantes
        },
        (error) => {
          this.tostr.error('Erro ao adicionar restaurante:', error);
        }
      );
    } else {
      this.tostr.warning('Formulário inválido');
    }
  }

  alterarRestaurante(): void {
    const restauranteAtualizado = this.restaurantesForm.value;

    this.restauranteService.putRestaurante(this.restauranteSelecionado.id, restauranteAtualizado)
      .subscribe({
        next: () => {
          this.tostr.success('Restaurante alterado com sucesso!');
          this.visible = false;
          this.getRestaurante(); // Atualiza a lista de restaurantes
        },
        error: (err) => this.tostr.error('Erro ao alterar restaurante:', err)
      });
  }

  deletarRestaurante(id: number): void {
    this.restauranteService
      .deletarRestaurante(id)
      .pipe(
        catchError((error) => {
          this.tostr.error('Erro ao excluir o restaurante.'); // Mostra mensagem de erro
          return throwError(() => new Error(error)); // Repropaga o erro
        })
      )
      .subscribe(() => {
        this.tostr.success('Restaurante excluído com sucesso.'); // Mostra mensagem de sucesso
        this.getRestaurante(); // Atualiza a lista de restaurantes
      });
  }

  getRestaurante(): any {
    
    this.restauranteService.getRestaurante().subscribe((dataRestaurante: any) => {
      this.products = dataRestaurante;
      console.log(this.products)
    });
  }

  filtroRestaurantes(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  filtroRest(estadosSelecionados: any[]) {
    const estados = estadosSelecionados.map(est => est.estadoRestaurante);

    this.dt2.filter(estados, 'estadoRestaurante', 'in');
  }

  limparFiltro() {
    this.valoresSelecionados= [];
  }

  abrirModalAdicionar(): void {
    this.isEditMode = false;
    this.restaurantesForm.reset();
    this.visible = true;
  }

  abrirModalEdicao(restaurante: any): void {
    this.isEditMode = true;
    this.restauranteSelecionado = restaurante;

    this.restaurantesForm.patchValue({
      nome: restaurante.nome,
      cnpj: restaurante.cnpj,
      endereco: restaurante.endereco,
      estado: restaurante.estado
    });

    this.visible = true;
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
}
