// tutorial.ts
// Utility to power the in‑app tutorial overlay.  It mirrors the legacy tutorial.js
// but pulls step definitions from the language JSON files we just created.

import { songManager } from './songManager';

export type TutorialStep = {
  title: string;
  text: string;
  highlight: string | null; // element id to highlight
};

let steps: TutorialStep[] = [];
let currentStep = 0;

function clearHighlights() {
  document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
}

function highlightElement(id: string | null) {
  clearHighlights();
  if (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('tutorial-highlight');
  }
}

function showStep(index: number) {
  const step = steps[index];
  if (!step) return;
  const titleEl = document.getElementById('tutorial-title');
  const textEl = document.getElementById('tutorial-text');
  const overlay = document.getElementById('tutorial-overlay');

  if (titleEl) titleEl.textContent = step.title;
  if (textEl) textEl.textContent = step.text;
  highlightElement(step.highlight);
  if (overlay) overlay.style.display = 'flex';
  songManager.playSong('buttonClick');
}

function closeTutorial() {
  const overlay = document.getElementById('tutorial-overlay');
  const box = document.getElementById('tutorial-box');
  if (overlay) overlay.style.display = 'none';
  if (box) box.style.display = 'none';
  clearHighlights();
  history.pushState({}, '', '/app');
}

export async function startTutorial() {
  const lang = (window as any).preferredLanguage || 'en';
  try {
    const resp = await fetch(`/data/translations/tutorial/${lang}.json`);
    steps = await resp.json();
  } catch (err) {
    console.error('Failed to load tutorial steps', err);
    steps = [];
  }

  currentStep = 0;
  showStep(currentStep);

  const nextBtn = document.getElementById('tutorial-next');
  const closeBtn = document.getElementById('tutorial-close');

  nextBtn?.addEventListener('click', () => {
    currentStep++;
    if (currentStep < steps.length) {
      showStep(currentStep);
    } else {
      closeTutorial();
    }
  });

  closeBtn?.addEventListener('click', closeTutorial);

  // legacy behaviour
  (window as any).demoMode = true;
  (window as any).game && ((window as any).game.cpuMode = true);
  songManager.playSong('menu_next');
}
