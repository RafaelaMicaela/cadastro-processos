import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Processo } from '../models/processo.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private readonly baseUrl = 'https://api-publica.datajud.cnj.jus.br';

  constructor(private http: HttpClient) {}

  buscarPorUnidade(codigoUnidade: string): Observable<Processo[]> {
    const url = `${this.baseUrl}/dados-processos/unidade/${codigoUnidade}`;
    return this.http.get<Processo[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Erro ao consultar processos. Tente novamente.'));
  }
}
