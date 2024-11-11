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
  ],
  providers: [
    MessageService
  ],
  templateUrl: './crud-admin-livros.component.html',
  styleUrl: './crud-admin-livros.component.scss'
})
export class CrudAdminLivrosComponent {
  visualizarLivro: string = "Ver livro"
  baixarLivro: string = "Baixar livro"
  editarLivro: string = "Editar livro"
  inserirLivro: string = "Insira o nome de um livro"
  inserirAutor: string = "Insira um autor de um livro"
  inserirISBN: string = "Insira o ISBN de um livro"
  livro: any[] = [];
  @ViewChild('dt2') dt2!: Table;
  visible: boolean = false;
  items: any;
  descricaoReceitas: any[] = [];
  logoUrl = '../../../../../assets/logo_melhorzinha.png'
  livroIdDois: any;
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
      this.livro = dataLivros;
    });
  }

  getReceitas(): any {
    this.receitaService.getReceitasPorLivroId(this.livroIdDois).subscribe((dataReceitas) => {
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

  async criacaoPDF(livroId: number) {
    this.livroService.getLivroPorId(livroId).subscribe((livro: { nomeLivro: string | string[]; autorLivro: any; }) => {
      this.receitaService.getReceitasPorLivroId(livroId).subscribe(receitas => {
        this.descricaoReceitas = receitas;
  
        const doc = new jsPDF();
        const margins = { top: 30, bottom: 30, left: 10, right: 10 };
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
        let y = margins.top;
  
        doc.setFont('Times');
        doc.setFontSize(24);
  
        // Capa
        doc.addImage(this.logoUrl, 'PNG', 80, 47, 50, 50);
        doc.text(livro.nomeLivro, 105, 120, { align: 'center' });
        doc.setFontSize(16);
        doc.text(`Autor(a): ${livro.autorLivro}`, 105, 140, { align: 'center' });
        doc.text('As melhores receitas com os ingredientes perfeitos', 105, 160, { align: 'center' });
        doc.addPage();
  
        // Índice (placeholder)
        const indice = this.descricaoReceitas.map((receita) => ({ nome: receita.nomeReceitas, page: 0 }));
        let pageIndex = 2; // Páginas 1 e 2 são capa e índice
  
        this.descricaoReceitas.forEach((receita, index) => {
          pageIndex++;
          indice[index].page = pageIndex;
  
          // Nova página para cada receita
          doc.addPage();
          y = margins.top;
  
          // Título da receita
          doc.setFontSize(18);
          doc.text(`Receita: ${receita.nomeReceitas}`, margins.left, y);
          y += 10;
          doc.setFontSize(10);
          doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10); // Número da página na primeira página da receita
  
          // Imagem da receita
          if (receita.imagemUrl) {
            doc.addImage(receita.imagemUrl, 'PNG', margins.left, y, 50, 50);
            y += 60;
          }
  
          // Descrição
          doc.setFontSize(12);
          const splitDescricao = doc.splitTextToSize(receita.descricao, pageWidth);
          splitDescricao.forEach((line: string | string[]) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              pageIndex++;
              doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10); // Número da página em todas as páginas
              y = margins.top;
            }
            doc.text(line, margins.left, y);
            y += 10;
          });
  
          // Ingredientes
          y += 10;
          doc.text('Ingredientes:', margins.left, y);
          y += 10;
  
          let ingredientes: string[] = Array.isArray(receita.ingredientes)
            ? receita.ingredientes
            : receita.ingredientes.split(/(?<=\.)\s*/);
  
          ingredientes.forEach((ingrediente) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              pageIndex++;
              doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10); // Número da página em todas as páginas
              y = margins.top;
            }
            doc.text(`- ${ingrediente.trim()}`, margins.left + 10, y);
            y += 10;
          });
  
          // Modo de preparo
          y += 10;
          doc.text('Modo de Preparo:', margins.left, y);
          y += 10;
  
          let modoPreparo: string[] = Array.isArray(receita.modoPreparo)
            ? receita.modoPreparo
            : receita.modoPreparo.split(/(?<=\.)\s*/);
  
          modoPreparo.forEach((etapa) => {
            const linhasEtapa = doc.splitTextToSize(`- ${etapa.trim()}`, pageWidth);
            linhasEtapa.forEach((linha: string | string[]) => {
              if (y + 10 > pageHeight - margins.bottom) {
                doc.addPage();
                pageIndex++;
                doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10); // Número da página em todas as páginas
                y = margins.top;
              }
              doc.text(linha, margins.left, y);
              y += 10;
            });
          });
  
          // Porções, Cozinheiro e Data de lançamento
          // Repetição para adicionar número de página em cada nova página criada durante esses blocos também
          y += 10;
          doc.text('Porções:', margins.left, y);
          y += 10;
          const quantidadePessoas = doc.splitTextToSize(receita.quantidadePessoas, pageWidth);
          quantidadePessoas.forEach((line: string | string[]) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              pageIndex++;
              doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10);
              y = margins.top;
            }
            doc.text(line, margins.left, y);
            y += 10;
          });
  
          y += 10;
          doc.text('Receita feita por:', margins.left, y);
          y += 10;
          const cozinheiroResponsavel = doc.splitTextToSize(receita.cozinheiroResponsavel, pageWidth);
          cozinheiroResponsavel.forEach((line: string | string[]) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              pageIndex++;
              doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10);
              y = margins.top;
            }
            doc.text(line, margins.left, y);
            y += 10;
          });
  
          y += 10;
          doc.text('Data de lançamento:', margins.left, y);
          y += 10;
          const dataLancamento = doc.splitTextToSize(receita.dtlancamento, pageWidth);
          dataLancamento.forEach((line: string | string[]) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              pageIndex++;
              doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10);
              y = margins.top;
            }
            doc.text(line, margins.left, y);
            y += 10;
          });
        });
  
        // Índice na página 2
        doc.setPage(2);
        y = margins.top + 15;
        doc.setFontSize(14);
        doc.text('Índice', pageWidth / 2 + margins.left, margins.top, { align: 'center' });
  
        indice.forEach((item, index) => {
          doc.text(`${index + 1}. ${item.nome} ................................... ${item.page}`, margins.left, y);
          y += 10;
        });
  
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      });
    });
  }
  

  baixarPDF() {
    const doc = new jsPDF();
    const margins = { top: 30, bottom: 30, left: 10, right: 10 };
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
    let y = margins.top;

    doc.setFont('Times');
    doc.setFontSize(24);

    // Capa
    doc.addImage(this.logoUrl, 'PNG', 80, 47, 50, 50);
    doc.text('Livro de Receitas', 105, 120, { align: 'center' });
    doc.setFontSize(16);
    doc.text('As melhores receitas com os ingredientes perfeitos', 105, 140, { align: 'center' });
    doc.addPage();  // Adiciona nova página após a capa para o índice

    // Preparar o índice com placeholders para número de página das receitas
    const indice = this.descricaoReceitas.map((receita) => ({ nome: receita.nomeReceitas, page: 0 }));

    // Variável para acompanhar a página atual
    let pageIndex = 2; // Páginas 1 e 2 são capa e índice

    // Iterar sobre cada receita para adicionar conteúdo e coletar numeração
    this.descricaoReceitas.forEach((receita, index) => {
      pageIndex++; // Avança para a próxima página
      indice[index].page = pageIndex; // Define a página correta no índice para cada receita

      // Adiciona nova página para a receita
      doc.addPage();
      y = margins.top;

      // Título da receita
      doc.setFontSize(18);
      doc.text(`Receita: ${receita.nomeReceitas}`, margins.left, y);
      y += 10;

      // Imagem da receita, se existir
      if (receita.imagemUrl) {
        doc.addImage(receita.imagemUrl, 'PNG', margins.left, y, 50, 50);
        y += 60;
      }

      // Descrição
      doc.setFontSize(12);
      const splitDescricao = doc.splitTextToSize(receita.descricao, pageWidth);
      splitDescricao.forEach((line: string | string[]) => {
        if (y + 10 > pageHeight - margins.bottom) {
          doc.addPage();
          pageIndex++;
          y = margins.top;
        }
        doc.text(line, margins.left, y);
        y += 10;
      });

      // Ingredientes
      y += 10;
      doc.setFontSize(14);
      doc.text('Ingredientes:', margins.left, y);
      y += 10;
      const ingredientes = doc.splitTextToSize(receita.ingredientes, pageWidth);
      ingredientes.forEach((line: string | string[]) => {
        if (y + 10 > pageHeight - margins.bottom) {
          doc.addPage();
          pageIndex++;
          y = margins.top;
        }
        doc.text(line, margins.left, y);
        y += 10;
      });

      // Modo de preparo
      y += 10;
      doc.text('Modo de Preparo:', margins.left, y);
      y += 10;
      const modoPreparo = doc.splitTextToSize(receita.modoPreparo, pageWidth);
      modoPreparo.forEach((line: string | string[]) => {
        if (y + 10 > pageHeight - margins.bottom) {
          doc.addPage();
          pageIndex++;
          y = margins.top;
        }
        doc.text(line, margins.left, y);
        y += 10;
      });

      // Porções, Cozinheiro Responsável e Data de lançamento
      y += 10;
      doc.text('Porções:', margins.left, y);
      y += 10;
      const quantidadePessoas = doc.splitTextToSize(receita.quantidadePessoas, pageWidth);
      quantidadePessoas.forEach((line: string | string[]) => {
        if (y + 10 > pageHeight - margins.bottom) {
          doc.addPage();
          pageIndex++;
          y = margins.top;
        }
        doc.text(line, margins.left, y);
        y += 10;
      });

      y += 10;
      doc.text('Receita feita por:', margins.left, y);
      y += 10;
      const cozinheiroResponsavel = doc.splitTextToSize(receita.cozinheiroResponsavel, pageWidth);
      cozinheiroResponsavel.forEach((line: string | string[]) => {
        if (y + 10 > pageHeight - margins.bottom) {
          doc.addPage();
          pageIndex++;
          y = margins.top;
        }
        doc.text(line, margins.left, y);
        y += 10;
      });

      y += 10;
      doc.text('Data de lançamento:', margins.left, y);
      y += 10;
      const dataLancamento = doc.splitTextToSize(receita.dtlancamento, pageWidth);
      dataLancamento.forEach((line: string | string[]) => {
        if (y + 10 > pageHeight - margins.bottom) {
          doc.addPage();
          pageIndex++;
          y = margins.top;
        }
        doc.text(line, margins.left, y);
        y += 10;
      });

      // Número da página no canto inferior direito
      doc.setFontSize(10);
      doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10);
    });

    // Volta para a página do índice (página 2) e adiciona entradas com números corretos
    doc.setPage(2);
    y = margins.top + 15;
    doc.setFontSize(14);
    doc.text('Índice', pageWidth / 2 + margins.left, margins.top, { align: 'center' });

    indice.forEach((item, index) => {
      // Use `item.page` para o número correto da página de cada receita
      doc.text(`${index + 1}. ${item.nome} ................................... ${item.page}`, margins.left, y);
      y += 10;
    });

    // Baixar o PDF com o nome especificad
    doc.save('Livro_de_Receitas.pdf');
  }

}
