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
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { ReceitaService } from '../../../../services/receitas.service';
import { jsPDF } from "jspdf";
import { Router } from '@angular/router';


@Component({
  selector: 'app-crud-editor-livros',
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
    AvatarModule
  ],
  templateUrl: './crud-editor-livros.component.html',
  styleUrl: './crud-editor-livros.component.scss'
})
export class CrudEditorLivrosComponent {
  visualizarLivro: string = "Ver livro"
  baixarLivro: string = "Imprimir livro"
  editarLivro: string = "Editar livro"
  inserirLivro: string = "Insira o nome de um livro"
  inserirAutor: string = "Insira um autor de um livro"
  inserirISBN: string = "Insira o ISBN de um livro"
  products: any[] = [];
  descricaoReceitas: any[] = [];
  logoUrl = '../../../../../assets/logo_melhorzinha.png'
  @ViewChild('dt2') dt2!: Table;
  visible: boolean = false;
items: any;

  constructor(
    private livroService: LivroService,
    private receitaService: ReceitaService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.getLivros();
    this.configurarMenu();
  }

  isActive(route: string): boolean {
    return this.router.url === route; // Verifica se a URL atual é igual à rota passada
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
    });
  }

  filtroReceitas(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
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

  async criacaoPDF() {
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

        // Porções e Data de lançamento
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

    // Salva e abre o PDF na visualização
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl); // Abre o PDF na mesma página
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

      // Porções e Data de lançamento
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

  // Baixar o PDF com o nome especificado
  doc.save('Livro_de_Receitas.pdf');
}

}
