import { Component } from '@angular/core';
import { Processo } from '../../../core/models/processo.model';
import { ProcessoService } from '../../../core/services/processo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-processo-list',
  templateUrl: './processo-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProcessoListComponent {
  codigoUnidade = '';
  processos: Processo[] = [];
  filtrado: Processo[] = [];
  erro = '';
  filtroGrau = '';
  filtroJustica = '';

  constructor(private processoService: ProcessoService) {}

  get grausUnicos(): string[] {
    return [...new Set(this.processos.map(p => p.grau))];
  }

  get justicasUnicas(): string[] {
    return [...new Set(this.processos.map(p => p.justica))];
  }

  buscar(): void {
    this.erro = '';
    this.processos = [];

    if (!this.codigoUnidade) return;

    this.processoService.buscarPorUnidade(this.codigoUnidade).subscribe({
      next: dados => {
        this.processos = dados;
        this.aplicarFiltros();
      },
      error: err => {
        this.erro = err.message;
      }
    });
  }

  aplicarFiltros(): void {
    this.filtrado = this.processos.filter(p =>
      (!this.filtroGrau || p.grau === this.filtroGrau) &&
      (!this.filtroJustica || p.justica === this.filtroJustica)
    );
  }

  onChangeFiltro(): void {
    this.aplicarFiltros();
  }
}
