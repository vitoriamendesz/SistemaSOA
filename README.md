# Sistema SOA – Tendência de Nomes no Brasil 🇧🇷

Este projeto foi desenvolvido como parte da atividade prática da disciplina de Arquitetura de Software, com o objetivo de aplicar os princípios da arquitetura orientada a serviços (SOA) na construção de um sistema que consome a API pública de nomes do IBGE.

## 🎯 Objetivo

Permitir que usuários consultem a popularidade de nomes próprios ao longo das décadas no Brasil, por meio da API do IBGE, com visualização em gráficos e tabelas.

---

## 🧩 Funcionalidades

1. **📈 Evolução do ranking de um nome**
   - O usuário informa um nome.
   - O sistema exibe um gráfico de linha com a frequência do nome desde 1930.
   - A consulta é nacional.

2. **📊 Top 3 nomes por UF**
   - O usuário informa uma sigla de estado (UF).
   - O sistema mostra uma tabela com os três nomes mais frequentes no estado.
   - Os dados são específicos por localidade (UF).

3. **⚖️ Comparação entre dois nomes**
   - O usuário insere dois nomes.
   - O sistema exibe um gráfico comparativo da frequência desses nomes ao longo das décadas.

---

## 🛠️ Tecnologias Utilizadas

- HTML5, CSS3 e JavaScript
- [Chart.js](https://www.chartjs.org/) – biblioteca de gráficos
- [API de Nomes do IBGE](https://servicodados.ibge.gov.br/api/docs/nomes?versao=2)

---

## 🧪 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/vitoriamendesz/SistemaSOA
   cd SistemaSOA

2. Abra o arquivo index.html no navegador
   ou use a extensão Live Server no VS Code.  