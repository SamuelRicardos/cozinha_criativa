import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
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
    AvatarModule
  ],
  templateUrl: './crud-admin-restaurantes.component.html',
  styleUrl: './crud-admin-restaurantes.component.scss'
})
export class CrudAdminRestaurantesComponent implements OnInit {
  editarRestaurante: string = "Editar restaurante"
  excluirRestaurante: string = "Excluir restaurante"
  inserirRestaurante: string = "Insira um nome de restaurante"
  inserirEstados: string = "Insira um estado"

  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  valoresSelecionados: any[] = [];
  items: any;
  visible: boolean = false;

  constructor(
    private restauranteService: RestauranteService,
    private router: Router
    
  ) { }

  isActive(route: string): boolean {
    return this.router.url === route; // Verifica se a URL atual é igual à rota passada
  }

  ngOnInit() {
    this.getFuncionario()
    this.configurarMenu();
  }

  getFuncionario(): any {
    this.restauranteService.getRestaurante().subscribe((dataRestaurante: any) => {
      this.products = dataRestaurante;
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
