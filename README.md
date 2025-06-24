# 📋 Desafio Técnico Front-end – INCAAS

Sistema Angular para:

✅ Cadastro de partes interessadas com validações e armazenamento local  
✅ Consulta de dados públicos de processos judiciais via API do CNJ  
✅ Filtros por grau e tipo de justiça, ordenação e modal de detalhes  
✅ Interface responsiva com TailwindCSS

---

## 🚀 Tecnologias Utilizadas

- Angular 15+
- TypeScript
- Angular Reactive Forms
- HttpClient (Angular)
- Tailwind CSS
<!-- - UUID (para IDs únicos) -->
- LocalStorage (persistência local)
- API Pública do CNJ – DataJud

---

## 📂 Funcionalidades

### 👤 Cadastro de Partes
- Formulário com:
  - Nome completo
  - Tipo de pessoa (Física / Jurídica)
  - CPF ou CNPJ (com validação)
  - E-mail (com validação)
- Listagem das partes cadastradas
- Edição e exclusão
- Armazenamento via `localStorage`

### 🔎 Consulta de Processos (DataJud CNJ)
- Busca de processos por código de unidade (API CNJ)
- Tabela com:
  - Código da unidade
  - Classe judicial
  - Grau
  - Tipo de Justiça
  - Assuntos principais
  - Quantidade de processos
- Filtros por grau e justiça
- Ordenação por quantidade de processos
- Modal com detalhes ao clicar em um processo
- Tratamento de erros com mensagens amigáveis

---

## 💻 Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/RafaelaMicaela/cadastro-processos.git
cd cadastro-processos
npm install
ng serve
