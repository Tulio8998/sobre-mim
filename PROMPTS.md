# PROMPTS.md

Este arquivo registra todos os prompts utilizados durante a construção da página pessoal "Sobre mim", organizados na ordem em que foram enviados.

---

## AGENTS.md — Regras do Projeto

**Prompt:**

Antes de começarmos, gere um AGENTS.md na raiz do projeto com as regras do projeto.

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
- Animaç limpo do que encontrou
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

## Correção de Bug — Tela Escura ao Carregar (style.css)

**Prompt:**

Corrigir o bug que deixa a tela escura ao rodar o projeto.
Instrução: No arquivo style.css, vá até as variáveis do :root na seção de transições. As variáveis --transition-fast, --transition-normal e --transition-slow estão definidas com a curva de tempo embutida (ex: 350ms ease). Remova a palavra ease de todas elas, deixando apenas o tempo (ex: --transition-slow: 350ms;). Isso está causando um erro de sintaxe na propriedade animation mais abaixo, impedindo que a opacidade dos elementos saia de 0 para 1.

---

## Atualização da Lista de Tecnologias (index.html)

**Prompt:**

Alterar os itens da lista de tecnologias.
Instrução: No arquivo index.html, localize a seção <section id="tecnologias">. Altere os itens da lista (<li>) de "Rust", "Kubernetes" e "TensorFlow" para "Micronaut", "Kafka" e "Jenkins".

---

## Melhoria no Carregamento de Projetos via GitHub API (script.js)

**Prompt:**

Trazer todos os projetos públicos corretamente e filtrar repositórios indesejados.
Instrução: No arquivo script.js, na função que filtra e renderiza os repositórios (dentro da lógica da API do GitHub), garanta que a API esteja trazendo todos os projetos públicos (per_page=100). Adicione uma regra no filtro (função filter()) para excluir explicitamente o repositório chamado sobre-mim, além de continuar excluindo o repositório com o mesmo nome do usuário (o README do perfil). Se houver limite de exibição (ex: .slice(0, 9)), aumente esse limite ou remova-o para mostrar todos.

---

## Ajuste de Layout dos Cards de Projeto — Proporção e Alinhamento (style.css)

**Prompt:**

Melhorar a proporção e o alinhamento interno dos cards de repositório nas telas maiores.
Instrução: No arquivo style.css, modifique a classe .projeto-card e o grid #projetos-lista.
Para desktop e notebook, ajuste o grid-template-columns para que os cards fiquem mais largos horizontalmente (por exemplo, mudando de 3 colunas para 2 colunas, ou usando minmax).
Na classe .projeto-card, aplique display: flex; flex-direction: column; height: 100%; para que todos os cards tenham a mesma altura.
Defina flex-grow: 1; na descrição do projeto para empurrar o rodapé do card (tags, estrelas, link) sempre para a base, mantendo os conteúdos perfeitamente alinhados entre si.

---

## Ajuste de Grid e Correção de Cores das Badges de Linguagem (style.css)

**Prompt:**

Ajuste o layout dos cards de projeto para exibir 4 colunas em telas maiores no arquivo style.css. E Conserte a cor das bolinhas de linguagem nos cards de projeto para que elas variem conforme a tecnologia.

---

## Correção de Layout — Cards Espremidos e Esticados (style.css)

**Prompt:**

Corrija o layout dos cards de projeto que ficaram espremidos e esticados verticalmente.
1. No arquivo style.css, localize o seletor #projetos (onde fica o container principal da seção).
2. Remova a linha max-width: var(--max-width-content); ou altere para max-width: 100%;. Isso permitirá que o grid ocupe o espaço total do contêiner principal (1200px) em vez de ficar restrito à largura de leitura de textos (65ch).
3. Nas media queries de Notebook (min-width: 992px), altere o #projetos-lista para grid-template-columns: repeat(3, 1fr); para garantir uma proporção melhor e não espremer tanto os cards nessa resolução intermediária. O Desktop (min-width: 1200px) pode continuar com 4 colunas (repeat(4, 1fr)).

---

## Altura Fixa dos Cards e Limite de Linhas na Descrição (style.css)

**Prompt:**

Fixe a altura dos cards de projeto e adicione um limite de linhas para a descrição no arquivo style.css.
1. Nas media queries de Desktop (min-width: 1200px) e Notebook (min-width: 992px), adicione a seguinte regra para cravar a altura dos cards:
.projeto-card { 
  height: 320px; 
}
2. Na regra geral da descrição (.projeto-card .projeto-descricao), limite o texto a 4 linhas para que descrições gigantes não vazem do card fixo. Adicione as seguintes propriedades:
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

---

## Ajuste de Alinhamento e Espaçamento do Cabeçalho + Atualização de Ano (style.css, index.html)

**Prompt:**

Ajuste o alinhamento e o espaçamento do texto no cabeçalho (header) no arquivo style.css.
1. Localize a regra header h1. Altere o margin-bottom: var(--spacing-xs); para margin-bottom: var(--spacing-md);. Isso vai desgrudar o título do subtítulo.
2. Localize a regra header > p. A propriedade max-width está restrita a var(--max-width-content); (que equivale a 65 caracteres), o que está quebrando o texto prematuramente. Altere para max-width: 90ch; para permitir que toda a frase do subtítulo caiba em uma única linha nas telas grandes.
E Atualize o ano dos direitos autorais no rodapé no arquivo index.html.
No final do arquivo, dentro da tag <footer>, localize o parágrafo <p>&copy; 2025 Túlio Vilela Lopes</p> e mude "2025" para "2026".

---

## PROMPTS.md — Registro dos Prompts

**Prompt:**

Para todos os prompts que eu fiz nessa secao, adicione no arquivo PROMPTS.md os prompst que eu fiz aqui, complemente com o que já estava la

---

## GitHub Pages

[https://tulio8998.github.io/sobre-mim/](https://tulio8998.github.io/sobre-mim/)
