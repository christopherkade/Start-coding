import { Component, OnInit } from '@angular/core';
import { Documentation } from '../model/documentation';
import { DocService } from '../service/doc.service';

@Component({
  selector: 'app-doc-all',
  templateUrl: './doc-all.component.html',
  styleUrls: ['./doc-all.component.sass']
})
export class DocAllComponent implements OnInit {
  constructor(private docService: DocService) { }

  typeFilter = false;
  selectedType = 'Type';

  // techFilter = false;
  // selectedTech = 'Tech';

  ngOnInit() {
    this.docService.getDoc();
    this.docService.getDocTypes();
  }
}
