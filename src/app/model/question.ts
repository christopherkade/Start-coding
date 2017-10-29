import {Answer} from './answer';

export class Question {
  value = '';
  answers: Answer[] = [];

  constructor(value: string, answers: Answer[]) {
    this.value = value;
    this.answers = answers;
  }
}
