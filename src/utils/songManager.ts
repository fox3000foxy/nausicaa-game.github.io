// songManager.ts
// TypeScript version of the legacy songManager.js

export type AudioMap = Record<string, HTMLAudioElement>;

export class SongManager {
  private audioElements: AudioMap = {};
  private currentlyPlaying: string[] = [];

  loadSong(name: string, url: string, loop = false) {
    if (!this.audioElements[name]) {
      const audio = new Audio(url);
      audio.loop = loop;
      audio.addEventListener('ended', () => {
        this.stopSong(name);
        this.currentlyPlaying = this.currentlyPlaying.filter((s) => s !== name);
      });
      this.audioElements[name] = audio;
    }
  }

  playSong(name: string, reset = false) {
    console.log('Playing song: ' + name);
    const audio = this.audioElements[name];
    if (audio) {
      audio.play();
      if (reset) {
        audio.currentTime = 0;
      }
      if (!this.currentlyPlaying.includes(name)) {
        this.currentlyPlaying.push(name);
      }
    } else {
      console.warn(`Song "${name}" not loaded. Call loadSong() first.`);
    }
  }

  pauseSong(name: string) {
    const audio = this.audioElements[name];
    if (audio) {
      audio.pause();
    }
  }

  stopSong(name: string) {
    const audio = this.audioElements[name];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      this.currentlyPlaying = this.currentlyPlaying.filter((s) => s !== name);
    }
  }

  stopAllSongs() {
    this.currentlyPlaying.forEach((songName) => {
      const audio = this.audioElements[songName];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    this.currentlyPlaying = [];
  }

  setVolume(name: string, volume: number) {
    const audio = this.audioElements[name];
    if (audio) {
      audio.volume = volume; // 0..1
    } else {
      console.warn(`Song "${name}" not loaded.  Call loadSong() first.`);
    }
  }

  // optional features
  playPlaylist(_playlist: string[]) {
    // not yet implemented
  }

  transitionSong(fromName: string, toName: string, reset = false) {
    const fadeDuration = 1; // seconds
    const steps = 50;
    let currentStep = 0;
    const fromSong = this.audioElements[fromName];
    const toSong = this.audioElements[toName];

    if (!fromSong || !toSong) {
      console.warn(`One or both songs not loaded.  Call loadSong() first.`);
      return;
    }

    const fadeOutInterval = setInterval(() => {
      currentStep++;
      const volume = Math.max(0, 0.3 - currentStep / steps);
      fromSong.volume = volume;

      if (currentStep >= steps) {
        clearInterval(fadeOutInterval);
        this.stopSong(fromName);
        fromSong.volume = 0.3;

        toSong.volume = 0;
        this.playSong(toName, reset);
        currentStep = 0;

        const fadeInInterval = setInterval(() => {
          currentStep++;
          const vol = Math.min(0.3, currentStep / steps);
          toSong.volume = vol;

          if (currentStep >= steps) {
            clearInterval(fadeInInterval);
            toSong.volume = 0.3;
          }
        }, (fadeDuration * 1000) / steps);
      }
    }, (fadeDuration * 1000) / steps);
  }

  fadeSong(
    name: string,
    fadeIn = true,
    duration = 1,
    callback: (() => void) | null = null
  ) {
    const song = this.audioElements[name];
    if (!song) {
      console.warn(`Song "${name}" not loaded.`);
      return;
    }

    const steps = 50;
    let currentStep = 0;
    const initialVolume = fadeIn ? 0 : 1;
    const targetVolume = fadeIn ? 1 : 0;
    song.volume = initialVolume;

    if (fadeIn) {
      this.playSong(name);
    }

    const fadeInterval = setInterval(() => {
      currentStep++;
      const volume = fadeIn
        ? Math.min(1, currentStep / steps)
        : Math.max(0, 1 - currentStep / steps);
      song.volume = volume;

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        song.volume = targetVolume;

        if (!fadeIn) {
          this.stopSong(name);
        }
        if (callback) {
          callback();
        }
      }
    }, (duration * 1000) / steps);
  }
}

// singleton instance exported
export const songManager = new SongManager();

// pre-load assets, same as legacy script
songManager.loadSong('menu', '/assets/songs/menu.mp3', true);
songManager.loadSong('menu_next', '/assets/songs/menu_next.mp3', true);
songManager.loadSong('buttonClick', '/assets/songs/button_click.mp3');
songManager.loadSong('firstOracle', '/assets/songs/first-player-oracle.mp3');
songManager.loadSong('secondOracle', '/assets/songs/second-player-oracle.mp3');
songManager.loadSong('pop', '/assets/songs/pop.mp3');
songManager.loadSong('clic', '/assets/songs/clic.mp3');
songManager.loadSong('attack', '/assets/songs/attack.mp3');
songManager.loadSong('oraclePut', '/assets/songs/oracle_put.mp3');
songManager.loadSong('firstRound', '/assets/songs/first_round.mp3', true);
songManager.loadSong('announcer:allPick', '/assets/songs/all_pick.mp3');
songManager.loadSong('announcer:battleBegins', '/assets/songs/battle_begins.mp3');
songManager.loadSong('placed', '/assets/songs/placed.mp3');
songManager.loadSong('victory', '/assets/songs/victory.mp3');
songManager.loadSong('defeat', '/assets/songs/defeat.mp3');
songManager.loadSong('yourTurn', '/assets/songs/your_turn.mp3');
songManager.loadSong('notification', '/assets/songs/notification.mp3');
songManager.loadSong('timer', '/assets/songs/timer.mp3');
songManager.loadSong('manualEndTurn', '/assets/songs/manual_endturn.mp3');
