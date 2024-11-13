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
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
    DialogModule,
    DynamicDialogModule,
    MenuModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule

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
  inserirFuncionario: string = "Insira um nome de funcionário"
  inserirCargo: string = "Insira um cargo"
  inserirRg: string = "Insira um rg"
  inserirSalario: string = "Insira um salário"
  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  items: any;
  visible: boolean = false;
  receitasForm!: FormGroup<any>;
  id: any;

  constructor(
    private funcionarioService: FuncionarioService,
    private tostr: ToastrService
  ) {
    this.receitasForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      rg: new FormControl('', [Validators.required]),
      salario: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.getFuncionario()
    this.itemsMenu();
  }

  getFuncionario(): any {
    this.funcionarioService.listarTodosFuncionarios().subscribe((data: any) => {
      this.products = data;
      console.log(this.products)
    });
  }

  filtroFuncionarios(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  showDialog() {
    this.visible = true;
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

  enviarFuncionarios() {
    this.funcionarioService.adicionarFuncionarios(this.receitasForm.value.nome, this.receitasForm.value.rg, this.receitasForm.value.salario).subscribe({
      next: () => {
        this.tostr.success("Funcionário adicionado com sucesso!"),
        this.getFuncionario();
      },
      error: () => this.tostr.error("Não foi possível adicionar o funcionário, tente novamente")
    })
  }

  deletarFuncionarios(id: number) {
    this.funcionarioService.deletarFuncionario(id).subscribe({
      next: () => {
        this.tostr.success("Funcionário deletado com sucesso!"),
        this.getFuncionario();
        this.visible = false;
      },
      error: () => this.tostr.error("Não foi possível deletar o funcionário, tente novamente")
    })
  }
}
