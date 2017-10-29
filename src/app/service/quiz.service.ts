import { Injectable } from '@angular/core';
import { Answer } from '../model/answer';
import { Question } from '../model/question';

@Injectable()
export class QuizService {

  previousQuestions: Question[];
  currentQuestion: Question;
  answers: Answer[];

  constructor() {
    this.initQuestions();
  }

  initQuestions() {
    // QUESTION 4, 4.1, 4.2 (Web)
    const question4 = new Question('Great, using what tech primarily?', [
      new Answer('Spring framework'),
      new Answer('NodeJS')
    ]);
    const question4o1 = new Question('Great, using what tech primarily?', [
      new Answer('React'),
      new Answer('Angular (2+, JS)'),
      new Answer('VueJS'),
    ]);
    const question4o2 = new Question('On what would you rather focus your learnings?', [
      new Answer('Frontend', question4o1),
      new Answer('Backend', question4)
    ]);

    // QUESTION 3 (Web), 3.1 (Embedded), 3.2 (Software),
    const question3 = new Question('Backend, frontend, both?', [
      new Answer('Back', question4),
      new Answer('Front', question4o1),
      new Answer('Both !', question4o2),
    ]);
    const question3o1 = new Question('Using what programming language particularly?', [
      new Answer('C'),
      new Answer('Assembly'),
      new Answer('FORTRAN'),
      new Answer('COBOL')
    ]);
    const question3o2 = new Question('Using what programming language particularly?', [
      new Answer('Java'),
      new Answer('C#'),
      new Answer('Python'),
      new Answer('Javascript')
    ]);
    const question3o3 = new Question('What specifically are you interested in about computers?', [
      new Answer('The way the hardware (components inside your computer) work'),
      new Answer('The awesome tools I use everyday (for example, Microsoft\'s Excel or Facebook')
    ]);
    const question3o4 = new Question('Now that\'s the spirit ! What would you like to build?', [
      new Answer('Websites'),
      new Answer('Mobile apps'),
      new Answer('Operating Systems (e.g: Windows 10 or Linux)'),
      new Answer('Software in general')
    ]);
    const question3o5 = new Question('There\'s a big difference between building and playing video games ! ' +
      'Would you be interested in coding games?', [
        new Answer('Yes'),
        new Answer('No, I take it back'),
      ]);

    // QUESTION 2, 2.1
    const question2 = new Question('In what technical field?', [
      new Answer('Web', question3),
      new Answer('Embedded', question3o1),
      new Answer('Software', question3o2)
    ]);
    const question2o1 = new Question('Why do you want to start coding?', [
      new Answer('Because I\'m interested in computers', question3o3),
      new Answer('Because I like building things', question3o4),
      new Answer('Because I love video games', question3o5)
    ]);

    // QUESTION 1
    const question1 = new Question('Have you ever coded?', [
      new Answer('No', question2o1),
      new Answer('A little', question2),
      new Answer('Yes', question2)
    ]);

    // Set the first question
    this.currentQuestion = question1;
    // Set / Reset the answers
    this.answers = [];
    // Set / Reset the previous questions
    this.previousQuestions = [];
  }

  addAnswer(answerIndex: number) {
    // Add answer to our array
    this.answers.push(this.currentQuestion.answers[answerIndex]);
    // Add question to previous questions array
    this.previousQuestions.push(this.currentQuestion);

    // Check if it's the last question
    if (!this.isLastQuestion(answerIndex)) {
      // It is not, set the new one
      this.currentQuestion = this.currentQuestion.answers[answerIndex].nextQuestion;
    } else {
      this.displayAnswers();

      // It is, process the answers & reset the quiz
      this.initQuestions();
    }
  }

  isLastQuestion(answerIndex): boolean {
    // Check if it's the last question
    if (this.currentQuestion.answers[answerIndex].nextQuestion == null) {
      return true;
    }
    return false;
  }

  previousQuestion() {
    // Check if there is a previous question
    if (this.previousQuestions.length !== 0) {
      // There is, set the current question to the previous one
      this.currentQuestion = this.previousQuestions[this.previousQuestions.length - 1];
      // Remove the last answer
      this.answers.pop();
      // Remove the last question
      this.previousQuestions.pop();
    }
  }

  displayAnswers() {
    console.log('---');
    for (let answer of this.answers) {
      console.log(answer.value);
    }
  }
}
