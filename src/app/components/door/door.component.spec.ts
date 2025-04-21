import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css']
})
export class DoorComponent {
  @Output() knock = new EventEmitter<void>();
  @Input() isKnocking: boolean = false;

  onClick() {
    this.knock.emit();
  }
}
