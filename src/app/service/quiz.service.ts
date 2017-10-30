import { Injectable } from '@angular/core';
import { Answer } from '../model/answer';
import { Keywords } from '../model/keyword';
import { Question } from '../model/question';
import { FirebaseApp } from 'angularfire2';
import { Documentation } from '../model/documentation';

@Injectable()
export class QuizService {

  previousQuestions: Question[];
  currentQuestion: Question;
  answers: Answer[];
  answerKeywords: Keywords[];
  documentation: Documentation[] = [];

  // Database references
  dbRef = this.firebase.database().ref().child('documentation');

  constructor(private firebase: FirebaseApp) {
    this.initQuestions();
  }

  // TODO: Finish quiz
  initQuestions() {
    // QUESTION 4, 4.1, 4.2 (Web)
    const question4 = new Question('Great, using what tech primarily?', [
      new Answer('Spring framework', null, [Keywords.SPRING]),
      new Answer('NodeJS', null, [Keywords.NODEJS])
    ]);
    const question4o1 = new Question('Great, using what tech primarily?', [
      new Answer('React', null, [Keywords.REACT]),
      new Answer('Angular (2+, JS)', null, [Keywords.ANGULAR, Keywords.ANGULARJS]),
      new Answer('VueJS', null, [Keywords.VUEJS]),
    ]);
    const question4o2 = new Question('On what would you rather focus your learnings?', [
      new Answer('Frontend', question4o1, [Keywords.FRONTEND]),
      new Answer('Backend', question4, [Keywords.BACKEND])
    ]);

    // QUESTION 3 (Web), 3.1 (Embedded), 3.2 (Software),
    const question3 = new Question('Backend, frontend, both?', [
      new Answer('Back', question4, [Keywords.ASSEMBLY]),
      new Answer('Front', question4o1, [Keywords.FRONTEND]),
      new Answer('Both !', question4o2),
    ]);
    const question3o1 = new Question('Using what programming language particularly?', [
      new Answer('C', null, [Keywords.C]),
      new Answer('Assembly', null, [Keywords.ASSEMBLY]),
      new Answer('FORTRAN', null, [Keywords.FORTRAN]),
      new Answer('COBOL', null, [Keywords.COBOL])
    ]);
    const question3o2 = new Question('Using what programming language particularly?', [
      new Answer('Java', null, [Keywords.JAVA]),
      new Answer('C#', null, [Keywords.CSHARP]),
      new Answer('Python', null, [Keywords.PYTHON]),
      new Answer('Javascript', null, [Keywords.JAVASCRIPT])
    ]);
    const question3o3 = new Question('What specifically are you interested in about computers?', [
      new Answer('The way the hardware (components inside your computer) work', null, [Keywords.HARDWARE]),
      new Answer('The awesome tools I use everyday (for example, Microsoft\'s Excel or Facebook)', null, [Keywords.SOFTWARE])
    ]);
    const question3o4 = new Question('Now that\'s the spirit ! What would you like to build?', [
      new Answer('Mobile apps', null, [Keywords.MOBILE]),
      new Answer('Websites', null, [Keywords.WEB]),
      new Answer('Operating Systems', null, [Keywords.OS]),
      new Answer('Software', null, [Keywords.SOFTWARE])
    ]);
    const question3o5 = new Question('Would you be interested in coding games?', [
      new Answer('Yes', null, [Keywords.GAMES]),
      new Answer('No, I take it back')
    ]);

    // QUESTION 2, 2.1
    const question2 = new Question('In what technical field?', [
      new Answer('Web', question3, [Keywords.WEB]),
      new Answer('Embedded', question3o1, [Keywords.EMBEDDED]),
      new Answer('Software', question3o2, [Keywords.SOFTWARE])
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
    // Set / Reset our keyword list
    this.answerKeywords = [];
  }

  addAnswer(answerIndex: number) {
    const answer: Answer = this.currentQuestion.answers[answerIndex];
    // Add answer to our array
    this.answers.push(answer);
    // Add question to previous questions array
    this.previousQuestions.push(this.currentQuestion);

    // Check if our answer has a keyword
    if (answer.keywords.length > 0) {
      // It does, add them to our array
      answer.keywords.map(keyword => {
        this.answerKeywords.push(keyword)
      });
    }

    // Check if it's the last question
    if (!this.isLastQuestion(answerIndex)) {
      // It is not, set the new one
      this.currentQuestion = this.currentQuestion.answers[answerIndex].nextQuestion;
    } else {
      // It is, process the answers
      this.processAnswers();
    }
  }

  isLastQuestion(answerIndex): boolean {
    // Return true if it is the last question, false otherwise
    return this.currentQuestion.answers[answerIndex].nextQuestion == null;
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

  // TODO: Drastically improve performance, O(N^3) is not acceptable
  // TODO: Doc should rely on level
  processAnswers() {
    let documentation = null;

    // Get documentation from Firebase DB
    this.dbRef.on('value', snap => {
      documentation = snap.val();

      // Loop through it
      for (const key in documentation) {
        if (documentation.hasOwnProperty(key)) {
          const val = documentation[key];

          // Loop through our documentation's tech keywords
          for (const tkey in val.tech) {
            if (val.tech.hasOwnProperty(tkey)) {

              // Check if a keyword matches
              this.answerKeywords.map(keyword => {

                if (keyword.trim() === val.tech[tkey].trim()) {
                  // It does, save the documentation
                  this.documentation.push(new Documentation(documentation[key].URL,
                    documentation[key].level, documentation[key].name,
                    val.tech[tkey], documentation[key].type, documentation[key].description));
                }
              });
            }
          }
        }
      }

      // Reset our quiz
      this.initQuestions();
    });
  }
}
