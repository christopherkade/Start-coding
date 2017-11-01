import { Component } from '@angular/core';
import { DocService } from '../service/doc.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.sass']
})
export class DocComponent {
  constructor(private docService: DocService) { }
}
