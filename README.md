# 📋 Sistema Jurídico

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
- **📄 Modal de detalhes** ao clicar em um processo:
  - Informações completas da unidade judiciária
  - Estatísticas detalhadas (classes, assuntos, distribuição por grau)
  - Gráficos de barras com dados históricos
  - Lista dos últimos processos da unidade
- Tratamento de erros com mensagens amigáveis
- **Demonstração com dados mock** quando API não estiver disponível

---

## 💻 Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/RafaelaMicaela/cadastro-processos.git
cd cadastro-processos
npm install
ng serve --proxy-config proxy.conf.json
```

**⚠️ Importante**: O comando `ng serve` deve incluir a configuração de proxy para resolver problemas de CORS com a API do CNJ.

### 2. Acesse a aplicação

A aplicação estará disponível em `http://localhost:4200`

### 3. Testando a funcionalidade

A página de **Consulta de Processos** inclui botões organizados em duas seções:

#### 🔧 **Botões Principais:**

- **🔍 Buscar Processos**: Realiza busca real na API do CNJ
- **✅ Testar API**: Testa a conectividade com a API
- **🧪 Dados Demo**: Carrega dados mock para demonstração

#### 🛠️ **Ferramentas de Teste e Debug:**

- **📊 Debug**: Exibe dados no console para depuração
- **👁️ Teste Modal**: Abre o modal de detalhes com dados de teste
- **💾 Dados Simples**: Carrega dados simplificados
- **🚀 Modal Direto**: Abre modal com dados pré-carregados
- **🔄 Recarregar**: Recarrega a página completamente

**Para testar rapidamente:**

1. Clique em "Dados Demo" para carregar dados de exemplo
2. Clique em qualquer linha da tabela para abrir o modal de detalhes
3. Ou use "Modal Direto" para abrir o modal instantaneamente

**💡 Dica:** Se alguns botões não aparecerem, use o botão "Recarregar" ou pressione F5.

---

## 🔧 Configuração de Proxy

O projeto inclui um arquivo `proxy.conf.json` que configura um proxy para contornar problemas de CORS ao fazer requisições para a API pública do CNJ. Esta é uma solução comum em ambientes de desenvolvimento frontend.
