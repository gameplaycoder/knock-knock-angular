import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Joke } from '../../joke.model';

@Component({
  selector: 'app-joke-menu',
  templateUrl: './joke-menu.component.html',
  styleUrls: ['./joke-menu.component.css']
})
export class JokeMenuComponent {
  @Input() jokes: Joke[] = [];
  @Output() selectJoke = new EventEmitter<Joke>();

  onSelect(joke: Joke) {
    this.selectJoke.emit(joke);
  }
}
