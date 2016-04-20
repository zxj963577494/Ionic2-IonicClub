import {PipeTransform, Pipe} from "angular2/core";
import {CommonService} from "../services/CommonService";

@Pipe({
  name: 'tabNamePipe'
})
export class TabNamePipe implements PipeTransform {
  public tabList;

  constructor(private commonService:CommonService) {
    this.tabList = this.commonService.getTabs();
  }

  transform(value:string, args:any[]) {
    for (var i in this.tabList) {
      if (this.tabList[i].value === value) {
        return this.tabList[i].label;
      }
    }
  }
}