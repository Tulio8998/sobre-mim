/**
 * script.js - Funcionalidades da página "Sobre mim"
 * - Toggle de tema (escuro/claro) com persistência
 * - Carregamento de projetos via GitHub API
 * - Mascote Octocat interativo (olhos seguem mouse, clique muda cor)
 * - Animação de carregamento suave
 */

(function () {
  "use strict";

  // ==========================================================================
  // Utilitários
  // ==========================================================================

  /**
   * Executa callback quando DOM está pronto
   */
  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  /**
   * Safe localStorage getItem
   */
  function safeGetItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  /**
   * Safe localStorage setItem
   */
  function safeSetItem(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  // ==========================================================================
  // 1. TEMA ESCURO/CLARO
  // ==========================================================================

  const THEME_KEY = "theme-preference";
  const THEME_DARK = "dark";
  const THEME_LIGHT = "light";

  /**
   * Aplica o tema no <body> imediatamente (evita flash)
   */
  function applyTheme(theme) {
    document.body.classList.remove(THEME_DARK, THEME_LIGHT);
    document.body.classList.add(theme);
  }

  /**
   * Inicializa o tema: lê localStorage ou usa preferência do sistema
   * Executa ANTES do DOMContentLoaded para evitar flash
   */
  function initTheme() {
    const saved = safeGetItem(THEME_KEY);
    let theme;

    if (saved === THEME_LIGHT || saved === THEME_DARK) {
      theme = saved;
    } else {
      // Fallback: prefere esquema do sistema, senão escuro
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      theme = prefersDark ? THEME_DARK : THEME_LIGHT;
    }

    applyTheme(theme);
    return theme;
  }

  /**
   * Configura o botão de toggle após DOM pronto
   */
  function setupThemeToggle(initialTheme) {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    // SVGs para os ícones
    const sunIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;

    const moonIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
    `;

    function updateButton(theme) {
      const isDark = theme === THEME_DARK;
      toggleBtn.innerHTML = isDark ? moonIcon : sunIcon;
      toggleBtn.setAttribute("aria-label", isDark ? "Alternar para tema claro" : "Alternar para tema escuro");
      toggleBtn.setAttribute("aria-pressed", isDark ? "false" : "true");
    }

    // Estado inicial
    updateButton(initialTheme);

    // Click handler
    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.body.classList.contains(THEME_DARK) ? THEME_DARK : THEME_LIGHT;
      const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;

      applyTheme(newTheme);
      safeSetItem(THEME_KEY, newTheme);
      updateButton(newTheme);
    });

    // Escuta mudanças no sistema (opcional)
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      // Só auto-muda se o usuário não tiver preferência salva
      if (!safeGetItem(THEME_KEY)) {
        const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
        applyTheme(newTheme);
        updateButton(newTheme);
      }
    });
  }

  // ==========================================================================
  // 2. PROJETOS - GitHub API
  // ==========================================================================

  const GITHUB_USERNAME = "Tulio8998";
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
  const CACHE_KEY = "github-repos-cache";
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

  /**
   * Linguagens conhecidas para cores dos badges
   */
  const LANGUAGE_COLORS = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Dockerfile: "#384d54",
    Groovy: "#e69f56",
    Kotlin: "#7F52FF",
    Swift: "#ffac45",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Vue: "#41b883",
    Svelte: "#ff3e00",
  };

  function getLanguageColor(lang) {
    return LANGUAGE_COLORS[lang] || "#58a6ff";
  }

  /**
   * Formata número (ex: 1.2k)
   */
  function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return String(num);
  }

  /**
   * Trunca texto
   */
  function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 1) + "…";
  }

  /**
   * Cria HTML do card de projeto
   */
  function createProjectCard(repo) {
    const isPrivate = repo.private;
    const description = repo.description || "Sem descrição";
    const language = repo.language;
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const updatedAt = new Date(repo.updated_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const card = document.createElement("li");
    card.className = "projeto-card";
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p class="projeto-descricao">${truncate(description, 120)}</p>
      <div class="projeto-meta">
        ${language ? `
          <span class="projeto-linguagem" style="--lang-color: ${getLanguageColor(language)}">${language}</span>
        ` : ""}
        <span>★ ${formatNumber(stars)}</span>
        <span>⑂ ${formatNumber(forks)}</span>
        <span>${updatedAt}</span>
        ${isPrivate ? `<span style="color: var(--color-warning)">Privado</span>` : ""}
        <a class="projeto-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver no GitHub →</a>
      </div>
    `;
    return card;
  }

  /**
   * Renderiza lista de projetos
   */
  function renderProjects(repos) {
    const list = document.getElementById("projetos-lista");
    if (!list) return;

    // Filtra: não-fork, não-vazio, ordena por stars + updated
    const filtered = repos
      .filter((r) => !r.fork && r.name !== GITHUB_USERNAME.toLowerCase())
      .sort((a, b) => {
        // Prioriza repos com stars, depois por atualização
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 9); // Máximo 9 projetos

    if (filtered.length === 0) {
      list.innerHTML = `<li style="text-align:center;padding:var(--spacing-2xl);color:var(--color-fg-muted)">Nenhum projeto público encontrado</li>`;
      return;
    }

    list.innerHTML = "";
    const fragment = document.createDocumentFragment();
    filtered.forEach((repo) => fragment.appendChild(createProjectCard(repo)));
    list.appendChild(fragment);
  }

  /**
   * Carrega projetos do cache ou API
   */
  async function loadProjects() {
    const list = document.getElementById("projetos-lista");
    if (!list) return;

    // Tenta cache primeiro
    const cached = safeGetItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          renderProjects(data);
          // Atualiza em background
          fetchFreshProjects();
          return;
        }
      } catch (e) {
        // Cache inválido, ignora
      }
    }

    // Sem cache válido, busca da API
    await fetchFreshProjects();
  }

  async function fetchFreshProjects() {
    const list = document.getElementById("projetos-lista");
    if (!list) return;

    try {
      const response = await fetch(GITHUB_API_URL, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });

      if (!response.ok) {
        throw new Error(`GitHub API: ${response.status}`);
      }

      const repos = await response.json();
      safeSetItem(CACHE_KEY, JSON.stringify({ data: repos, timestamp: Date.now() }));
      renderProjects(repos);
    } catch (error) {
      console.warn("Erro ao carregar projetos:", error);
      // Fallback: mostra mensagem amigável
      list.innerHTML = `
        <li style="text-align:center;padding:var(--spacing-2xl);color:var(--color-fg-muted)">
          Não foi possível carregar os projetos no momento.
          <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer" style="margin-left:var(--spacing-sm)">Ver no GitHub →</a>
        </li>
      `;
    }
  }

  // ==========================================================================
  // 3. MASCOTE OCTOCAT INTERATIVO
  // ==========================================================================

  const OCTOCAT_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
      <defs>
        <linearGradient id="octocat-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#238636"/>
          <stop offset="100%" stop-color="#2ea043"/>
        </linearGradient>
        <linearGradient id="octocat-body-alt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a371f7"/>
          <stop offset="100%" stop-color="#d2a8ff"/>
        </linearGradient>
      </defs>
      <!-- Corpo -->
      <path class="octocat-body" fill="url(#octocat-body)" d="M128 0C57.3 0 0 57.3 0 128c0 59.2 38.7 109.1 91.8 126.9 6.7 1.2 9.2-2.9 9.2-6.5 0-3.2-.1-11.8-.1-23.1-37.3 8.1-45.1-18.1-45.1-18.1-6.1-15.5-14.9-19.6-14.9-19.6-12.2-8.3.9-8.1.9-8.1 13.5.9 20.6 13.8 20.6 13.8 12 20.4 31.4 14.5 39 11.1 1.2-8.6 4.7-14.5 8.5-17.8-29.7-3.4-61-14.9-61-66.4 0-14.7 5.3-26.7 14-36.1-1.4-3.4-6.1-17 1.3-35.4 0 0 11.4-3.6 37.4 14 10.8-3 22.5-4.5 34-4.5s23.2 1.5 34 4.5c26-17.6 37.4-14 37.4-14 7.4 18.4 2.7 32 1.3 35.4 8.7 9.4 14 21.4 14 36.1 0 51.6-31.4 62.8-61.2 66.2 4.8 4.1 9.1 12.4 9.1 25.1 0 18.1-.1 32.8-.1 37.2 0 3.6 2.5 7.7 9.2 6.5C217.3 237.1 256 187.2 256 128c0-70.7-57.3-128-128-128z"/>
      <!-- Olhos -->
      <ellipse class="octocat-eye" cx="87" cy="100" rx="12" ry="16" fill="#fff"/>
      <ellipse class="octocat-eye" cx="169" cy="100" rx="12" ry="16" fill="#fff"/>
      <!-- Pupilas -->
      <ellipse class="octocat-pupil" cx="87" cy="100" rx="6" ry="8" fill="#000"/>
      <ellipse class="octocat-pupil" cx="169" cy="100" rx="6" ry="8" fill="#000"/>
      <!-- Boca -->
      <path fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" d="M87 150 Q128 170 169 150"/>
    </svg>
  `;

  const ALTERNATE_COLORS = [
    "url(#octocat-body)",     // Verde original
    "url(#octocat-body-alt)", // Roxo
    "#f85149",               // Vermelho
    "#d29922",               // Amarelo
    "#58a6ff",               // Azul
    "#3fb950",               // Verde claro
    "#a371f7",               // Roxo claro
  ];

  let colorIndex = 0;
  let mouseX = 0;
  let mouseY = 0;
  let animationFrameId = null;

  function initMascote() {
    const container = document.getElementById("mascote");
    if (!container) return;

    container.innerHTML = OCTOCAT_SVG;

    const svg = container.querySelector("svg");
    const eyes = container.querySelectorAll(".octocat-eye");
    const pupils = container.querySelectorAll(".octocat-pupil");
    const body = container.querySelector(".octocat-body");

    if (!svg || !eyes.length || !pupils.length) return;

    // Posição dos olhos relativa ao SVG (viewBox 256x256)
    const eyeCenters = [
      { x: 87, y: 100 },  // olho esquerdo
      { x: 169, y: 100 }, // olho direito
    ];

    // Rastreia mouse em relação à viewport
    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    // Loop de animação para olhos seguirem mouse
    function animateEyes() {
      const rect = svg.getBoundingClientRect();
      const svgCenterX = rect.left + rect.width / 2;
      const svgCenterY = rect.top + rect.height / 2;

      // Converte para coordenadas do viewBox (256x256)
      const scale = 256 / rect.width;

      pupils.forEach((pupil, i) => {
        const eyeCenter = eyeCenters[i];
        // Vetor do centro do olho para o mouse (em coordenadas viewBox)
        const dx = (mouseX - svgCenterX) * scale;
        const dy = (mouseY - svgCenterY) * scale;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Limita movimento da pupila (raio máximo ~6)
        const maxOffset = 6;
        const offsetX = dist > 0 ? (dx / dist) * Math.min(dist, maxOffset) : 0;
        const offsetY = dist > 0 ? (dy / dist) * Math.min(dist, maxOffset) : 0;

        pupil.setAttribute("cx", eyeCenter.x + offsetX);
        pupil.setAttribute("cy", eyeCenter.y + offsetY);
      });

      animationFrameId = requestAnimationFrame(animateEyes);
    }

    // Inicia animação
    document.addEventListener("mousemove", onMouseMove);
    animateEyes();

    // Clique no mascote -> muda cor do corpo
    container.addEventListener("click", () => {
      colorIndex = (colorIndex + 1) % ALTERNATE_COLORS.length;
      if (body) {
        body.setAttribute("fill", ALTERNATE_COLORS[colorIndex]);
      }
      // Pequena animação de feedback
      container.style.transform = "scale(0.9)";
      setTimeout(() => {
        container.style.transform = "";
      }, 100);
    });

    // Cleanup ao sair da página
    window.addEventListener("beforeunload", () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
  }

  // ==========================================================================
  // INICIALIZAÇÃO PRINCIPAL
  // ==========================================================================

  // 1. Tema: aplica IMEDIATAMENTE (antes do DOMContentLoaded)
  const initialTheme = initTheme();

  // 2. Resto quando DOM pronto
  onReady(() => {
    setupThemeToggle(initialTheme);
    loadProjects();
    initMascote();
  });

})();
