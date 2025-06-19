import { Component, OnInit } from '@angular/core';
import { Parte } from '../../../core/models/parte.model';
import { ParteService } from '../../../core/services/parte.service';
import { CommonModule } from '@angular/common';
import { ParteFormComponent } from './parte-form.component';

@Component({
  selector: 'app-parte-list',
  templateUrl: './parte-list.component.html',
  standalone: true,
  imports: [CommonModule, ParteFormComponent]
})
export class ParteListComponent implements OnInit {
  partes: Parte[] = [];
  parteSelecionada?: Parte;
  editando = false;

  constructor(private parteService: ParteService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.partes = this.parteService.getPartes();
  }

  salvar(parte: Parte): void {
    if (this.parteSelecionada) {
      this.parteService.updateParte(parte);
      this.editando = false;
    } else {
      this.parteService.addParte(parte);
    }
    this.parteSelecionada = undefined;
    this.carregar();
  }

  editar(parte: Parte): void {
    this.parteSelecionada = { ...parte };
    this.editando = true;
  }

  cancelarEdicao(): void {
    this.parteSelecionada = undefined;
    this.editando = false;
  }

  remover(id: string): void {
    if (confirm('Tem certeza que deseja remover esta parte?')) {
      this.parteService.deleteParte(id);
      this.carregar();
      
      if (this.parteSelecionada?.id === id) {
        this.cancelarEdicao();
      }
    }
  }
}
