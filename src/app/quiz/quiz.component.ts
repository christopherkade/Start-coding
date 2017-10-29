import { Component } from '@angular/core';
import { Question } from '../model/question';
import { Answer } from '../model/answer';
import { Router } from '@angular/router';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent {

  constructor(private router: Router, private quizService: QuizService) { }

  answerChosen(index) {
    // Check if it's the last question in the quizz
    if (!this.quizService.isLastQuestion(index)) {
      // If not, save the answer
      this.quizService.addAnswer(index)
    } else {
      // If so, add the answer and go to the documentations page
      this.quizService.addAnswer(index);
      this.router.navigate(['/documentation']);
    }
  }
}
