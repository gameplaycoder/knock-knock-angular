import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DoorComponent } from './components/door/door.component';
import { JokeMenuComponent } from './components/joke-menu/joke-menu.component';
import { JokeQuestionComponent } from './components/joke-question/joke-question.component';
import { JokePunchlineComponent } from './components/joke-punchline/joke-punchline.component';


describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [      
      AppComponent,
      DoorComponent,
      JokeMenuComponent,
      JokeQuestionComponent,
      JokePunchlineComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'knock-knock-game'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('knock-knock-game');
  });

});
