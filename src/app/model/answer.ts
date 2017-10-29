import { Question } from './question';

export class Answer {
  value: string;
  nextQuestion: Question;

  constructor(value: string, nextQuestion?: Question) {
    this.value = value;

    if (nextQuestion != null) {
      this.nextQuestion = nextQuestion;
    }
  }
}
