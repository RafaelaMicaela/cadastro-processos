export interface Processo {
  codigoUnidade: string;
  numeroProcesso?: string;
  assuntos: string[];
  classeJudicial: string;
  grau: string;
  justica: string;
  quantidadeProcessos: number;
  tribunal?: string;
  orgaoJulgador?: string;
  dataAjuizamento?: string;
}
