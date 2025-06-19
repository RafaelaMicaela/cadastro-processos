export type TipoPessoa = 'Física' | 'Jurídica';

export interface Parte {
  id: string; // UUID ou timestamp como identificador único
  nomeCompleto: string;
  tipoPessoa: TipoPessoa;
  cpfCnpj: string;
  email: string;
}
