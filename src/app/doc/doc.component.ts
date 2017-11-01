import { Component } from '@angular/core';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.sass']
})
export class DocComponent {
  constructor(private quizService: QuizService) { }
}
