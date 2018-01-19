import { Component, NgModule, VERSION } from '@angular/core'
import { BrowserModule, DomSanitizer, SafeUrl } from '@angular/platform-browser'

import { AppService } from 'app/app.service';

import * as blobUtil from 'blob-util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string;
  picture: SafeUrl;
  namePerson: string;
  person1: any;
  person2: any;

  constructor(
    private sanitizer: DomSanitizer,
    public appService: AppService
  ) {
    this.name = `Angular! v${VERSION.full}`;
    this.initTable();
    this.setImage(0);
  }

  initTable() {
    this.appService.persons.add({
      name: 'Nicolas',
      parts: []
    });
  }

  saveImage(personName: string, inputId: string) {
    var file1 = (<HTMLInputElement>document.getElementById(inputId)).files[0];
    var fileReader = new FileReader();
    var self = this;
    fileReader.onloadend = function(e) {
      var arrayBuffer = fileReader.result;
      var fileType = (<HTMLInputElement>document.getElementById('file-type')).value;
      blobUtil.arrayBufferToBlob(arrayBuffer, fileType)
        .then(function(blob) {
          self.appService.persons.where('name').equals('Nicolas')
            .modify(person => {
              person.parts.push({
                image: blob
              });
            });
        }).catch(
        console.log.bind(console)
        );
    };
    fileReader.readAsArrayBuffer(file1);
  }

  setImage(idx: number) {
    this.appService.persons.where('name').equals('Nicolas').toArray()
      .then((person) => {
        this.namePerson = person[0].name;
        this.picture = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(person[0].parts[idx].image));
      });
  }

  deleteDB() {
    this.appService.persons.clear();
  }

}
