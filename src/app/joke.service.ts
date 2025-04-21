import { Injectable } from '@angular/core';
import { Joke } from './joke.model'; // or adjust path if needed

@Injectable({ providedIn: 'root' })
export class JokeService {
  questionStyle: 'random' | 'custom' | 'namewho' = 'namewho';

  jokes: Joke[] = [
    {
      name: "Lettuce",
      question: "Do you want to come inside?",
      punchline: "Lettuce in, it’s cold out here!"
    },
    {
      name: "Tank",
      question: "Do you know what to say?",
      punchline: "You're welcome!"
    },
    {
      name: "Boo",
      question: "Why are you crying?",
      punchline: "Don’t cry, it’s just a joke!"
    },
    {
      name: "Olive",
      question: "What do you say to someone you love?",
      punchline: "Olive you and I miss you!"
    },
    {
      name: "Annie",
      question: "Need help getting in?",
      punchline: "Annie way you can let me in?"
    },
    {
      name: "Cow says",
      question: "What does a cow say?",
      punchline: "Cow says moooo!"
    },
    {
      name: "Harry",
      question: "What are you waiting for?",
      punchline: "Harry up and answer the door!"
    },
    {
      name: "Atch",
      question: "Did you just sneeze?",
      punchline: "Bless you!"
    },
    {
      name: "Nobel",
      question: "Why didn’t I ring the bell?",
      punchline: "Nobel… that’s why I knocked!"
    },
    {
      name: "Howard",
      question: "Want to switch places?",
      punchline: "Howard you like to be knocking for a change?"
    },
    {
      name: "Dozen",
      question: "How many people live here?",
      punchline: "Dozen anyone want to let me in?"
    },
    {
      name: "Ice cream",
      question: "Do I sound excited?",
      punchline: "Ice cream every time I see a funny joke!"
    },
    {
      name: "Needle",
      question: "What do you need?",
      punchline: "Needle little help opening the door!"
    },
    {
      name: "Yoda",
      question: "Who is your favorite Jedi?",
      punchline: "Yoda one for me!"
    },
    {
      name: "Spell",
      question: "Can you spell your name?",
      punchline: "W-H-O!"
    },
    {
      name: "Canoe",
      question: "Want to help out?",
      punchline: "Canoe help me with the door, please?"
    },
    {
      name: "Dishes",
      question: "Do you know who this is?",
      punchline: "Dishes the police, open up!"
    },
    {
      name: "Europe",
      question: "Do you know where I’m from?",
      punchline: "No, YOU’RE a poo!"
    },
    {
      name: "Alpaca",
      question: "Do you need help packing?",
      punchline: "Alpaca the suitcase, you load the car!"
    },
    {
      name: "Broken pencil",
      question: "Want to hear a joke?",
      punchline: "Never mind, it’s pointless."
    }
  ];

  private localKey = 'shownJokes';

  getShownJokes(): string[] {
    const stored = localStorage.getItem(this.localKey);
    return stored ? JSON.parse(stored) : [];
  }

  addShownJoke(name: string) {
    const shown = this.getShownJokes();
    if (!shown.includes(name)) {
      shown.push(name);
      localStorage.setItem(this.localKey, JSON.stringify(shown));
    }
  }

  resetShownJokes() {
    localStorage.removeItem(this.localKey);
  }

  getQuestion(joke: Joke): string {
    if (this.questionStyle === 'custom' && joke.question) {
      return joke.question;
    } else if (this.questionStyle === 'namewho') {
      return `${joke.name} who?`;
    } else {
      const useCustom = Math.random() < 0.5;
      return (useCustom && joke.question)
        ? joke.question
        : `${joke.name} who?`;
    }
  }

  getRandomJokes(count: number = 3): Joke[] {
    const shown = this.getShownJokes();
    const available = this.jokes.filter(joke => !shown.includes(joke.name));

    // If we’ve run out, reset the list
    if (available.length < count) {
      this.resetShownJokes();
      return this.getRandomJokes(count); // try again after reset
    }

    return [...available]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }
}
