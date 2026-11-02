# AGENTS.md

## Projeto: "Sobre mim"

- **Objetivo**: Página pessoal que apresenta informações sobre o autor.
- **Stack**: HTML5, CSS3, JavaScript puro (sem frameworks ou bibliotecas externas).
- **Back‑end**: Não há backend nem banco de dados.

## Diretrizes de Desenvolvimento

| Categoria | Regra |
|-----------|-------|
| **Arquitetura** | - Solução mais simples que resolve (evitar over‑engineering). |
| **Estrutura de arquivos** | - CSS em `style.css` separado.<br>- JavaScript em `script.js` separado.<br>- HTML semântico usando `<header>`, `<main>`, `<section>`, `<footer>`. |
| **Design** | - Tema escuro como padrão com toggle para tema claro.<br>- Persistir a escolha do tema entre visitas usando `localStorage`.<br>- Layout responsivo para desktop, notebook, tablet e celular. |
| **Funcionalidades** | - Seção de Projetos que consome a API pública do GitHub.<br>- Mascote do GitHub interativo: olhos que seguem o mouse, clique altera a cor.<br>- Favicon SVG do mascote.<br>- Animação suave ao carregar a página. |
| **Qualidade de Código** | - Commits semânticos seguindo *Conventional Commits*.<br>- Regra do escoteiro: deixar o código mais limpo do que encontrou.<br>- Princípios: **DRY**, **KISS**, **YAGNI**.<br>- Nomes de variáveis, funções e arquivos devem ser significativos.<br>- Funções curtas e de responsabilidade única.<br>- Evitar código comentado desnecessário.<br>- Não usar `!important` no CSS.<br>- Não incluir bibliotecas externas (CDN, npm, etc.). |

## Boas Práticas

- Manter a estrutura de pastas clara (ex.: `index.html`, `style.css`, `script.js`).
- Utilizar seletores CSS simples e reutilizáveis.
- Gerenciar estado da aplicação apenas com JavaScript nativo.
- Testar a responsividade em diferentes larguras de tela.
- Garantir que o toggle de tema atualiza o `localStorage` corretamente.
- Documentar mudanças relevantes nos commits de forma concisa e padronizada.

---

*Este documento define as regras que devem ser seguidas ao contribuir para o projeto "Sobre mim".*