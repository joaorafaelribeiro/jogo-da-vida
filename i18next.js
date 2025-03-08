// Configuração do i18next com detecção automática de idioma
i18next
  .use(i18nextBrowserLanguageDetector) // Usa o detector de idioma do navegador
  .init({
    fallbackLng: 'en', // Idioma de fallback (caso o idioma do usuário não seja suportado)
    debug: true,
    resources: {
      'pt-BR': {
        translation: {
          "title": "Jogo da Vida",
          "description": "Uma simulação de autômato celular criada por John Conway.",
          "rules" : "Regras do Jogo",
          "rules1": "Cada célula pode estar viva ou morta.",
          "rules2": "Qualquer célula viva com menos de 2 vizinhos vivos morre (solidão).",
          "rules3": "Qualquer célula viva com 2 ou 3 vizinhos vivos sobrevive.",
          "rules4": "Qualquer célula viva com mais de 3 vizinhos vivos morre (superpopulação).",
          "rules5": "Qualquer célula morta com exatamente 3 vizinhos vivos se torna viva (reprodução).",
        }
      },
      'en': {
        translation: {
          "title": "Game of Life",
          "description": "A cellular automaton simulation created by John Conway.",
          "rules" : "Rules",
          "rules1": "An celula can be life or dead",
          "rules2": "An celula dead if has 2 or less neighbors",
          "rules5": "An celula dead will become alive if it has 3 alive neighbors",
          "rules4": "An celula alive will become dead if has more than 3 alive neighbors",
          "rules3": "An celula stay life if has 2 or 3 alive neighbors",
        }
      },
      'es': {
        translation: {
          "title": "Juego de la Vida",
          "description": "Una simulación de autómata celular creada por John Conway.",
        }
      }
    }
  }, function(err, t) {
    // Atualiza os elementos com as traduções
    updateContent();
  });

// Função para atualizar o conteúdo com as traduções
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });
}