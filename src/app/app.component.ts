import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private meta: Meta, private title: Title) {
    this.meta.addTags([
      { name: 'description', content: 'Encontre a melhor combinação de itens para melhorar a proteção na sua hunt no Tibia, utilizando a calculadora de danos recebidos.' },
      { name: 'keywords', content: 'Tibia, Calculadora de Danos, Danos Recebidos, Damage Input' },
    ])
    this.title.setTitle("Portal Ze Tibinha");
  }
}
