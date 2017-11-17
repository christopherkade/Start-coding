import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { Documentation } from '../model/documentation';
import { Answer } from '../model/answer';
import { QuizService } from './quiz.service';

// Handles Documentation / Resource related matters
@Injectable()
export class DocService {

  // Database references
  dbRef = this.firebase.database().ref().child('documentation');
  dbRefType = this.firebase.database().ref().child('documentation-type');
  dbRefTech = this.firebase.database().ref().child('documentation-tech');

  // List of doc
  documentation: Documentation[] = [];
  documentationType: Set<string> = new Set();
  documentationTech: Set<string> = new Set();
  isLoading = false;

  constructor(private firebase: FirebaseApp) { }

  resetDoc() {
    this.documentation = [];
  }

  // Fill up a set of available tech from our documentation
  getDocTech() {
    let techType = null;
    this.documentationTech.add('All')
    this.dbRefTech.on('value', snap => {
      techType = snap.val();
      for (let i = 0; i < techType.length; i++) {
        this.documentationTech.add(techType[i].charAt(0).toUpperCase() + techType[i].slice(1));
      }
    });
  }

  // Get documentation types
  getDocTypes() {
    let docTypes = null;
    this.documentationType.add('All');
    this.dbRefType.on('value', snap => {
      docTypes = snap.val();
      for (let i = 0; i < docTypes.length; i++) {
        // Set the first letter to upper case
        this.documentationType.add(docTypes[i].charAt(0).toUpperCase() + docTypes[i].slice(1));
      }
    });
  }

  // Saves all documentation in our database
  getDoc() {
    let doc = null;
    this.documentation = [];
    this.isLoading = true;
    // query our database
    this.dbRef.on('value', snap => {
      doc = snap.val();
      // go through each doc
      for (const key in doc) {
        if (doc.hasOwnProperty(key)) {
          // save it in our array
          this.documentation.push(new Documentation(doc[key].URL, doc[key].level,
            doc[key].name, doc[key].tech, doc[key].type, doc[key].description))
        }
      }
      this.isLoading = false;
      this.getDocTech();
    });
  }

  getByType(type: string) {
    this.dbRef.orderByChild('type').equalTo(type).on('value', snap => {
      let doc = snap.val();
      console.log(doc);
      return doc;
    });
  }

  getByURL(url: string) {
    this.dbRef.orderByChild('URL').equalTo(url).on('value', snap => {
      let doc = snap.val();
      console.log(doc);
      return doc;
    });
  }

  getByKeywords(answers: Answer[]) {
    let techLen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.isLoading = true;

    // Go through our answers
    answers.map(answer => {

      // Go through the keywords of each answer
      answer.keywords.map(keyword => {
        techLen.forEach(val => {

          // Query the corresponding resource based on the keyword
          this.dbRef.orderByChild('tech/' + val).equalTo(keyword).on('value', snap => {
            let doc = snap.val();
            if (doc) {
              for (const documentation in doc) {
                this.documentation.push(new Documentation(doc[documentation].URL,
                  doc[documentation].level, doc[documentation].name,
                  keyword, doc[documentation].type, doc[documentation].description));
              }
            }
            if (val === 10) {
              this.isLoading = false;
            }
          });
        });
      });
    });
  }
}
