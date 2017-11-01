import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { Documentation } from '../model/documentation';
import { Keywords } from '../model/keyword';
import { QuizService } from './quiz.service';

@Injectable()
export class DocService {

  // Database references
  dbRef = this.firebase.database().ref().child('documentation');
  // List of doc
  documentation: Documentation[] = [];
  isLoading = false;

  constructor(private firebase: FirebaseApp) { }

  resetDoc() {
    this.documentation = [];
  }

  // Saves all documentation in our database
  getDoc() {
    this.dbRef.on('value', snap => {
      this.documentation = snap.val();
    });
  }

  // TODO: Drastically improve performance, O(N^3) is not acceptable
  // TODO: Doc should rely on level
  // Saves documentation based on keywords given as parameter
  getDocByKeywords(keywords: Keywords[]) {
    this.isLoading = true;
    let doc = null;

    this.dbRef.on('value', snap => {
      doc = snap.val();

      for (const key in doc) {
        if (doc.hasOwnProperty(key)) {
          const val = doc[key];

          // Loop through our documentation's tech keywords
          for (const tkey in val.tech) {
            if (val.tech.hasOwnProperty(tkey)) {
              keywords.map(keyword => {
                if (keyword.trim() === val.tech[tkey].trim()) {
                  // It does, save the documentation
                  this.documentation.push(new Documentation(doc[key].URL,
                    doc[key].level, doc[key].name,
                    val.tech[tkey], doc[key].type, doc[key].description));
                }
              });
            }
          }
        }
      }
      this.isLoading = false;
    });
  }
}
