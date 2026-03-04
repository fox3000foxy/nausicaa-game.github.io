import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <>
      <header>
        <link href="/css/fonts.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
        <div className="logo-container">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
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
            <h1
              style={{
                position: 'relative',
                left: '8px',
                top: '-4px',
              }}
            >
              Nausicaa
            </h1>
          </div>
          <p className="tagline" data-i18n="tagline">
            Stratégie mythologique sur plateau
          </p>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/#accueil" data-i18n="accueil">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/#how-to-play" data-i18n="regles">
                Règles
              </Link>
            </li>
            <li>
              <Link to="/#units-types" data-i18n="unites">
                Unités
              </Link>
            </li>
            <li>
              <Link to="/#newsletter" data-i18n="contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>404 – Page introuvable</h1>
        <p>
          La ressource demandée n&apos;existe pas dans l&apos;application React.
          Si vous tentez d&apos;accéder à un fichier statique du dossier
          <code>public</code>, assurez-vous que le chemin est correct.
        </p>
        <Link to="/" className="btn primary" style={{ marginTop: '1rem' }}>
          Retour à l'accueil
        </Link>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <h2 data-i18n="footer-title">Nausicaa</h2>
            <p data-i18n="footer-tagline">Stratégie mythologique sur plateau.</p>
            <p data-i18n="footer-sound-credits">
              La plupart des effets sonores viennent de Dota 2.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3 data-i18n="quick-links">Liens rapides</h3>
              <ul>
                <li>
                  <Link to="#" data-i18n="source-code">
                    Code source
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 data-i18n="community">Communauté</h3>
              <ul>
                <li>
                  <a
                    href="https://discord.gg/fox3000foxy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="social-links">
            <a
              href="https://instagram.com/fox3000foxy"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              Instagram
            </a>
            <a
              href="https://discord.gg/fox3000foxy"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              Discord
            </a>
            <a
              href="https://github.com/Nausicaa-game/nausicaa-game.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              data-i18n="source-code"
            >
              Code source
            </a>
          </div>
        </div>
        <div className="copyright">
          <p data-i18n="copyright">© 2025 Nausicaa Game. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
};

export default NotFound;
