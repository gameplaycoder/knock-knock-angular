import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeMenuComponent } from './joke-menu.component';

describe('JokeMenuComponent', () => {
  let component: JokeMenuComponent;
  let fixture: ComponentFixture<JokeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokeMenuComponent]
    });
    fixture = TestBed.createComponent(JokeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
