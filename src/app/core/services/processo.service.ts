import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Processo } from '../models/processo.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private readonly apiUrl = 'https://api-publica.datajud.cnj.jus.br/api_publica_trf1/_search';
  private readonly apiKey = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==';

  constructor(private http: HttpClient) {}

  buscarPorUnidade(codigoUnidade: string): Observable<Processo[]> {
    const headers = new HttpHeaders({
      'Authorization': `APIKey ${this.apiKey}`,
      'Content-Type': 'application/json'
    });
    const body = {
      query: {
        match: {
          codigoUnidade: codigoUnidade
        }
      }
    };
    return this.http.post<Processo[]>(this.apiUrl, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  buscarPorNumero(numeroProcesso: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `APIKey ${this.apiKey}`,
      'Content-Type': 'application/json'
    });
    const body = {
      query: {
        match: {
          numeroProcesso: numeroProcesso
        }
      }
    };
    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Erro ao consultar processos. Tente novamente.'));
  }
}
