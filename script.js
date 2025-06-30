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

// Botão de luta
const fightBtn = document.getElementById('fightBtn');
const logLuta = document.getElementById('logLuta');

// Botão resetar
const resetBtn = document.getElementById('resetBtn');
const cardsContainer = document.querySelector('.cards-container');

resetBtn.addEventListener('click', () => {
  // Remove os cards das arenas e devolve para o container original
  const arenas = [document.getElementById('arena1'), document.getElementById('arena2')];

  arenas.forEach(arena => {
    const card = arena.querySelector('.card');
    if (card) {
      cardsContainer.appendChild(card); // Move o card de volta
    }
  });

  // Limpa o log de luta
  logLuta.textContent = "Log de Luta";
});


fightBtn.addEventListener('click', () => {
  // Seleciona os cards dentro das arenas
  const guerreiro1 = document.querySelector('#arena1 .card');
  const guerreiro2 = document.querySelector('#arena2 .card');

  // Verifica se os dois jogadores selecionaram um guerreiro
  if (!guerreiro1 || !guerreiro2) {
    logLuta.textContent = "Ambas as arenas precisam de um guerreiro!";
    return;
  }

  // Recupera os atributos dos cards
  const ataque1 = parseInt(guerreiro1.dataset.ataque);
  const defesa1 = parseInt(guerreiro1.dataset.defesa);
  const nome1 = guerreiro1.querySelector('h3').textContent;

  const ataque2 = parseInt(guerreiro2.dataset.ataque);
  const defesa2 = parseInt(guerreiro2.dataset.defesa);
  const nome2 = guerreiro2.querySelector('h3').textContent;

  // Simples cálculo de força total
  const poder1 = ataque1 * 1.2 + defesa1;
  const poder2 = ataque2 * 1.2 + defesa2;

  // Define o vencedor
  let resultado = "";
  if (poder1 > poder2) {
    resultado = `🏆 ${nome1} venceu o duelo contra ${nome2}!`;
  } else if (poder2 > poder1) {
    resultado = `🏆 ${nome2} venceu o duelo contra ${nome1}!`;
  } else {
    resultado = `⚖️ Empate entre ${nome1} e ${nome2}!`;
  }

  // Exibe no log
  logLuta.textContent = resultado;
});
