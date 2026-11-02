# DESIGN.md

## Design Document — Página "Sobre mim"

---

### 1. Entendimento do Domínio

Página pessoal estática ("Sobre mim") que apresenta o autor, suas tecnologias, projetos públicos no GitHub e formas de contato.  
Público-alvo: recrutadores, colegas desenvolvedores, visitantes casuais.  
Objetivo: transmitir identidade técnica de forma clara, rápida e agradável.

---

### 2. Requisitos Funcionais

| ID | Funcionalidade | Descrição |
|----|----------------|-----------|
| RF‑01 | **Header** | Nome do autor, título/cargo, avatar ou mascote. |
| RF‑02 | **Seção Sobre** | Texto breve de apresentação (bio). |
| RF‑03 | **Seção Tecnologias** | Lista/icons das stacks principais. |
| RF‑04 | **Seção Projetos** | Consumir API pública do GitHub (`/users/{username}/repos`), exibir cards com nome, descrição, linguagem, estrelas, link. |
| RF‑05 | **Footer** | Links para GitHub, LinkedIn, e-mail, etc. |
| RF‑06 | **Toggle de Tema** | Botão para alternar entre tema escuro (padrão) e claro; persistir escolha em `localStorage`. |
| RF‑07 | **Mascote Interativo (Octocat)** | Olhos seguem o cursor; clique altera cor do corpo. |
| RF‑08 | **Animação de Carregamento** | Transição suave (fade-in/slide-up) ao carregar a página. |
| RF‑09 | **Favicon** | SVG do mascote. |

---

### 3. Requisitos Não Funcionais

| ID | Requisito | Detalhe |
|----|-----------|---------|
| RNF‑01 | **Responsividade** | Layout fluido: desktop (≥1024px), notebook (768–1023px), tablet (480–767px), celular (<480px). Breakpoints via CSS Grid/Flexbox + media queries. |
| RNF‑02 | **Tema Escuro Padrão** | Variáveis CSS (`--bg`, `--fg`, `--accent`, etc.) definidas em `:root` e sobrescritas em `[data-theme="light"]`. |
| RNF‑03 | **Performance** | - Zero dependências externas.<br>- CSS/JS minificados em produção (opcional).<br>- Imagens otimizadas (SVG vetorial).<br>- Lazy-load opcional para avatares. |
| RNF‑04 | **Acessibilidade** | - HTML semântico (`header`, `main`, `section`, `footer`).<br>- Contraste WCAG AA nos dois temas.<br>- `focus-visible` visível.<br>- `alt` em imagens.<br>- `aria-label` no toggle de tema. |
| RNF‑05 | **Persistência Leve** | Apenas `localStorage` para preferência de tema. |

---

### 4. Decisão de Arquitetura

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| **Estrutura** | HTML5 semântico | SEO, acessibilidade, manutenibilidade. |
| **Estilo** | CSS3 (custom properties, Grid, Flexbox) | Temas via variáveis, responsividade nativa, sem build step. |
| **Comportamento** | JavaScript ES6+ (modules opcional) | Fetch nativo para API GitHub, manipulação de DOM simples, sem runtime extra. |
| **Build/Deploy** | Nenhum (arquivos estáticos) | Deploy direto em GitHub Pages, Netlify, Vercel, etc. |

**Estrutura de arquivos:**
```
/index.html
/style.css
/script.js
/favicon.svg
/assets/octocat.svg
```

---

### 5. Justificativa para Evitar Overengineering

- **Página única (SPA não necessária)**: sem roteamento, sem estado global complexo.
- **Dados simples**: apenas leitura da API pública do GitHub (GET `/repos`), sem autenticação, sem mutação.
- **Persistência mínima**: um único valor em `localStorage` (tema).
- **Equipe de uma pessoa**: curva de aprendizado zero, manutenção trivial.
- **Tempo de entrega**: foco no essencial (KISS, YAGNI).
- **Extensibilidade futura**: arquitetura modular (CSS/JS separados) permite adicionar features sem refatoração pesada.

---

### 6. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Rate limit da API GitHub (60 req/h sem auth) | Média | Projetos não carregam | Cache em `sessionStorage` por 10 min; fallback estático com 3–5 repos fixos. |
| SVG do mascote não carrega | Baixa | Favicon/olhos quebrados | Inline SVG no HTML como fallback. |
| Tema não persiste em navegação privada | Baixa | Usuário vê tema padrão | `try/catch` no `localStorage`; default para escuro. |

---

*Documento vivo — atualizar conforme decisões de implementação.*