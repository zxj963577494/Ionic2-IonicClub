import {Injectable} from 'angular2/core';

@Injectable()
export class CommonService {
  constructor(){
    
  }
  private _tabs = [{
    value: 'share',
    label: '分享',
    icon:'share'
  }, {
    value: 'ask',
    label: '问答',
    icon:'help-circle'
  }, {
    value: 'job',
    label: '招聘',
    icon:'bowtie'
  }, {
    value: 'bb',
    label: '吐槽',
    icon:'text'
  }];
  getTabs() {
    return this._tabs;
  }
}
