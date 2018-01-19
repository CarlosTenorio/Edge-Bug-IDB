import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable()
export class AppService extends Dexie {

  public persons: Dexie.Table<IPerson, number>;

  constructor() {
    super('IDBBUGEDGE');
    this.version(1).stores({
      persons: "name"
    });
  }
}

export interface IPerson {
  name: string;
  parts: IPart[];
}

export interface IPart {
  image: Blob;
}
