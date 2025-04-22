import { Component, OnInit } from '@angular/core';
import { JokeService } from './joke.service';
import { Joke } from './joke.model';
import { ConfettiService } from './confetti.service';

enum GameState {
  Idle = 'idle',
  Menu = 'menu',
  Question = 'question',
  Punchline = 'punchline'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'knock-knock-game';
  GameState = GameState;
  gameState: GameState = GameState.Idle;

  jokes: Joke[] = [];
  currentJoke: Joke | null = null;

  isKnocking = false;

  questionText: string = '';
  punchlineText: string = '';

  // Preloaded sounds
  fartSound = new Audio('assets/fart.mp3');
  tadaSound = new Audio('assets/tadah.mp3');
  laughSound = new Audio('assets/laugh.mp3');
  knockSound = new Audio('assets/knock.mp3');

  selectedVoiceQuestion: SpeechSynthesisVoice | null = null;
  selectedVoicePunchline: SpeechSynthesisVoice | null = null;

  constructor(
    public jokeService: JokeService,
    private confettiService: ConfettiService
  ) {}

  ngOnInit() {
    this.preloadSounds();
    this.loadVoices();
  }

  preloadSounds() {
    this.fartSound.load();
    this.tadaSound.load();
    this.laughSound.load();
    this.knockSound.load();
  }

  loadVoices() {
    const tryVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        // Try to pick different voices for variety
        const enVoices = voices.filter(v => v.lang.startsWith('en'));
  
        this.selectedVoiceQuestion =
          enVoices.find(v => v.lang === 'en-GB') || enVoices[0];
  
        this.selectedVoicePunchline =
          enVoices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Fred')) ||
          enVoices.find(v => v !== this.selectedVoiceQuestion) ||
          enVoices[1];
  
        console.log('📢 Voices loaded:', {
          question: this.selectedVoiceQuestion?.name,
          punchline: this.selectedVoicePunchline?.name
        });
      } else {
        setTimeout(tryVoices, 100);
      }
    };
  
    tryVoices();
  }

  knock() {
    if (this.gameState === GameState.Menu || this.gameState === GameState.Question) return;

    this.playAudio(this.knockSound);
    this.isKnocking = true;

    setTimeout(() => {
      this.isKnocking = false;
      this.jokes = this.jokeService.getRandomJokes();
      this.gameState = GameState.Menu;
    }, 500);
  }

  chooseJoke(joke: Joke) {
    this.currentJoke = joke;
    this.jokeService.addShownJoke(joke.name);
    this.questionText = this.jokeService.getQuestion(joke);
    this.speak(this.questionText, this.selectedVoiceQuestion);
    this.gameState = GameState.Question;
  }

  showFinalPunchline() {
    if (!this.currentJoke) return;

    this.punchlineText = this.currentJoke.punchline;
    this.speak(this.punchlineText, this.selectedVoicePunchline);

    this.playAudio(this.tadaSound);
    setTimeout(() => {
      this.playAudio(this.laughSound);
    }, 500);

    if (Math.random() < 0.3) {
      this.fartSound.currentTime = 0;
      this.fartSound.play();
    }

    this.confettiService.fullBlast();
    this.gameState = GameState.Punchline;
  }

  playAudio(sound: HTMLAudioElement) {
    sound.currentTime = 0;
    sound.play();
  }

  speak(text: string, voice: SpeechSynthesisVoice | null = null) {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = voice || null;
      utter.lang = voice?.lang || 'en-US';
      utter.rate = 1;
      window.speechSynthesis.speak(utter);
    }
  }

  resetJokeHistory() {
    this.jokeService.resetShownJokes();
    console.log('🔄 Joke history reset.');
  }
}
