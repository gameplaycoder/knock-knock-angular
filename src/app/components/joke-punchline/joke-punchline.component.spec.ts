import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokePunchlineComponent } from './joke-punchline.component';

describe('JokePunchlineComponent', () => {
  let component: JokePunchlineComponent;
  let fixture: ComponentFixture<JokePunchlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokePunchlineComponent]
    });
    fixture = TestBed.createComponent(JokePunchlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
