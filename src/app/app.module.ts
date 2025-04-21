import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DoorComponent } from './components/door/door.component';
import { JokeMenuComponent } from './components/joke-menu/joke-menu.component';
import { JokeQuestionComponent } from './components/joke-question/joke-question.component';
import { JokePunchlineComponent } from './components/joke-punchline/joke-punchline.component';

@NgModule({
  declarations: [
    AppComponent,
    DoorComponent,
    JokeMenuComponent,
    JokeQuestionComponent,
    JokePunchlineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
