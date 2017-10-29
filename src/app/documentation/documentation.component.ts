import { Component } from '@angular/core';
import {QuizService} from '../service/quiz.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.sass']
})
export class DocumentationComponent {
  constructor(public quizService: QuizService) {}
}
