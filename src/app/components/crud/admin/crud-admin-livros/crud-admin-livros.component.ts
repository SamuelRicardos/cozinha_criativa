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
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { TestPdfComponent } from "../../../test/test-pdf/test-pdf.component";
import { jsPDF } from "jspdf";
import { ReceitaService } from '../../../../services/receitas.service';

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
    TooltipModule,
    DialogModule,
    DynamicDialogModule,
    MenuModule,
    AvatarModule,
    TestPdfComponent
],
  providers: [
    MessageService
  ],
  templateUrl: './crud-admin-livros.component.html',
  styleUrl: './crud-admin-livros.component.scss'
})
export class CrudAdminLivrosComponent {
  visualizarLivro: string = "Ver livro"
  imprimirLivro: string = "Imprimir livro"
  editarLivro: string = "Editar livro"
  inserirLivro: string = "Insira o nome de um livro"
  inserirAutor: string = "Insira um autor de um livro"
  inserirISBN: string = "Insira o ISBN de um livro"
  products: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  visible: boolean = false;
items: any;
descricaoReceitas: any[] = [];

  constructor(
    private livroService: LivroService,
    public messagemService: MessageService,
    private receitaService: ReceitaService
  ) { }

  ngOnInit() {
    this.getLivros();
    this.itemsMenu();
    this.getReceitas()
  }

  

  showDialog() {
    this.visible = true;
}

  getLivros(): any {
    this.livroService.getLivros().subscribe((dataLivros: any) => {
      this.products = dataLivros;
    });
  }
  
  getReceitas(): any {
    this.receitaService.getReceitas().subscribe((dataReceitas) => {
      this.descricaoReceitas = dataReceitas;
    })
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

  criacaoPDF() {
    // Imagem da Receita
    // Nome da Receita
    // Descricao da Receita
    // Ingredientes da receita
    // Modo de preparo da Receita
    const doc = new jsPDF();
    const margins = {
      top: 30,
      bottom: 30,
      left: 10,
      right: 10
    };
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
    let y = margins.top;

    doc.setFont('Times');
    doc.setFontSize(18);
    doc.text('Minhas Receitas', margins.left, y);
    y += 10;  // Espaçamento após o título

    // Iterar sobre cada receita
    this.descricaoReceitas.forEach((receita, index) => {
      doc.setFontSize(14);
      y += 10;
      doc.text(`Receita: ${receita.nomeReceitas}`, margins.left, y);
      y += 10;

      // Preparar e dividir o texto em linhas
      doc.setFontSize(12);
      const splitDescricao = doc.splitTextToSize(receita.descricao, pageWidth);
      splitDescricao.forEach((line: string | string[]) => {
        if (y + 10 > pageHeight - margins.bottom) {
          doc.addPage();  // Nova página se ultrapassar o limite
          y = margins.top;
        }
        doc.text(line, margins.left, y);
        y += 10;
      });

      // Adicionar data de lançamento
      y += 5;
      doc.setFontSize(10);
      doc.text(`Data de lançamento: ${receita.dtlancamento}`, margins.left, y);

      // Adicionar nova página se houver próxima receita
      if (index < this.descricaoReceitas.length - 1) {
        doc.addPage();
        y = margins.top;
      }
    });

    // Salvar e abrir o PDF na visualização
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);  // Abre o PDF na mesma página (ou altere para iframe se precisar exibir inline)
  }
}
