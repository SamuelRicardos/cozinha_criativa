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
    FormsModule
  ],
  templateUrl: './crud-admin-restaurantes.component.html',
  styleUrl: './crud-admin-restaurantes.component.scss'
})
export class CrudAdminRestaurantesComponent implements OnInit {
  editarRestaurante: string = "Editar restaurante"
  excluirRestaurante: string = "Excluir restaurante"

  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;
valoresSelecionados: any[] = [];

  constructor(private restauranteService: RestauranteService ) {}

  ngOnInit() {
this.getFuncionario()
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
}
