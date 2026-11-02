Organizei o arquivo completo na ordem em que os prompts foram enviados, incluindo as etapas que estavam faltando: favicon, mascote interativo e animação de carregamento.

Removi todos os commits, as indicações de PARTE 0, PARTE 1 etc. e os blocos desnecessários. Mantive os prompts em sua sequência original, com formatação Markdown padronizada.

# PROMPTS.md

Este arquivo registra todos os prompts utilizados durante a construção da página pessoal "Sobre mim", organizados na ordem em que foram enviados.

---

## AGENTS.md — Regras do Projeto

**Prompt:**

Antes de começarmos, gere um AGENTS.md na raiz do projeto com as regras do projeto.

O conteúdo base está abaixo. Leia, entenda e estruture em um AGENTS.md bem formatado. Vou revisar antes de commitar.

Regras:

- Projeto: página pessoal "Sobre mim"
- Stack: HTML5 + CSS3 + JavaScript puro (sem frameworks, sem bibliotecas externas)
- Sem backend, sem banco de dados
- Sem overengineering: solução mais simples que resolve
- CSS separado em style.css
- JS separado em script.js
- HTML semântico (header, main, section, footer)
- Tema escuro como padrão, com toggle para claro
- Tema deve ser lembrado entre visitas (localStorage)
- Responsivo: desktop, notebook, tablet, celular
- Seção de Projetos consumindo API pública do GitHub
- Mascote do GitHub interativo (olhos seguem o mouse, clique muda de cor)
- Favicon SVG do mascote
- Animação suave ao carregar
- Commits semânticos (Conventional Commits)
- Regra do escoteiro: deixe o código mais limpo do que encontrou
- DRY, KISS, YAGNI
- Nomes significativos
- Funções pequenas
- Nada de código comentado sem necessidade
- Nada de !important no CSS
- Nada de bibliotecas externas (CDN, npm, etc.)

Não adicione regras que não estão listadas. Apenas estruture o que está aqui.

---

## DESIGN.md — Documento de Design e Estrutura Inicial

**Prompt:**

Agora, antes de codar, escreva um Design Doc curto (menos de 5 páginas) em DESIGN.md.

O Design Doc deve conter:

- Entendimento do domínio: página pessoal "Sobre mim"
- Requisitos funcionais (lista das seções e funcionalidades: header com nome, seção Sobre, seção Tecnologias, seção Projetos consumindo GitHub, footer com links, toggle de tema, mascote interativo, animação de carregamento)
- Requisitos não funcionais (responsividade, tema escuro padrão, performance, acessibilidade)
- Decisão de arquitetura: HTML + CSS + JS puro, sem frameworks, sem backend
- Justificativa para evitar overengineering: o projeto é uma página única, sem estado complexo, sem rotas, sem persistência além de localStorage

Em seguida, crie a estrutura de arquivos vazia:

- index.html
- style.css
- script.js
- favicon.svg
- assets/octocat.svg

Todos vazios por enquanto. Vou preencher em passos seguintes.

---

## index.html — HTML Semântico e Conteúdo

**Prompt:**

Preencha o index.html com HTML5 semântico.

Requisitos obrigatórios:

- Meu nome e uma frase curta de apresentação
- Uma seção "Sobre" com 2 ou 3 linhas sobre minha área de interesse
- Uma lista com 3 tecnologias que quero aprender
- Um link para o meu perfil do GitHub

Dados:

Nome: Túlio Vilela Lopes

GitHub: [https://github.com/Tulio8998](https://github.com/Tulio8998)

LinkedIn: [https://www.linkedin.com/in/túliovilela](https://www.linkedin.com/in/túliovilela)

Sobre mim: Desenvolvedor Backend / Fullstack e estudante de Sistemas de Informação no 6º período da UFOP, com experiência prática no desenvolvimento de aplicações utilizando TypeScript, Python, Java e Groovy. Atuação com APIs REST, bancos de dados relacionais e não relacionais, testes automatizados, Git e metodologias ágeis. Interesse em desenvolvimento de software, dados e aplicação de Inteligência Artificial para automação e solução de problemas.

Tecnologias que quero aprender (para a lista): Rust, Kubernetes, TensorFlow.

Além disso, inclua na estrutura semântica do HTML:

- Um `<header>` com o nome, a frase de apresentação e um botão de toggle de tema (com id para o JS usar depois)
- Um `<main>` contendo as seções Sobre, Tecnologias e Projetos (a seção Projetos ainda vazia, será preenchida via JS)
- Um `<footer>` com os links do GitHub e LinkedIn
- Um elemento reservado para o mascote do GitHub (ex: `<div id="mascote">`)
- Referência a style.css, script.js e favicon.svg

Use `<section>`, `<h2>`, `<ul>`, `<a>` corretamente. Sem `<div>` onde `<section>` cabe. Sem `<br>` para espaçamento.

Não adicione CSS nem JS ainda.

---

## style.css — Estilização Base e Tema Escuro

**Prompt:**

Preencha o style.css com o tema escuro como padrão.

Use variáveis CSS no  para todas as cores, de forma que o tema claro possa ser ativado apenas trocando as variáveis via classe no `<body>`.

Aplique:

- Tipografia legível (font-family com fallback para system fonts, tamanhos em rem)
- Espaçamento consistente com variáveis (--spacing-sm, --spacing-md, --spacing-lg)
- Hierarquia visual clara (h1 > h2 > p)
- Layout com max-width centralizado
- Largura de linha confortável (entre 60 e 75 caracteres)
- Sem !important
- Sem valores mágicos (use variáveis)

Defina também:

- Classe .dark (padrão no body)
- Classe .light (com as variáveis do tema claro)

Ainda sem responsividade — isso vem no próximo passo.

---

## style.css — Responsividade

**Prompt:**

A pagina deve ser responsiva, ou seja, ter responsividade para pcs, notebooks, tablets e celulares.

Adicione media queries no style.css cobrindo:

- Desktop (acima de 1200px)
- Notebook (entre 992px e 1199px)
- Tablet (entre 768px e 991px)
- Celular (abaixo de 768px)

Garanta:

- Sem overflow horizontal em nenhum breakpoint
- Menu/header reorganizado em telas pequenas
- Seção Projetos com cards em grid: 3 colunas no desktop, 2 no notebook, 1 no tablet e celular
- Tipografia legível em telas pequenas (não abaixo de 16px no body)

---

## script.js — Toggle de Tema (Dark/Light)

**Prompt:**

Adicione um botão para alternar o tema entre escuro e claro, o padrão deve estar como escuro.

Use JS em script.js:

- Ao carregar a página, leia a preferência salva em localStorage
- Se não houver preferência, aplique o tema escuro (padrão)
- Ao clicar no botão, alterne a classe .dark / .light no `<body>`
- Salve a nova preferência em localStorage
- Atualize o texto/ícone do botão para indicar o estado atual

Requisitos:

- Sem bibliotecas externas
- Sem flash de tema errado ao carregar (aplicar o tema antes do primeiro render, ou no mínimo antes do DOMContentLoaded)
- Botão acessível: aria-label indicando a ação, estado visível
- Não quebre a função se o localStorage estiver desabilitado (try/catch)

---

## script.js — Seção Projetos (API do GitHub)

**Prompt:**

Criar uma Seção de "Projetos" com cards com meus projetos do GitHub, consuma a api do github para automatizar.

Use fetch no script.js para consumir [https://api.github.com/users/Tulio8998/repos](https://api.github.com/users/Tulio8998/repos)

Para cada repositório, renderize um card contendo:

- Nome do repositório
- Descrição (se houver)
- Linguagem principal (se houver)
- Link "Ver no GitHub" para o repositório

Comportamento esperado:

- Exibir um estado de loading enquanto a requisição está em andamento
- Se a requisição falhar (rede, 403, 429), exibir uma mensagem amigável com link direto para o GitHub
- Cachear a resposta no localStorage com validade de 1 hora, para evitar rate limit (60 req/h sem autenticação)
- Filtrar repositórios vazios ou arquivados, se fizer sentido
- Ordenar por estrelas (decrescente) ou data de atualização

Não adicione bibliotecas externas. Use apenas fetch nativo e manipulação de DOM.

---

## favicon.svg — Favicon do Octocat

**Prompt:**

Adicione um favicon. Deve ser o mascote do GitHub (Octocat).

Crie um SVG simples do Octocat em favicon.svg e referencie no `<head>` do index.html.

O favicon é estático — as interações do mascote na página serão feitas no próximo passo, em um elemento separado.

---

## script.js — Mascote Interativo

**Prompt:**

Adicione o mascote do GitHub como um elemento visual interativo na página.

Comportamentos esperados (em script.js):

- Ao mover o mouse pela página, os olhos do mascote seguem a posição do cursor (calcular o ângulo a partir do centro do mascote até o mouse e rotacionar as pupilas)
- Ao clicar no mascote, ele altera suas cores (trocar a cor principal do SVG por uma cor aleatória ou alternar entre um conjunto de cores)
- A animação deve ser suave (usar transition no CSS para as pupilas)
- Performance: usar requestAnimationFrame ou throttle no evento mousemove, para não sobrecarregar
- Se preferir movimento reduzido (prefers-reduced-motion), desative o rastreamento de olhos

Posicione o mascote em um canto fixo (ex: canto inferior direito) para não interferir no conteúdo principal.

Use SVG inline ou carregue assets/octocat.svg. Sem bibliotecas externas.

---

## style.css e script.js — Animação de Carregamento

**Prompt:**

Adicione uma animação suave ao carregar a pagina.

Implemente com CSS (@keyframes) e acione via JS:

- Ao carregar, aplicar uma classe .loaded ao `<body>` (via requestAnimationFrame ou setTimeout curto), disparando a animação
- Elementos principais (header, sections, cards) entram com fade-in + translateY leve
- Escalonamento (stagger): cada elemento entra com um delay crescente
- Usar IntersectionObserver para os elementos abaixo da dobra animarem ao entrar em viewport
- Respeitar prefers-reduced-motion: se ativo, elementos aparecem sem animação

Sem bibliotecas externas.

---

## PROMPTS.md — Registro dos Prompts

**Prompt:**

No final do processo, gere um arquivo PROMPTS.md contendo todos os comandos dados a você desde o início.

Formatação:

- Título: "# PROMPTS.md"
- Introdução curta explicando que o arquivo registra os prompts usados para construir a página
- Cada prompt numerado com o texto original preservado
- Um comentário curto entre os prompts, indicando o commit semântico correspondente
- Seção final com o link do GitHub Pages

Reconstrua a lista com fidelidade ao histórico da nossa conversa.

---

## GitHub Pages

Após o deploy, a página estará disponível em:

[https://tulio8998.github.io/sobre-mim/](https://tulio8998.github.io/sobre-mim/)

Numerar todos os prompts sequencialmente