import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css']
})
export class DoorComponent {
  @Input() isKnocking: boolean = false;
  @Output() knock = new EventEmitter<void>();

  onClick() {
    this.knock.emit();
  }
}
