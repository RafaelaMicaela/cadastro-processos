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

  // Modal properties
  modalAberto = false;
  unidadeSelecionada: any = null;
  detalhesUnidade: any = null;
  carregandoDetalhes = false;

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

  // Debug - método para verificar dados
  verificarDados(): void {
    console.log('Dados atuais:', {
      processos: this.processos,
      filtrado: this.filtrado,
      codigoUnidade: this.codigoUnidade
    });
  }

  // Método para aplicar filtros
  onChangeFiltro(): void {
    this.aplicarFiltros();
  }

  testarConexao(): void {
    this.erro = '';
    console.log('Testando conexão com API...');

    this.processoService.testarConexao().subscribe({
      next: dados => {
        console.log('Resposta da API:', dados);
        alert('Conexão OK! Verificar console para detalhes.');
      },
      error: err => {
        console.error('Erro na conexão:', err);
        this.erro = 'Erro de conexão: ' + err.message;
      }
    });
  }

  usarDadosMock(): void {
    console.log('🧪 Usando dados mock...');
    this.erro = '';

    this.processoService.buscarProcessosMock().subscribe({
      next: (dados) => {
        console.log('✅ Dados mock recebidos:', dados);
        if (dados && dados.hits && dados.hits.hits) {
          this.processos = dados.hits.hits.map((hit: any, index: number) => ({
            codigoUnidade: hit._source.orgaoJulgador?.codigo?.toString() || '16403',
            numeroProcesso: hit._source.numeroProcesso,
            classeJudicial: hit._source.classe?.nome || 'N/A',
            grau: hit._source.grau,
            tribunal: hit._source.tribunal,
            orgaoJulgador: hit._source.orgaoJulgador?.nome || 'N/A',
            dataAjuizamento: hit._source.dataAjuizamento,
            assuntos: hit._source.assuntos?.map((a: any) => a.nome) || ['Sem assunto'],
            justica: hit._source.grau === 'JE' ? 'Federal' : 'Estadual',
            quantidadeProcessos: Math.floor(Math.random() * 50) + 10
          }));
          this.aplicarFiltros();
          console.log('✅ Processos carregados:', this.processos);
        } else {
          console.error('❌ Estrutura de dados inválida');
          this.erro = 'Estrutura de dados inválida';
        }
      }
    });
  }

  abrirDetalhesUnidade(processo: Processo): void {
    console.log('🔍 Abrindo detalhes para processo:', processo);

    if (!processo) {
      console.error('❌ Processo é nulo ou undefined');
      return;
    }

    this.unidadeSelecionada = processo;
    this.modalAberto = true;
    this.carregandoDetalhes = true;
    this.detalhesUnidade = null;

    // Usa o código da unidade do processo ou o digitado pelo usuário
    const codigoUnidade = processo.codigoUnidade || this.codigoUnidade || '16403';
    console.log('📍 Código da unidade:', codigoUnidade);

    // Para demonstração, vamos usar sempre os dados mock
    this.processoService.buscarDetalhesUnidadeMock(codigoUnidade).subscribe({
      next: (dadosMock) => {
        console.log('✅ Detalhes carregados com sucesso:', dadosMock);
        this.detalhesUnidade = dadosMock;
        this.carregandoDetalhes = false;
      },
      error: (errMock) => {
        console.error('❌ Erro ao carregar detalhes:', errMock);
        this.carregandoDetalhes = false;
        this.erro = 'Erro ao carregar detalhes da unidade';
      }
    });
  }

  fecharModal(): void {
    console.log('🔒 Fechando modal');
    this.modalAberto = false;
    this.unidadeSelecionada = null;
    this.detalhesUnidade = null;
    this.carregandoDetalhes = false;
  }

  // Método para testar modal diretamente
  testarModal(): void {
    console.log('🧪 Testando modal diretamente');
    const processoTeste: Processo = {
      codigoUnidade: '16403',
      numeroProcesso: 'TESTE123',
      assuntos: ['Teste', 'Modal'],
      classeJudicial: 'Teste Classe',
      grau: 'JE',
      justica: 'Federal',
      quantidadeProcessos: 99,
      tribunal: 'TRF1',
      orgaoJulgador: 'Órgão Teste',
      dataAjuizamento: '2023-01-01'
    };

    this.abrirDetalhesUnidade(processoTeste);
  }

  // Método para carregar dados direto sem serviço
  carregarDadosSimples(): void {
    console.log('🎯 Carregando dados simples diretamente');
    this.erro = '';

    this.processos = [
      {
        codigoUnidade: '16403',
        numeroProcesso: '00008323520184013202',
        classeJudicial: 'Procedimento do Juizado Especial Cível',
        grau: 'JE',
        tribunal: 'TRF1',
        orgaoJulgador: 'JEF Adj - Tefé',
        dataAjuizamento: '2018-10-29',
        assuntos: ['Concessão', 'Benefício Previdenciário'],
        justica: 'Federal',
        quantidadeProcessos: 45
      },
      {
        codigoUnidade: '16404',
        numeroProcesso: '00001234520194013203',
        classeJudicial: 'Ação Civil Pública',
        grau: 'G2',
        tribunal: 'TRF1',
        orgaoJulgador: '1ª Vara Federal de Manaus',
        dataAjuizamento: '2019-03-15',
        assuntos: ['Direito Ambiental'],
        justica: 'Estadual',
        quantidadeProcessos: 28
      }
    ];

    this.aplicarFiltros();
    console.log('✅ Dados simples carregados:', this.processos);
  }

  // Método para testar modal com dados simples
  testarModalSimples(): void {
    console.log('🧪 Testando modal com dados simples');

    // Primeiro carrega dados se não existirem
    if (this.processos.length === 0) {
      this.carregarDadosSimples();
    }

    // Usa o primeiro processo para teste
    if (this.processos.length > 0) {
      const processoTeste = this.processos[0];
      console.log('🎯 Abrindo modal para:', processoTeste);

      // Abre modal diretamente sem usar serviço
      this.unidadeSelecionada = processoTeste;
      this.modalAberto = true;
      this.carregandoDetalhes = false;
      this.detalhesUnidade = {
        hits: {
          total: { value: 156 },
          hits: [{
            _source: {
              numeroProcesso: processoTeste.numeroProcesso,
              classe: { nome: processoTeste.classeJudicial },
              grau: processoTeste.grau,
              orgaoJulgador: {
                codigo: parseInt(processoTeste.codigoUnidade),
                nome: processoTeste.orgaoJulgador,
                municipio: 'Tefé',
                uf: 'AM'
              }
            }
          }]
        },
        aggregations: {
          classes_processos: {
            buckets: [
              { key: 436, doc_count: 89, key_as_string: "Procedimento do Juizado Especial Cível" }
            ]
          },
          assuntos_principais: {
            buckets: [
              { key: 6177, doc_count: 45, key_as_string: "Concessão" }
            ]
          },
          distribuicao_graus: {
            buckets: [
              { key: "JE", doc_count: 120 }
            ]
          },
          processos_por_ano: {
            buckets: [
              { key_as_string: "2018", doc_count: 45 }
            ]
          }
        }
      };
      console.log('✅ Modal aberto com dados:', this.detalhesUnidade);
    }
  }

  get estatisticasUnidade() {
    if (!this.detalhesUnidade?.aggregations) return null;

    const aggs = this.detalhesUnidade.aggregations;
    return {
      totalProcessos: this.detalhesUnidade.hits?.total?.value || 0,
      classesMaisComuns: aggs.classes_processos?.buckets || [],
      assuntosPrincipais: aggs.assuntos_principais?.buckets || [],
      distribuicaoGraus: aggs.distribuicao_graus?.buckets || [],
      processosPorAno: aggs.processos_por_ano?.buckets || []
    };
  }

  // Método para recarregar a página
  recarregarPagina(): void {
    console.log('🔄 Recarregando página...');
    window.location.reload();
  }
}
