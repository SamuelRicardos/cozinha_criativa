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
  products: any[] = [];
  items: any;
  visible: boolean = false;
  receitasForm!: FormGroup<any>;
  text: string = "";

  constructor(
    private receitaService: ReceitaService,
    private messagemService: MessageService
  ) {
    this.receitasForm = new FormGroup({
      nome_receita: new FormControl('', [Validators.required, Validators.email]),
      quantidade_pessoas: new FormControl('', [Validators.required, Validators.minLength(6)]),
      descricao: new FormControl('', Validators.required),
      ingredientes: new FormControl('', Validators.required),
      modo_de_preparo: new FormControl('', Validators.required)
    })
   }

  ngOnInit() {
    this.getReceitas();
    this.itemsMenu();
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

  showDialog() {
    this.visible = true;
  }

  onUpload() {
    this.messagemService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}
}
