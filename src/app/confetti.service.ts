import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({ providedIn: 'root' })
export class ConfettiService {
  launchConfetti() {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      angle: 90
    });
  }

  burstLeft() {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 }
    });
  }

  burstRight() {
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 }
    });
  }

  fullBlast() {
    this.launchConfetti();
    this.burstLeft();
    this.burstRight();
  }
}
