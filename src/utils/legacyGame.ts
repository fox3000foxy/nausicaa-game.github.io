// legacyGame.ts
// Translated from public/js/app.js into TypeScript and exposed as a loader

import { Game } from './Game';
import { P2PGameConnection } from './p2pConnection';
import { songManager } from './songManager';

// (globals such as translations, preferredLanguage remain on window for legacy code)
export type LegacyGameHandle = {
  destroy: () => void;
  game: any | null;
  p2pConnection: any | null;
  handleCellMouseOver: (event: Event, targetElement?: HTMLElement | null) => void;
  handleCellMouseOut: (event: Event) => void;
};

// helper to parse query string into JSON
function queryStringToJSON(qs?: string) {
  qs = qs || location.search.slice(1);

  const pairs = qs.split('&');
  const result: Record<string, any> = {};
  pairs.forEach(function (p) {
    const pair = p.split('=');
    const key = pair[0];
    const value = decodeURIComponent(pair[1] || '');

    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });

  return JSON.parse(JSON.stringify(result));
}

export function loadLegacyGame(): LegacyGameHandle {
  let game: any = null;
  let p2pConnection: any = null;

  // DOM elements used later
  const chatContainer = document.getElementById('chat-container');
  const chatToggle = document.getElementById('chat-toggle');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input') as HTMLInputElement | null;
  const chatSend = document.getElementById('chat-send');
  const chatNotificationBadge = document.getElementById('chat-notification-badge');

  function addchatMessage(player: number, messageText: string, sendEvent = true) {
    console.log('Adding chat message', player, messageText);
    if (messageText.trim() !== '') {
      const messageElement = document.createElement('span');
      messageElement.textContent = 'Joueur ' + player + ': ' + messageText;
      // @ts-ignore profanity plugin still is jquery-based
      $(messageElement).profanityFilter({
        customSwears: (window as any).swears,
      });
      messageElement.style.color = 'black';
      messageElement.style.textTransform = 'none';
      chatMessages?.prepend(messageElement);
      if (sendEvent && p2pConnection) {
        p2pConnection.sendMessage({
          type: 'action',
          action: {
            name: 'sendMessage',
            player: player,
            message: messageText,
          },
        });
      }

      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  }

  function handleIncomingMessage(player: number, messageText: string) {
    addchatMessage(player, messageText, false);

    if (
      chatContainer?.classList.contains('hidden') ||
      !document.hasFocus()
    ) {
      songManager.playSong('notification', true);
      if (chatNotificationBadge) {
        chatNotificationBadge.style.display = 'inline-block';
      }
    }
  }
  // expose for legacy code
  (window as any).handleIncomingMessage = handleIncomingMessage;

  function handleCellMouseOver(event: Event, targetElement: HTMLElement | null = null) {
    const cell = (targetElement || event.target) as HTMLElement;
    const row = parseInt(cell.dataset.row || '');
    const col = parseInt(cell.dataset.col || '');

    if ((row !== 0 && !row) || (col !== 0 && !col)) return;

    const unit = game?.board[row][col];
    if (unit) {
      game.updateUnitInfoPanel(unit);
      if (unit.player === game.currentPlayer) {
        const validMoves = game.getValidMoves(row, col) || [];
        const validAttacks = game.getValidAttacks(row, col) || [];
        validMoves.forEach((move: any) => {
          const moveCell = document.querySelector(
            `.board-cell[data-row="${move.row}"][data-col="${move.col}"]`
          );
          if (moveCell && !game.selectedUnit) {
            moveCell.classList.add('valid-move');
          }
        });
        validAttacks.forEach((attack: any) => {
          const attackCell = document.querySelector(
            `.board-cell[data-row="${attack.row}"][data-col="${attack.col}"]`
          );
          if (attackCell && !game.selectedUnit) {
            attackCell.classList.add('valid-attack');
          }
        });
      }
    } else {
      const details = document.querySelector('#unit-info .unit-details');
      if (details) {
        details.textContent = (window as any).translations[
          (window as any).preferredLanguage
        ]['select_unit'];
      }
    }
  }

  function handleCellMouseOut(_event: Event) {
    const cells = document.querySelectorAll('.board-cell');
    cells.forEach((cell) => {
      cell.classList.remove('valid-move', 'valid-attack');
    });
  }

  // original onload logic - execute immediately
  const qs = queryStringToJSON();

  // chat event listeners
  chatToggle?.addEventListener('click', function () {
    chatContainer?.classList.toggle('hidden');
    if (chatNotificationBadge) chatNotificationBadge.style.display = 'none';
    if (!chatContainer?.classList.contains('hidden')) {
      chatInput?.focus();
    }
  });

  chatSend?.addEventListener('click', () => {
    if (p2pConnection?.gameId) {
      const player = p2pConnection.isHost ? 1 : 2;
      addchatMessage(player, chatInput?.value || '');
      if (chatInput) chatInput.value = '';
      chatInput?.focus();
    }
  });

  chatInput?.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      chatSend?.click();
      event.preventDefault();
    }
  });

  window.addEventListener('focus', function () {
    if (!chatContainer?.classList.contains('hidden')) {
      if (chatNotificationBadge) chatNotificationBadge.style.display = 'none';
    }
  });

  // board creation
  const gameBoard = document.getElementById('game-board');
  if (gameBoard) {
    for (let row = 0; row < 8; row++) {
      for (let col = 1; col < 10; col++) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.dataset.row = String(row);
        cell.dataset.col = String(col);

        if ((row + col) % 2 === 1) {
          cell.classList.add('dark');
        }
        if (row < 2) {
          cell.classList.add('player-two-spawn');
        } else if (row >= 6) {
          cell.classList.add('player-one-spawn');
        }

        gameBoard.appendChild(cell);
        cell.addEventListener('mouseenter', handleCellMouseOver);
        cell.addEventListener('mouseleave', handleCellMouseOut);
        cell.addEventListener('mouseover', handleCellMouseOver);
        cell.addEventListener('mouseout', handleCellMouseOut);
      }
    }
  }

  // rules panel toggling
  const rulesToggle = document.getElementById('rules-toggle');
  const rulesPanel = document.getElementById('rules-panel');
  const closeRules = document.getElementById('close-rules');

  rulesToggle?.addEventListener('click', function () {
    if (rulesPanel) rulesPanel.style.display = 'flex';
  });
  closeRules?.addEventListener('click', function () {
    if (rulesPanel) rulesPanel.style.display = 'none';
  });

  let backgroundThemePlaying = false;

  const startGameTheme = () => {
    if (!backgroundThemePlaying) {
      if (!(window as any).demoMode) songManager.playSong('firstRound');
      songManager.setVolume('firstRound', 0.3);
      songManager.playSong('announcer:allPick');
      backgroundThemePlaying = true;
    }
    const timerEl = document.querySelector('.timer') as HTMLElement;
    const cpuModeEl = document.querySelector('.cpu-mode') as HTMLElement;
    if (timerEl) timerEl.style.display = 'none';
    if (cpuModeEl) cpuModeEl.style.display = 'none';
    if (game?.cpuMode) game.cpuPlayer.enableCPU();
  };
  (window as any).startGameTheme = startGameTheme;

  document.querySelector('.game-container')?.addEventListener('click', function () {
    if (!chatContainer?.classList.contains('hidden')) {
      chatToggle?.click();
    }
  });

  // overlay animation logic
  if (qs.animation) {
    const overlay = document.querySelector('.overlay') as HTMLElement;
    if (overlay) {
      overlay.style.animation = 'overlayAnimation 1.5s forwards';
    }
    history.pushState({}, '', '/app');
  } else {
    const overlay = document.querySelector('.overlay') as HTMLElement;
    if (overlay) overlay.style.display = 'none';
  }

  const header = document.querySelector('.game-header') as HTMLElement;
  const headerToggleButton = document.getElementById('header-toggle-button');
  headerToggleButton?.addEventListener('click', () => {
    header.classList.toggle('retracted');
  });
  header?.addEventListener('click', (event) => {
    if (event.target === headerToggleButton) return;
    if (header.classList.contains('retracted')) {
      header.classList.remove('retracted');
    }
  });

  const timerModeCheckbox = document.getElementById('timerMode');
  timerModeCheckbox?.addEventListener('change', function (this: HTMLInputElement) {
    console.log('Enabling timer mode:', this.checked);
    game.setTimerMode(this.checked);
  });
  const cpuModeCheckbox = document.getElementById('cpuMode');
  cpuModeCheckbox?.addEventListener('change', function (this: HTMLInputElement) {
    console.log('Enabling CPU mode:', this.checked);
    game.setCpuMode(this.checked);
  });

  const _qsObj = queryStringToJSON();
  let _socketServer: any = null; // preserved for legacy code semantics
  // avoid unused errors
  void _qsObj;
  void _socketServer;

  // initialization that used to run on DOMContentLoaded
  game = new Game();
  p2pConnection = new P2PGameConnection(game);
  p2pConnection.interceptGameActions();

  async function getSwears(language: string) {
    const response = await fetch(`/js/swearList/${language}.json`);
    const data = await response.json();
    console.log('Swear list ' + language + ' loaded');
    return data;
  }

  async function loadAllSwearsList() {
    let swears: string[] = [];
    const swearsEn = await getSwears('en');
    const swearsFr = await getSwears('fr');
    const swearsDe = await getSwears('de');
    const swearsEs = await getSwears('es');
    const swearsIt = await getSwears('it');
    const swearsPt = await getSwears('pt');
    const swearsRu = await getSwears('ru');
    swears = [...swearsEn, ...swearsFr, ...swearsDe, ...swearsEs, ...swearsIt, ...swearsPt, ...swearsRu];
    (window as any).swears = swears;
    return swears;
  }

  loadAllSwearsList();

  // expose handle for callers to cleanup if needed
  return {
    destroy: () => {
      // no-op for now, listeners are left attached
    },
    game,
    p2pConnection,
    handleCellMouseOver,
    handleCellMouseOut,
  };
}
