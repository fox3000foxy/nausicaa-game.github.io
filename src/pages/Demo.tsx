import React from 'react';
import { Link } from 'react-router-dom';

const Demo: React.FC = () => {
  const resetScore = () => {
    (window as any).game?.resetScore();
  };

  return (
    <>
      {/* needed stylesheet for demo/tutorial */}
      <link href="/css/style.css" rel="stylesheet" />
      <link href="/css/game.css" rel="stylesheet" />
      <link href="/css/app.css" rel="stylesheet" />
      <link href="/css/tutorial.css" rel="stylesheet" />

      <div className="overlay" />
      <header className="game-header retracted">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            top: '16px',
          }}
        >
          <div
            className="logo"
            style={{
              background: "url('./assets/icon.png'),beige",
              width: '48px',
              height: '48px',
              backgroundSize: 'contain',
              borderRadius: '50%',
            }}
          ></div>
          <h1 style={{ position: 'relative', left: '8px', top: '-4px' }}>
            Nausicaa
          </h1>
        </div>
        <button className="header-toggle-button" id="header-toggle-button">
          ☰
        </button>
        <div className="game-controls">
          <button id="reset-game" className="btn secondary" data-i18n="new-game">
            Nouvelle partie
          </button>
          <button id="rules-toggle" className="btn secondary" data-i18n="rules">
            Règles
          </button>
          <Link to="/" className="btn secondary" data-i18n="back-home">
            Retour à l'accueil
          </Link>
          {/* hidden selector omitted */}
        </div>
      </header>

      <main className="game-container">
        <aside className="player-area player-one">
          <div className="player-info">
            <h3 data-i18n="player-1">Joueur 1</h3>
            <div className="mana-container">
              <div className="mana-label" data-i18n="mana">
                Mana:{' '}
              </div>
              <div className="mana-crystals" id="player-one-mana">
                1/1
              </div>
            </div>
          </div>

          <div className="hand-container">
            <h4 data-i18n="your-hand">Votre main</h4>
            <div className="hand" id="player-one-hand">
              {/* Cards will be dynamically added here */}
            </div>
          </div>

          <div className="action-panel">
            <div className="current-action" id="player-one-action" data-i18n="select-unit">
              Sélectionnez une unité
            </div>
            <button id="end-turn-one" className="btn primary" data-i18n="end-turn">
              Terminer le tour
            </button>
          </div>
        </aside>

        <section className="board-container">
          <div className="turn-indicator" id="turn-indicator" data-i18n="player-1-turn">
            Tour du Joueur 1
          </div>

          <div className="options">
            <div className="timer" style={{ display: 'none' }}>
              Timer mode
              <label className="switch">
                <input type="checkbox" id="timerMode" />
                <span className="slider round" />
              </label>
            </div>
            <div className="cpu-mode" style={{ display: 'none' }}>
              CPU mode
              <label className="switch">
                <input type="checkbox" id="cpuMode" />
                <span className="slider round" />
              </label>
            </div>
            <div id="timer-display" style={{ display: 'none', width: '200px', textAlign: 'center' }}>
              15
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <span id="score-display" style={{ textAlign: 'center' }}>
                0 - 0
              </span>
              <span
                onClick={resetScore}
                style={{ cursor: 'pointer', marginLeft: '8px', opacity: 0.6 }}
              >
                ↺
              </span>
            </div>
          </div>
          <div className="game-board" id="game-board">
            {/* The 10x8 board will be generated here by JavaScript */}
          </div>

          <div className="unit-info" id="unit-info">
            <h4 data-i18n="unit-info">Information sur l'unité</h4>
            <div className="unit-details" data-i18n="select-unit-details">
              Sélectionnez une unité pour voir ses détails
            </div>
          </div>
        </section>

        <aside className="player-area player-two">
          <div className="player-info">
            <h3 data-i18n="player-2">Joueur 2</h3>
            <div className="mana-container">
              <div className="mana-label" data-i18n="mana">
                Mana:{' '}
              </div>
              <div className="mana-crystals" id="player-two-mana">
                1/1
              </div>
            </div>
          </div>

          <div className="hand-container">
            <h4 data-i18n="opponent-hand">Main adverse</h4>
            <div className="hand" id="player-two-hand">
              {/* Cards will be dynamically added here */}
            </div>
          </div>

          <div className="action-panel">
            <div className="current-action" id="player-two-action" data-i18n="waiting">
              En attente...
            </div>
            <button id="end-turn-two" className="btn primary" disabled data-i18n="end-turn">
              Terminer le tour
            </button>
          </div>
        </aside>
      </main>

      <div className="rules-panel" id="rules-panel">
        <div className="rules-content">
          <h2 data-i18n="quick-rules">Règles Rapides</h2>
          <button id="close-rules" className="close-btn">
            ×
          </button>
          <div className="rules-section">
            <h3 data-i18n="objective">Objectif</h3>
            <p data-i18n="objective-desc">Éliminer l'Oracle adverse pour gagner la partie.</p>
          </div>
          <div className="rules-section">
            <h3 data-i18n="mana">Mana</h3>
            <p data-i18n="mana-rules-desc">
              Commence à 1, augmente de 1 chaque tour (max. 6). Utilisé pour invoquer des
              unités, attaquer et utiliser des capacités.
            </p>
          </div>
          <div className="rules-section">
            <h3 data-i18n="actions">Actions</h3>
            <ul>
              <li data-i18n="action-summon">
                <strong>Invoquer:</strong> Placez des unités dans votre zone de déploiement (2 rangées).
              </li>
              <li data-i18n="action-move">
                <strong>Déplacer:</strong> 1 case gratuitement par tour selon le mouvement de l'unité.
              </li>
              <li data-i18n="action-dash">
                <strong>Dash:</strong> 1 mana pour un mouvement supplémentaire (pas d'attaque ce tour).
              </li>
              <li data-i18n="action-attack">
                <strong>Attaquer:</strong> 1 mana par attaque, selon la portée de l'unité.
              </li>
            </ul>
          </div>
          <div className="rules-section">
            <h3 data-i18n="restrictions">Restrictions</h3>
            <p data-i18n="restrictions-desc">
              Les unités fraîchement invoquées ne peuvent ni se déplacer ni attaquer ce tour.
            </p>
          </div>
          <div className="rules-section">
            <h3 data-i18n="units">Unités</h3>
            <p data-i18n="units-rules-desc">
              Les unités ont chacun leurs particularités. Vous pouvez les consulter en
              cliquant{' '}
              <a
                style={{ color: 'rgb(0, 132, 255)', textDecoration: 'underline' }}
                href="https://lumiantis.com/#units-types"
                target="_blank"
                rel="noreferrer"
              >
                ici
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="chat-toggle" id="chat-toggle" style={{ display: 'none' }}>
        💬<span className="notification-badge" id="chat-notification-badge"></span>
      </div>

      <div className="chat-container hidden" id="chat-container">
        <div id="chat-messages" className="chat-messages"></div>
        <div className="chat-input-area">
          <input
            type="text"
            id="chat-input"
            autoComplete="off"
            placeholder="Entrez votre message..."
            data-i18n="chat-placeholder"
          />
          <button id="chat-send" className="btn primary" data-i18n="send">
            Send
          </button>
        </div>
      </div>

      {/* tutorial overlay/box specific to demo page */}
      <div className="tutorial-overlay" id="tutorial-overlay" />
      <div className="tutorial-box" id="tutorial-box">
        <div className="tutorial-content" id="tutorial-content">
          <h2 id="tutorial-title" data-i18n="tutorial-title"></h2>
          <p id="tutorial-text" data-i18n="tutorial-text"></p>
          <button id="tutorial-next" className="btn primary" data-i18n="next">
            Continuer
          </button>
          <button id="tutorial-close" className="btn secondary" data-i18n="close" style={{ display: 'none' }}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Demo;

