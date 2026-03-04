import { useEffect } from 'react';
import type { NavigateFunction } from 'react-router-dom';

// sleep helper
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mimics the legacy public/js/main.js behaviour but adapted for React.
 *
 * Call this hook from a component that renders the elements being
 * manipulated (nav links, `.card-preview` etc).  It returns helpers
 * you can call to trigger the old "play" animations and navigate
 * using the router.
 */
export function useLegacyScripts(navigate: NavigateFunction) {
  useEffect(() => {
    // navigation active state (anchors are typically <Link> so this may
    // be unnecessary, but we keep it for any raw anchors that remain)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      const handler = function (this: HTMLAnchorElement) {
        navLinks.forEach((l) => l.classList.remove('active'));
        this.classList.add('active');
      };
      link.addEventListener('click', handler);
    });

    // card hover animation
    const cards = document.querySelectorAll('.card-preview');
    cards.forEach((card) => {
      const enter = function (this: HTMLElement) {
        this.style.transform = 'translateY(-10px)';
      };
      const leave = function (this: HTMLElement) {
        this.style.transform = 'translateY(0)';
      };
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
    });

    // cleanup listeners when unmounting
    return () => {
      navLinks.forEach((link) => {
        link.replaceWith(link.cloneNode(true));
      });
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true));
      });
    };
  }, []);

  const play = async () => {
    // legacy animation modifies global `blob` object; keep same behaviour
    for (let i = 0; i < 150; i++) {
      if ((window as any).blob) {
        (window as any).blob.radius += 30;
      }
      await sleep(1);
    }
    navigate('/app?animation=true');
  };

  const playDemo = async () => {
    for (let i = 0; i < 150; i++) {
      if ((window as any).blob) {
        (window as any).blob.radius += 30;
      }
      await sleep(1);
    }
    navigate('/demo?animation=true');
  };

  return {
    play,
    playDemo,
  };
}
