import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FuncionarioService } from '../../../../services/funcionarios.service';

@Component({
  selector: 'app-crud-admin',
  standalone: true,
  imports: [
    TableModule,
    CommonModule
  ],
  providers: [
    FuncionarioService
  ],
  templateUrl: './crud-admin.component.html',
  styleUrl: './crud-admin.component.scss'
})
export class CrudAdminComponent implements OnInit {

  products!: any;

  constructor(private funcionarioService: FuncionarioService ) {}

  ngOnInit() {
this.getFuncionario()
  }

  getFuncionario(): any {
    this.funcionarioService.getFuncionario().subscribe((data: any) => {
      this.products = data;
  });
  }
}
