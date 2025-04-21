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
  GameState = GameState; // expose enum to template
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

  constructor(
    public jokeService: JokeService,
    private confettiService: ConfettiService
  ) {}

  ngOnInit() {
    // Preload sounds
    this.fartSound.load();
    this.tadaSound.load();
    this.laughSound.load();
    this.knockSound.load();
  }

  knock() {
    // Only allow knock from Idle or Punchline state
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
    this.questionText = this.jokeService.getQuestion(joke);
    this.speak(this.questionText);
    this.gameState = GameState.Question;
  }

  showFinalPunchline() {
    if (!this.currentJoke) return;

    this.punchlineText = this.currentJoke.punchline;
    this.speak(this.punchlineText);

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

  speak(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  }
}
