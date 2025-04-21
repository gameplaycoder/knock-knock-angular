import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-joke-punchline',
  templateUrl: './joke-punchline.component.html',
  styleUrls: ['./joke-punchline.component.css']
})
export class JokePunchlineComponent {
  @Input() punchline: string = '';
}