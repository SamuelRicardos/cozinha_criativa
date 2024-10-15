import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FuncionarioService } from '../../../../services/funcionarios.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-crud-admin',
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
    MenuModule,
    AvatarModule
  ],
  providers: [
    FuncionarioService
  ],
  templateUrl: './crud-admin.component.html',
  styleUrl: './crud-admin.component.scss'
})
export class CrudAdminComponent implements OnInit {
  editarFuncionario: string = "Editar funcionário"
  excluirFuncionario: string = "Excluir funcionário"
  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  items: any;

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit() {
    this.getFuncionario()
    this.itemsMenu();
  }

  getFuncionario(): any {
    this.funcionarioService.getFuncionario().subscribe((data: any) => {
      this.products = data;
    });
  }

  filtroFuncionarios(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  itemsMenu() {
    this.items = [
      {
        label: 'Perfil',
        items: [
          {
            label: 'Administrador',
            icon: 'pi pi-user',
        },
            {
                label: 'Configurações',
                icon: 'pi pi-cog',
            },
            {
                label: 'Sair',
                icon: 'pi pi-sign-out',
            }
        ]
    },
    ];
  }

}
