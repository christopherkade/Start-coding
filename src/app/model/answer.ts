import { Question } from './question';
import {Keywords} from './keyword';


// A question's answer, contains a value (text), a potential next question and
// potential keywords
export class Answer {
  value: string;
  nextQuestion: Question;
  keywords: Keywords[] = [];

  constructor(value: string, nextQuestion?: Question, keywords?: Keywords[]) {
    this.value = value;

    if (keywords != null) {
      this.keywords = keywords;
    }
    if (nextQuestion != null) {
      this.nextQuestion = nextQuestion;
    }
  }
}
