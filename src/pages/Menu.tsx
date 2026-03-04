import React from 'react';
import { Link } from 'react-router-dom';

const MenuPage: React.FC = () => {
  return (
    <>
      <link href="/css/game.css" rel="stylesheet" />
      <link href="/css/style.css" rel="stylesheet" />
      <link href="/css/menu.css" rel="stylesheet" />
      {/* decorative cards */}
      <div className="card-decoration card1"></div>
      <div className="card-decoration card2"></div>
      <div className="card-decoration card3"></div>

      {/* overlay */}
      <div className="overlay"></div>

      {/* language selector (hidden) */}
      {/* <div className="language-selector" style={{ display: 'none' }}>
        <select
          id="language-selector"
          onChange={e => {
          }}
        >
          <option value="fr" selected>
            Français
          </option>
          <option value="en">English</option>
        </select>
      </div> */}

      <div className="game-container">
        <div className="logo-container" style={{ zIndex: 10 }}>
          <h1 data-i18n="game-title">NAUSICAA</h1>
          <div className="tagline" data-i18n="tagline">
            Card Game of Myths & Legends
          </div>
        </div>

        <div className="menu-container">
          <Link className="menu-option" to="/app">
            <div className="menu-icon">▶</div>
            <div className="menu-text">
              <h3 data-i18n="play">PLAY</h3>
            </div>
          </Link>

          <a className="menu-option" href="#" onClick={e => e.preventDefault()}>
            <div className="menu-icon">?</div>
            <div className="menu-text">
              <h3 data-i18n="rules">RULES</h3>
            </div>
          </a>

          <a
            className="menu-option"
            style={{ opacity: 0.5, pointerEvents: 'none' }}
          >
            <div className="menu-icon">⚙</div>
            <div className="menu-text">
              <h3 data-i18n="settings">SETTINGS</h3>
            </div>
          </a>

          <a className="menu-option" href="#" onClick={e => e.preventDefault()}>
            <div className="menu-icon">i</div>
            <div className="menu-text">
              <h3 data-i18n="about">ABOUT</h3>
            </div>
          </a>
        </div>
        <div className="footer" style={{ backgroundColor: 'transparent' }}>
          <span data-i18n="copyright">© 2025 Nausicaa Card Game</span>
        </div>
      </div>

      {/* rules and about panels could be lifted into React modals later */}
      <div className="rules-panel" id="rules-panel" style={{ display: 'none' }}>
        <div className="rules-content">
          <h2 data-i18n="quick-rules">Règles Rapides</h2>
          <button id="close-rules" className="close-btn">
            ×
          </button>
          <div className="rules-section">
            <h3 data-i18n="objective">Objectif</h3>
            <p data-i18n="objective-desc">
              Éliminer l'Oracle adverse pour gagner la partie.
            </p>
          </div>
          <div className="rules-section">
            <h3 data-i18n="mana">Mana</h3>
            <p data-i18n="mana-desc">
              Commence à 1, augmente de 1 chaque tour (max. 6). Utilisé pour
              invoquer des unités, attaquer et utiliser des capacités.
            </p>
          </div>
          <div className="rules-section">
            <h3 data-i18n="actions">Actions</h3>
            <ul>
              <li><span data-i18n="action_summon"></span></li>
              <li><span data-i18n="action_move"></span></li>
              <li><span data-i18n="action_dash"></span></li>
              <li><span data-i18n="action_attack"></span></li>
            </ul>
          </div>
          <div className="rules-section">
            <h3 data-i18n="restrictions">Restrictions</h3>
            <p data-i18n="restrictions-desc">
              Les unités fraîchement invoquées ne peuvent ni se déplacer ni
              attaquer ce tour.
            </p>
          </div>
        </div>
      </div>

      <div className="rules-panel" id="about-panel" style={{ display: 'none' }}>
        <div className="rules-content">
          <h2 data-i18n="about-title">About Nausicaa</h2>
          <button id="close-about" className="close-btn">
            ×
          </button>
          <div className="rules-section">
            <h3 data-i18n="about-team">Team</h3>
            <p data-i18n="about-team-desc">
              Nausicaa Card Game is created by a team of passionate developers and
              designers composed by only me.
            </p>
          </div>
          <div className="rules-section">
            <h3 data-i18n="about-inspiration">Inspiration</h3>
            <p data-i18n="about-inspiration-desc">
              Inspired by myths and legends from around the world, and chess
              game board, also CHEGG concept by gerg.
            </p>
          </div>
          <div className="rules-section">
            <h3 data-i18n="about-contact">Contact</h3>
            <p data-i18n="about-contact-desc">
              Email me at fox3000foxy@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
