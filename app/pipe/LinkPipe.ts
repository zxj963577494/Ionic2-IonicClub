import {PipeTransform, Pipe} from "angular2/core";

@Pipe({
  name: 'linkPipe'
})
export class LinkPipe implements PipeTransform {
  constructor() {

  }

  transform(value:string, args:any[]) {
      if (typeof value === 'string') {
        var topicFullLinkRegex = /href="([\S]+)\/topic\/([\S]+)"/gi;
        var userFullLinkRegex = /href="([\S]+)\/user\/([\S]+)"/gi;
        var userLinkRegex = /href="\/user\/([\S]+)"/gi;
        var noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
        var externalLinkRegex = /href="((?!#\/user\/))[\S]+"/gi;
        return value
            .replace(topicFullLinkRegex, 'href="#/topicDetail/$2"')
            .replace(userFullLinkRegex, 'href="#/user/$2"')
            .replace(userLinkRegex, 'href="#/user/$1"')
            .replace(noProtocolSrcRegex, 'src="https://$1"')
            .replace(externalLinkRegex, "onClick=\"open('$1', '_blank', 'location=no')\"")
      }
  }
}