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

// Objeto de habilidades por classe
const habilidades = {
  Arcanista: (stats) => {
    stats.ataque += 10;
    logLuta.textContent += `\n✨ Arcanista canalizou magia e ganhou +10 de ataque!`;
  },
  Bárbaro: (stats) => {
    if (Math.random() < 0.5) {
      stats.ataque *= 2;
      logLuta.textContent += `\n💢 Bárbaro enfurecido! Ataque dobrado.`;
    }
  },
  Clérigo: (stats) => {
    stats.defesa += 20;
    logLuta.textContent += `\n🙏 Clérigo se protegeu com oração sagrada (+20 defesa).`;
  },
  Ladino: (stats, oponente) => {
    if (oponente.defesa < stats.ataque) {
      oponente.defesa = 0;
      logLuta.textContent += `\n🗡️ Ladino atingiu o ponto fraco! Defesa inimiga anulada.`;
    }
  },
  Paladino: (stats) => {
    stats.ataque += 5;
    stats.defesa += 5;
    logLuta.textContent += `\n🛡️ Paladino recebeu benção divina (+5 ATQ / +5 DEF).`;
  },
  Caçador: (stats, oponente) => {
    if (stats.ataque > oponente.ataque) {
      oponente.ataque = 0;
      logLuta.textContent += `\n🏹 Caçador atacou primeiro e anulou o ataque inimigo.`;
    }
  },
  Druida: (stats) => {
    if (Math.random() < 0.3) {
      stats.defesa += 50;
      logLuta.textContent += `\n🌿 Druida invocou proteção natural (+50 DEF).`;
    }
  },
  Bucaneiro: (stats) => {
    stats.ataque += Math.floor(Math.random() * 30);
    logLuta.textContent += `\n🏴‍☠️ Bucaneiro usou tática surpresa e aumentou ataque!`;
  },
};

fightBtn.addEventListener('click', () => {
  const guerreiro1 = document.querySelector('#arena1 .card');
  const guerreiro2 = document.querySelector('#arena2 .card');

  if (!guerreiro1 || !guerreiro2) {
    logLuta.textContent = "Ambas as arenas precisam de um guerreiro!";
    return;
  }

  const nome1 = guerreiro1.querySelector('h3').textContent;
  const nome2 = guerreiro2.querySelector('h3').textContent;

  let stats1 = {
    ataque: parseInt(guerreiro1.dataset.ataque),
    defesa: parseInt(guerreiro1.dataset.defesa)
  };

  let stats2 = {
    ataque: parseInt(guerreiro2.dataset.ataque),
    defesa: parseInt(guerreiro2.dataset.defesa)
  };

  logLuta.textContent = "Habilidades ativadas:";

  if (habilidades[nome1]) habilidades[nome1](stats1, stats2);
  if (habilidades[nome2]) habilidades[nome2](stats2, stats1);

  const poder1 = stats1.ataque * 1.2 + stats1.defesa;
  const poder2 = stats2.ataque * 1.2 + stats2.defesa;

  let resultado = "";
  if (poder1 > poder2) {
    resultado = `\n🏆 ${nome1} venceu o duelo contra ${nome2}!`;
  } else if (poder2 > poder1) {
    resultado = `\n🏆 ${nome2} venceu o duelo contra ${nome1}!`;
  } else {
    resultado = `\n⚖️ Empate entre ${nome1} e ${nome2}!`;
  }

  logLuta.textContent += resultado;
});