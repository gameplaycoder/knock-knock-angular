import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-joke-question',
  templateUrl: './joke-question.component.html',
  styleUrls: ['./joke-question.component.css']
})
export class JokeQuestionComponent {
  @Input() question: string = '';
  @Output() continue = new EventEmitter<void>();
}
