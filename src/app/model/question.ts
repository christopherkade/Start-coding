import {Answer} from './answer';

/**
 * Question model
 * Represents one question in our quiz
 */
export class Question {
  value = '';
  answers: Answer[] = [];
}
