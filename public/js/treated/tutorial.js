document.addEventListener('DOMContentLoaded', () => {
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    const tutorialBox = document.getElementById('tutorial-box');
    const tutorialContent = document.getElementById('tutorial-content');
    const tutorialTitle = document.getElementById('tutorial-title');
    const tutorialText = document.getElementById('tutorial-text');
    const tutorialNextButton = document.getElementById('tutorial-next');
    const tutorialCloseButton = document.getElementById('tutorial-close');
    const gameBoard = document.getElementById('game-board');
    const playerOneHand = document.getElementById('player-one-hand');
    const playerTwoHand = document.getElementById('player-two-hand');
    const unitInfo = document.getElementById('unit-info');
    const endTurnOneButton = document.getElementById('end-turn-one');
    const endTurnTwoButton = document.getElementById('end-turn-two');
    const scoreDisplay = document.getElementById('score-display');
    // startGameTheme();

    let step = 0;
    let steps = [];
    const lang = (window).preferredLanguage || 'en';
    fetch(`/data/translations/tutorial/${lang}.json`)
      .then(r => r.json())
      .then(data => {
        steps = data;
        showTutorialStep(step);
        game.cpuMode = true;
        songManager.playSong('menu_next');
        window.demoMode = true;
      })
      .catch(err => {
        console.error('Failed to load tutorial steps', err);
      });

    function showTutorialStep(stepIndex) {
        const stepObj = steps[stepIndex];
        if (!stepObj) return;
        tutorialTitle.textContent = stepObj.title;
        tutorialText.textContent = stepObj.text;

        // Reset highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));

        if (stepObj.highlight) {
            const el = document.getElementById(stepObj.highlight);
            if (el) el.classList.add('tutorial-highlight');
        }

        tutorialOverlay.style.display = 'flex';
        songManager.playSong('buttonClick');
    }

    tutorialNextButton.addEventListener('click', () => {
        step++;
        if (step < steps.length) {
            showTutorialStep(step);
        } else {
            closeTutorial();
        }
    });

    tutorialCloseButton.addEventListener('click', () => {
        closeTutorial();
    });

    function closeTutorial() {
        tutorialOverlay.style.display = 'none';
        tutorialBox.style.display = 'none';
        // Remove all highlights
        gameBoard.classList.remove('tutorial-highlight');
        playerOneHand.classList.remove('tutorial-highlight');
        playerTwoHand.classList.remove('tutorial-highlight');
        unitInfo.classList.remove('tutorial-highlight');
        endTurnOneButton.classList.remove('tutorial-highlight');
        endTurnTwoButton.classList.remove('tutorial-highlight');
        scoreDisplay.classList.remove('tutorial-highlight');
        document.querySelectorAll('.player-one .mana-container').forEach(el => el.classList.remove('tutorial-highlight'));

        history.pushState({}, null, '/app');
    }

    // Start the tutorial automatically
    showTutorialStep(step);
    game.cpuMode = true;
    songManager.playSong('menu_next');
    window.demoMode = true;
});