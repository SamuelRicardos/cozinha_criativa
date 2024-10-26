import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import { ReceitaService } from '../../../services/receitas.service';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-test-pdf',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    PdfViewerModule,
    TooltipModule
  ],
  templateUrl: './test-pdf.component.html',
  styleUrl: './test-pdf.component.scss'
})
export class TestPdfComponent implements OnInit {
@ViewChild('content', {static: false}) el!: ElementRef;
descricaoReceitas: any[] = [];
visible: boolean = false;
imprimirLivro: string = "Imprimir livro"

  constructor(private receitasService: ReceitaService) {}

  ngOnInit(): void {
    this.getReceitas()
  }

  criacaoPDF() {
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

  showDialog() {
      this.visible = true;
  }

  getReceitas() {
    this.receitasService.getReceitas().subscribe((descricaoReceitas)=> {
      this.descricaoReceitas = descricaoReceitas;
      console.log(this.descricaoReceitas[0].descricao);
    });
  }

}
