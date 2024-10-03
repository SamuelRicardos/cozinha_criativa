import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-senha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './senha.component.html',
  styleUrl: './senha.component.scss'
})
export class SenhaComponent {

  test() {
    alert("Enviamos um email para você!")
  }

}
