import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { Documentation } from '../model/documentation';
import { Keywords } from '../model/keyword';
import { QuizService } from './quiz.service';

// Handles Documentation / Resource related matters
@Injectable()
export class DocService {

  // Database references
  dbRef = this.firebase.database().ref().child('documentation');
  dbRefType = this.firebase.database().ref().child('documentation-type');
  // List of doc
  documentation: Documentation[] = [];
  documentationType: string[] = [];
  documentationTech: Set<string> = new Set();
  isLoading = false;

  constructor(private firebase: FirebaseApp) { }

  resetDoc() {
    this.documentation = [];
  }

  // Fill up a set of available tech from our documentation
  getDocTech() {
    this.documentation.map(doc => {
      for (let i = 0; i < doc.tech.length; i++) {
        this.documentationTech.add(doc.tech[i]);
      }
    });
  }

  // Get documentation types
  getDocTypes() {
    let docTypes = null;
    this.dbRefType.on('value', snap => {
      docTypes = snap.val();
      for (let i = 0; i < docTypes.length; i++) {
        this.documentationType.push(docTypes[i]);
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
