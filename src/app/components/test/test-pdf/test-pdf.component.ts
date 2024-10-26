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
    PdfViewerModule
  ],
  templateUrl: './test-pdf.component.html',
  styleUrl: './test-pdf.component.scss'
})
export class TestPdfComponent implements OnInit {
@ViewChild('content', {static: false}) el!: ElementRef;
descricaoReceitas: any[] = [];
visible: boolean = false;

  constructor(private receitasService: ReceitaService) {}

  ngOnInit(): void {
    this.getReceitas()
  }

  criacaoPDF() {
    const margins = {
      top: 30,
      bottom: 30,
      left: 10,
      right: 10
    }
    const doc = new jsPDF();
    doc.setFont('Times');
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth() - 20;  // Margem de 10 unidades em ambos os lados
    doc.text('Minhas receitas', margins.left , margins.top);
    
    doc.setFontSize(12);
    doc.text(this.descricaoReceitas[0].descricao, margins.left, 50);

    doc.save('test.pdf')

    // Define a largura da página (por exemplo, 180 unidades, descontando margens)
    // const pageWidth = doc.internal.pageSize.getWidth() - 20;  // Margem de 10 unidades em ambos os lados
    // const text = this.descricaoReceitas[0].descricao;
    
    // Quebrar o texto para caber na página
    // const splitText = doc.splitTextToSize(text, pageWidth);

    // Adicionar o texto quebrado ao PDF
    // doc.text(splitText, 10, 10);
    // Salvar o PDF e abrir em uma nova aba
    // doc.output('bloburl');
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
