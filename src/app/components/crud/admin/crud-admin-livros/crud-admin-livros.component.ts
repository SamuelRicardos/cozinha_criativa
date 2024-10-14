import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { LivroService } from '../../../../services/livros.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-crud-admin-livros',
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
    TooltipModule
  ],
  templateUrl: './crud-admin-livros.component.html',
  styleUrl: './crud-admin-livros.component.scss'
})
export class CrudAdminLivrosComponent {
  visualizarReceita: string = "Ver receita"
  imprimirReceita: string = "Imprimir receita"
  editarReceita: string = "Editar receita"
  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;


  constructor(private livroService: LivroService) { }

  ngOnInit() {
    this.getLivros()
  }

  getLivros(): any {
    this.livroService.getLivros().subscribe((dataLivros: any) => {
      this.products = dataLivros;
    });
  }

  filtroReceitas(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }
}
