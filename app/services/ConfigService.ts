import {Injectable} from 'angular2/core';

@Injectable()
export class ConfigService {
  hostURL:string = "http://ionichina.com";

  constructor() {

  }

  getHost() {
    return this.hostURL;
  }
}
