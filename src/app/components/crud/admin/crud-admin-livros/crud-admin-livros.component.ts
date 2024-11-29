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
import { ToastrService } from 'ngx-toastr';

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
  nomeAutorLivro: any;
  nomeAutor: any;

  constructor(
    private livroService: LivroService,
    public messagemService: MessageService,
    private receitaService: ReceitaService,
    private router: Router,
    private tostr: ToastrService
  ) { }

  ngOnInit() {
    this.getLivros();
    this.configurarMenu();
    this.getReceitas()
    this.inicializarFormulario()
    this.nomeAutor = sessionStorage.getItem('username') || 'Nome não encontrado';
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
      this.tostr.warning('Preencha todos os campos obrigatórios!');
      return;
    }

    // Obtendo o nome do usuário logado do sessionStorage
    const nomeAutor = sessionStorage.getItem('username');

    // Verifique se o nome do usuário está disponível
    if (!nomeAutor) {
      this.tostr.warning('Nome do autor não encontrado!');
      return;
    }

    // Obtendo os dados do formulário
    const livro = {
      titulo: this.livrosForm.value.titulo,
      cod_isbn: this.livrosForm.value.cod_isbn,
      receitasIds: this.livrosForm.value.receitas.map((receita: any) => receita.id_receita),
      autorLivro: nomeAutor, // Atribuindo o nome do autor
    };

    // Enviando os dados para o backend
    this.livroService.criarLivro(livro).subscribe({
      next: () => {
        this.tostr.success('Livro cadastrado com sucesso!');
        this.visible = false; // Fecha o modal
        this.getLivros(); // Atualiza a lista de livros
        this.livrosForm.reset(); // Limpa o formulário
      },
      error: () => {
        this.tostr.error('Não foi possível cadastrar o livro. Tente novamente.');
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
    this.livroService.getLivros().subscribe((livros: any[]) => {
      const livro = livros.find((l: any) => l.id === livroId);
      if (!livro) {
        console.error('Livro não encontrado');
        return;
      }

      this.livroService.getReceitasPorLivroId(livroId).subscribe(receitas => {
        this.descricaoReceitas = receitas;

        const doc = new jsPDF();
        const margins = { top: 30, bottom: 30, left: 10, right: 10 };
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
        let y = margins.top;

        // Declaração do tipo para o índice
        interface Indice {
          nome: string;
          page: number;
        }
        const indice: Indice[] = [];
        const nomeAutor = sessionStorage.getItem('username');
        // Capa
        doc.setFont('Times');
        doc.setFontSize(24);
        doc.addImage(this.logoUrl, 'PNG', 80, 47, 50, 50);
        doc.text(livro.titulo, 105, 120, { align: 'center' });
        doc.setFontSize(16);
        doc.text(`Autor: ${nomeAutor}`, 105, 140, { align: 'center' });
        doc.text('As melhores receitas com os ingredientes perfeitos', 105, 160, { align: 'center' });
        doc.addPage();

        // Índice
        doc.setFontSize(16);
        doc.text('Índice', margins.left, y);
        y += 10;
        this.descricaoReceitas.forEach((receita, i) => {
          indice.push({ nome: receita.nome, page: 0 });
          doc.text(`${i + 1}. ${receita.nome}`, margins.left, y);
          y += 10;
          if (y + 10 > pageHeight - margins.bottom) {
            doc.addPage();
            y = margins.top;
          }
        });
        doc.addPage();

        // Adicionar receitas
        this.descricaoReceitas.forEach((receita, index) => {
          if (index > 0) {
            doc.addPage();
            y = margins.top;
          }
          indice[index].page = doc.getNumberOfPages();

          // Título
          doc.setFontSize(18);
          doc.text(`Receita: ${receita.nome}`, margins.left, y);
          y += 10;

          // Descrição
          doc.setFontSize(12);
          const splitDescricao = doc.splitTextToSize(receita.descricao || '', pageWidth);
          splitDescricao.forEach((line: string | string[]) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              y = margins.top;
            }
            doc.text(line, margins.left, y);
            y += 10;
          });

          // Ingredientes
          y += 10;
          doc.text('Ingredientes:', margins.left, y);
          y += 10;
          if (receita.ingredientes && Array.isArray(receita.ingredientes)) {
            receita.ingredientes.forEach((ingrediente: { nome: any; descricao: any; }) => {
              if (y + 10 > pageHeight - margins.bottom) {
                doc.addPage();
                y = margins.top;
              }
              doc.text(`- ${ingrediente.nome}: ${ingrediente.descricao}`, margins.left + 10, y);
              y += 10;
            });
          }

          // Modo de preparo
          y += 10;
          doc.text('Modo de Preparo:', margins.left, y);
          y += 10;
          const modoPreparo = Array.isArray(receita.modo_preparo)
            ? receita.modo_preparo
            : receita.modo_preparo?.split(/(?<=\.)\s*/) || [];
          modoPreparo.forEach((passo: string) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              y = margins.top;
            }
            doc.text(`- ${passo.trim()}`, margins.left + 10, y);
            y += 10;
          });
        });

        // Salvar PDF
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      });
    });
  }


  baixarPDF(livroId: number) {
    this.livroService.getLivros().subscribe((livros: any[]) => {
      const livro = livros.find((l: any) => l.id === livroId);
      if (!livro) {
        console.error('Livro não encontrado');
        return;
      }

      this.livroService.getReceitasPorLivroId(livroId).subscribe(receitas => {
        this.descricaoReceitas = receitas;

        const doc = new jsPDF();
        const margins = { top: 30, bottom: 30, left: 10, right: 10 };
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
        let y = margins.top;

        // Declaração do tipo para o índice
        interface Indice {
          nome: string;
          page: number;
        }
        const indice: Indice[] = [];
        const nomeAutor = sessionStorage.getItem('username');
        // Capa
        doc.setFont('Times');
        doc.setFontSize(24);
        doc.addImage(this.logoUrl, 'PNG', 80, 47, 50, 50);
        doc.text(livro.titulo, 105, 120, { align: 'center' });
        doc.setFontSize(16);
        doc.text(`Autor: ${nomeAutor}`, 105, 140, { align: 'center' });
        doc.text('As melhores receitas com os ingredientes perfeitos', 105, 160, { align: 'center' });
        doc.addPage();

        // Índice
        doc.setFontSize(16);
        doc.text('Índice', margins.left, y);
        y += 10;
        this.descricaoReceitas.forEach((receita, i) => {
          indice.push({ nome: receita.nome, page: 0 });
          doc.text(`${i + 1}. ${receita.nome}`, margins.left, y);
          y += 10;
          if (y + 10 > pageHeight - margins.bottom) {
            doc.addPage();
            y = margins.top;
          }
        });
        doc.addPage();

        // Adicionar receitas
        this.descricaoReceitas.forEach((receita, index) => {
          if (index > 0) {
            doc.addPage();
            y = margins.top;
          }
          indice[index].page = doc.getNumberOfPages();

          // Título
          doc.setFontSize(18);
          doc.text(`Receita: ${receita.nome}`, margins.left, y);
          y += 10;

          // Descrição
          doc.setFontSize(12);
          const splitDescricao = doc.splitTextToSize(receita.descricao || '', pageWidth);
          splitDescricao.forEach((line: string | string[]) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              y = margins.top;
            }
            doc.text(line, margins.left, y);
            y += 10;
          });

          // Ingredientes
          y += 10;
          doc.text('Ingredientes:', margins.left, y);
          y += 10;
          if (receita.ingredientes && Array.isArray(receita.ingredientes)) {
            receita.ingredientes.forEach((ingrediente: { nome: any; descricao: any; }) => {
              if (y + 10 > pageHeight - margins.bottom) {
                doc.addPage();
                y = margins.top;
              }
              doc.text(`- ${ingrediente.nome}: ${ingrediente.descricao}`, margins.left + 10, y);
              y += 10;
            });
          }

          // Modo de preparo
          y += 10;
          doc.text('Modo de Preparo:', margins.left, y);
          y += 10;
          const modoPreparo = Array.isArray(receita.modo_preparo)
            ? receita.modo_preparo
            : receita.modo_preparo?.split(/(?<=\.)\s*/) || [];
          modoPreparo.forEach((passo: string) => {
            if (y + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              y = margins.top;
            }
            doc.text(`- ${passo.trim()}`, margins.left + 10, y);
            y += 10;
          });
        });

        doc.save(`${livro.titulo}.pdf`); // O arquivo será baixado com o nome "livro_titulo_receitas.pdf"
      });
    });

  }


}
