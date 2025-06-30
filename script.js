// Espera o carregamento completo da página
window.addEventListener("DOMContentLoaded", () => {

  // Seleciona todas as arenas
  const arenas = document.querySelectorAll('.arena');

  // Card sendo arrastado atualmente
  let cardSelecionado = null;

  // Quando o usuário começa a arrastar um card
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      cardSelecionado = card;
      e.dataTransfer.effectAllowed = 'move';
    });
  });

  // Permite que as arenas aceitem o drop
  arenas.forEach(arena => {
    arena.addEventListener('dragover', (e) => {
      e.preventDefault(); // Necessário para permitir o drop
    });

    // Quando o card é solto na arena
    arena.addEventListener('drop', (e) => {
      e.preventDefault();

      // Verifica se a arena já tem um guerreiro
      if (arena.querySelector('.card')) {
        alert("Essa arena já tem um guerreiro!");
        return;
      }

      // Move o card selecionado para dentro da arena
      arena.appendChild(cardSelecionado);
      cardSelecionado = null;
    });
  });

});
