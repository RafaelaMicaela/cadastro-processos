import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, of } from 'rxjs';
import { Processo } from '../models/processo.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private readonly baseUrl = '/api';

  constructor(private http: HttpClient) {}

  buscarPorNumero(numeroProcesso: string): Observable<any> {
    const url = `${this.baseUrl}/api_publica_trf1/_search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      query: {
        match: {
          numeroProcesso: numeroProcesso
        }
      }
    };
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  buscarPorUnidade(codigoUnidade: string): Observable<any> {
    const url = `${this.baseUrl}/api_publica_trf1/_search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      query: {
        match: {
          "orgaoJulgador.codigo": codigoUnidade
        }
      }
    };
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  testarConexao(): Observable<any> {
    const url = `${this.baseUrl}/api_publica_trf1/_search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      query: {
        match_all: {}
      },
      size: 1
    };
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  // Método para demonstração com dados mock
  buscarProcessosMock(): Observable<any> {
    const mockData = {
      took: 15,
      timed_out: false,
      _shards: { total: 7, successful: 7, skipped: 0, failed: 0 },
      hits: {
        total: { value: 3, relation: "eq" },
        max_score: 1.0,
        hits: [
          {
            _index: "api_publica_trf1",
            _id: "TRF1_436_JE_16403_00008323520184013202",
            _score: 1.0,
            _source: {
              numeroProcesso: "00008323520184013202",
              classe: { codigo: 436, nome: "Procedimento do Juizado Especial Cível" },
              tribunal: "TRF1",
              grau: "JE",
              dataAjuizamento: "2018-10-29T00:00:00.000Z",
              orgaoJulgador: {
                codigo: 16403,
                nome: "JEF Adj - Tefé",
                codigoMunicipioIBGE: 5128
              },
              assuntos: [
                { codigo: 6177, nome: "Concessão" }
              ]
            }
          },
          {
            _index: "api_publica_trf1",
            _id: "TRF1_511_G2_16404_00001234520194013203",
            _score: 1.0,
            _source: {
              numeroProcesso: "00001234520194013203",
              classe: { codigo: 511, nome: "Ação Civil Pública" },
              tribunal: "TRF1",
              grau: "G2",
              dataAjuizamento: "2019-03-15T00:00:00.000Z",
              orgaoJulgador: {
                codigo: 16404,
                nome: "1ª Vara Federal de Manaus",
                codigoMunicipioIBGE: 2304400
              },
              assuntos: [
                { codigo: 1234, nome: "Direito Ambiental" }
              ]
            }
          }
        ]
      }
    };
    
    return of(mockData);
  }

  // Buscar detalhes estendidos de uma unidade específica
  buscarDetalhesUnidade(codigoUnidade: string): Observable<any> {
    const url = `${this.baseUrl}/api_publica_trf1/_search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      query: {
        bool: {
          must: [
            { match: { "orgaoJulgador.codigo": codigoUnidade } }
          ]
        }
      },
      aggs: {
        classes_processos: {
          terms: { field: "classe.codigo", size: 10 }
        },
        assuntos_principais: {
          terms: { field: "assuntos.codigo", size: 10 }
        },
        distribuicao_graus: {
          terms: { field: "grau.keyword", size: 5 }
        },
        processos_por_ano: {
          date_histogram: {
            field: "dataAjuizamento",
            calendar_interval: "year",
            format: "yyyy"
          }
        }
      },
      size: 100
    };
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Mock dos detalhes da unidade para demonstração
  buscarDetalhesUnidadeMock(codigoUnidade: string): Observable<any> {
    const mockDetalhes = {
      took: 25,
      hits: {
        total: { value: 156, relation: "eq" },
        hits: [
          {
            _source: {
              numeroProcesso: "00008323520184013202",
              classe: { codigo: 436, nome: "Procedimento do Juizado Especial Cível" },
              tribunal: "TRF1",
              grau: "JE",
              dataAjuizamento: "2018-10-29T00:00:00.000Z",
              orgaoJulgador: {
                codigo: parseInt(codigoUnidade),
                nome: "JEF Adj - Tefé",
                codigoMunicipioIBGE: 5128,
                municipio: "Tefé",
                uf: "AM"
              },
              assuntos: [
                { codigo: 6177, nome: "Concessão" },
                { codigo: 6178, nome: "Benefício Previdenciário" }
              ],
              movimentos: [
                {
                  codigo: 26,
                  nome: "Distribuição",
                  dataHora: "2018-10-30T14:06:24.000Z"
                },
                {
                  codigo: 14732,
                  nome: "Conversão de Autos Físicos em Eletrônicos",
                  dataHora: "2020-08-05T01:15:18.000Z"
                }
              ]
            }
          }
        ]
      },
      aggregations: {
        classes_processos: {
          buckets: [
            { key: 436, doc_count: 89, key_as_string: "Procedimento do Juizado Especial Cível" },
            { key: 511, doc_count: 34, key_as_string: "Ação Civil Pública" },
            { key: 281, doc_count: 23, key_as_string: "Ação Ordinária" },
            { key: 319, doc_count: 10, key_as_string: "Mandado de Segurança" }
          ]
        },
        assuntos_principais: {
          buckets: [
            { key: 6177, doc_count: 45, key_as_string: "Concessão" },
            { key: 6178, doc_count: 38, key_as_string: "Benefício Previdenciário" },
            { key: 1234, doc_count: 28, key_as_string: "Direito Ambiental" },
            { key: 5678, doc_count: 25, key_as_string: "Direito Tributário" }
          ]
        },
        distribuicao_graus: {
          buckets: [
            { key: "JE", doc_count: 120 },
            { key: "G1", doc_count: 25 },
            { key: "G2", doc_count: 11 }
          ]
        },
        processos_por_ano: {
          buckets: [
            { key_as_string: "2018", doc_count: 45 },
            { key_as_string: "2019", doc_count: 52 },
            { key_as_string: "2020", doc_count: 38 },
            { key_as_string: "2021", doc_count: 21 }
          ]
        }
      }
    };

    return of(mockDetalhes);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Erro ao consultar processos. Tente novamente.'));
  }
}
