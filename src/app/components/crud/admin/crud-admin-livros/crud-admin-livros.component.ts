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
import { jsPDF } from "jspdf";
import { ReceitaService } from '../../../../services/receitas.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    ReactiveFormsModule
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
  livrosForm!: FormGroup<any>;
  @ViewChild('dt2') dt2!: Table;
  visible: boolean = false;
  items: any;
  receitas: any[] = [];
  logoUrl = '../../../../../assets/logo_melhorzinha.png'
  receitaSelecionada: any = {};
  descricaoReceitas: any[] = [];
  
  constructor(
    private livroService: LivroService,
    public messagemService: MessageService,
    private receitaService: ReceitaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLivros();
    this.configurarMenu();
    this.getReceitas()
    this.inicializarFormulario()
  }

  inicializarFormulario(): void {
    this.livrosForm = new FormGroup({
      titulo: new FormControl(''), // Controle para o ID
      cod_isbn: new FormControl('', [Validators.required]),
      receitas: new FormControl('', [Validators.required]),
    });
  }

  isActive(route: string): boolean {
    return this.router.url === route; // Verifica se a URL atual é igual à rota passada
  }

  showDialog() {
    this.visible = true;
  }

  getLivros(): any {
    this.livroService.getLivros().subscribe((dataLivros: any) => {
      this.livro = dataLivros;
      console.log(this.livro)
    });
  }

  getReceitas(): any {
    this.receitaService.getReceitas().subscribe((dataReceitas) => {
      this.receitas = dataReceitas;
      console.log(this.receitas)
    })
  }

  adicionarLivro(): void {
    if (this.livrosForm.invalid) {
      this.messagemService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios!' });
      return;
    }
  
    // Obtendo os dados do formulário
    const livro = {
      titulo: this.livrosForm.value.titulo,
      cod_isbn: this.livrosForm.value.cod_isbn,
      receitasIds: this.livrosForm.value.receitas.map((receita: any) => receita.id_receita), // Extrai os IDs das receitas selecionadas
      
    };
  console.log(livro)
    // Enviando os dados para o backend
    this.livroService.criarLivro(livro).subscribe({
      next: () => {
        this.messagemService.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro cadastrado com sucesso!' });
        this.visible = false; // Fecha o modal
        this.getLivros(); // Atualiza a lista de livros
        this.livrosForm.reset(); // Limpa o formulário
      },
      error: () => {
        this.messagemService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível cadastrar o livro. Tente novamente.' });
      },
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

  getReceitasPorLivro(livroId: number): void {
    this.livroService.getReceitasPorLivroId(livroId).subscribe({
      next: (dataReceitas) => {
        this.receitas = dataReceitas;
        console.log(this.receitas);
      },
      error: (err) => {
        console.error('Erro ao carregar as receitas', err);
      }
    });
  }

  async criacaoPDF(livroId: number) {
    // Obtenha o livro pelo ID
    this.livroService.getLivros().subscribe((livros: any[]) => {
        const livro = livros.find((l: any) => l.id === livroId); // Encontrar o livro pelo ID
    
        if (!livro) {
            console.error('Livro não encontrado');
            return;
        }
    
        // Obtenha as receitas relacionadas ao livro
        this.livroService.getReceitasPorLivroId(livroId).subscribe(receitas => {
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
            doc.text(livro.titulo, 105, 120, { align: 'center' });
            doc.setFontSize(16);
            doc.text(`Autor(a): ${livro.autorLivro}`, 105, 140, { align: 'center' });
            doc.text('As melhores receitas com os ingredientes perfeitos', 105, 160, { align: 'center' });
            doc.addPage(); // Adiciona uma nova página para o índice
    
            // Índice
            const indice = this.descricaoReceitas.map((receita) => ({ nome: receita.nome, page: 0 }));
            let pageIndex = 2; // Páginas 1 e 2 são capa e índice
            doc.setFontSize(16);
            doc.text('Índice', margins.left, y);
            y += 10;
    
            // Adicionando o índice antes de adicionar as receitas
            this.descricaoReceitas.forEach((receita, index) => {
                pageIndex++;
                indice[index].page = pageIndex;
                doc.text(`${receita.nome}: página ${pageIndex}`, margins.left, y);
                y += 10;
            });
            doc.addPage(); // Adiciona uma nova página para as receitas
    
            // Adicionando as receitas
            this.descricaoReceitas.forEach((receita, index) => {
                pageIndex++;
                let receitaY = margins.top;
    
                // Título da receita
                doc.setFontSize(18);
                doc.text(`Receita: ${receita.nome}`, margins.left, receitaY);
                receitaY += 10;
    
                // Descrição
                doc.setFontSize(12);
                const splitDescricao = doc.splitTextToSize(receita.descricao || '', pageWidth); 
                splitDescricao.forEach((line: string | string[]) => {
                    if (receitaY + 10 > pageHeight - margins.bottom) {
                        doc.addPage();
                        pageIndex++;
                        receitaY = margins.top;
                    }
                    doc.text(line, margins.left, receitaY);
                    receitaY += 10;
                });
    
                // Ingredientes
                receitaY += 10;
                doc.text('Ingredientes:', margins.left, receitaY);
                receitaY += 10;
    
                if (receita.ingredientes && Array.isArray(receita.ingredientes)) {
                    receita.ingredientes.forEach((ingrediente: any) => {
                        if (receitaY + 10 > pageHeight - margins.bottom) {
                            doc.addPage();
                            pageIndex++;
                            receitaY = margins.top;
                        }
                        doc.text(`- ${ingrediente.nome}: ${ingrediente.descricao}`, margins.left + 10, receitaY);
                        receitaY += 10;
                    });
                }
    
                // Modo de preparo
                receitaY += 10;
                doc.text('Modo de Preparo:', margins.left, receitaY);
                receitaY += 10;
    
                let modoPreparo: string[] = Array.isArray(receita.modo_preparo)
                    ? receita.modo_preparo
                    : (receita.modo_preparo ? receita.modo_preparo.split(/(?<=\.)\s*/) : []);
    
                modoPreparo.forEach((preparo) => {
                    if (receitaY + 10 > pageHeight - margins.bottom) {
                        doc.addPage();
                        pageIndex++;
                        receitaY = margins.top;
                    }
                    doc.text(`- ${preparo.trim()}`, margins.left + 10, receitaY);
                    receitaY += 10;
                });
            });
    
            // Salvando o PDF
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl);
        });
    });
}

  
  // baixarPDF() {
  //   const doc = new jsPDF();
  //   const margins = { top: 30, bottom: 30, left: 10, right: 10 };
  //   const pageHeight = doc.internal.pageSize.getHeight();
  //   const pageWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
  //   let y = margins.top;

  //   doc.setFont('Times');
  //   doc.setFontSize(24);

  //   // Capa
  //   doc.addImage(this.logoUrl, 'PNG', 80, 47, 50, 50);
  //   doc.text('Livro de Receitas', 105, 120, { align: 'center' });
  //   doc.setFontSize(16);
  //   doc.text('As melhores receitas com os ingredientes perfeitos', 105, 140, { align: 'center' });
  //   doc.addPage();  // Adiciona nova página após a capa para o índice

  //   // Preparar o índice com placeholders para número de página das receitas
  //   const indice = this.descricaoReceitas.map((receita) => ({ nome: receita.nomeReceitas, page: 0 }));

  //   // Variável para acompanhar a página atual
  //   let pageIndex = 2; // Páginas 1 e 2 são capa e índice

  //   // Iterar sobre cada receita para adicionar conteúdo e coletar numeração
  //   this.descricaoReceitas.forEach((receita, index) => {
  //     pageIndex++; // Avança para a próxima página
  //     indice[index].page = pageIndex; // Define a página correta no índice para cada receita

  //     // Adiciona nova página para a receita
  //     doc.addPage();
  //     y = margins.top;

  //     // Título da receita
  //     doc.setFontSize(18);
  //     doc.text(`Receita: ${receita.nomeReceitas}`, margins.left, y);
  //     y += 10;

  //     // Imagem da receita, se existir
  //     if (receita.imagemUrl) {
  //       doc.addImage(receita.imagemUrl, 'PNG', margins.left, y, 50, 50);
  //       y += 60;
  //     }

  //     // Descrição
  //     doc.setFontSize(12);
  //     const splitDescricao = doc.splitTextToSize(receita.descricao, pageWidth);
  //     splitDescricao.forEach((line: string | string[]) => {
  //       if (y + 10 > pageHeight - margins.bottom) {
  //         doc.addPage();
  //         pageIndex++;
  //         y = margins.top;
  //       }
  //       doc.text(line, margins.left, y);
  //       y += 10;
  //     });

  //     // Ingredientes
  //     y += 10;
  //     doc.setFontSize(14);
  //     doc.text('Ingredientes:', margins.left, y);
  //     y += 10;
  //     const ingredientes = doc.splitTextToSize(receita.ingredientes, pageWidth);
  //     ingredientes.forEach((line: string | string[]) => {
  //       if (y + 10 > pageHeight - margins.bottom) {
  //         doc.addPage();
  //         pageIndex++;
  //         y = margins.top;
  //       }
  //       doc.text(line, margins.left, y);
  //       y += 10;
  //     });

  //     // Modo de preparo
  //     y += 10;
  //     doc.text('Modo de Preparo:', margins.left, y);
  //     y += 10;
  //     const modoPreparo = doc.splitTextToSize(receita.modoPreparo, pageWidth);
  //     modoPreparo.forEach((line: string | string[]) => {
  //       if (y + 10 > pageHeight - margins.bottom) {
  //         doc.addPage();
  //         pageIndex++;
  //         y = margins.top;
  //       }
  //       doc.text(line, margins.left, y);
  //       y += 10;
  //     });

  //     // Porções, Cozinheiro Responsável e Data de lançamento
  //     y += 10;
  //     doc.text('Porções:', margins.left, y);
  //     y += 10;
  //     const quantidadePessoas = doc.splitTextToSize(receita.quantidadePessoas, pageWidth);
  //     quantidadePessoas.forEach((line: string | string[]) => {
  //       if (y + 10 > pageHeight - margins.bottom) {
  //         doc.addPage();
  //         pageIndex++;
  //         y = margins.top;
  //       }
  //       doc.text(line, margins.left, y);
  //       y += 10;
  //     });

  //     y += 10;
  //     doc.text('Receita feita por:', margins.left, y);
  //     y += 10;
  //     const cozinheiroResponsavel = doc.splitTextToSize(receita.cozinheiroResponsavel, pageWidth);
  //     cozinheiroResponsavel.forEach((line: string | string[]) => {
  //       if (y + 10 > pageHeight - margins.bottom) {
  //         doc.addPage();
  //         pageIndex++;
  //         y = margins.top;
  //       }
  //       doc.text(line, margins.left, y);
  //       y += 10;
  //     });

  //     y += 10;
  //     doc.text('Data de lançamento:', margins.left, y);
  //     y += 10;
  //     const dataLancamento = doc.splitTextToSize(receita.dtlancamento, pageWidth);
  //     dataLancamento.forEach((line: string | string[]) => {
  //       if (y + 10 > pageHeight - margins.bottom) {
  //         doc.addPage();
  //         pageIndex++;
  //         y = margins.top;
  //       }
  //       doc.text(line, margins.left, y);
  //       y += 10;
  //     });

  //     // Número da página no canto inferior direito
  //     doc.setFontSize(10);
  //     doc.text(`${pageIndex}`, pageWidth + margins.left, pageHeight - 10);
  //   });

  //   // Volta para a página do índice (página 2) e adiciona entradas com números corretos
  //   doc.setPage(2);
  //   y = margins.top + 15;
  //   doc.setFontSize(14);
  //   doc.text('Índice', pageWidth / 2 + margins.left, margins.top, { align: 'center' });

  //   indice.forEach((item, index) => {
  //     // Use `item.page` para o número correto da página de cada receita
  //     doc.text(`${index + 1}. ${item.nome} ................................... ${item.page}`, margins.left, y);
  //     y += 10;
  //   });

  //   // Baixar o PDF com o nome especificad
  //   doc.save('Livro_de_Receitas.pdf');
  // }

}
