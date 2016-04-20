import {Injectable, Inject} from  'angular2/core';
import {Http, HTTP_PROVIDERS, Response, Headers} from 'angular2/http';
import {Observable} from  'rxjs/Observable';
import {ConfigService} from "./ConfigService";
import * as helper from '../directives/helpers';
import 'rxjs/Rx';


@Injectable()
export class IonicService {
  constructor(private http:Http, private configService:ConfigService) {

  }

  // 获取主题
  getTopics(data) {
    let url = this.configService.getHost() + "/api/v1/topics";
    return this.http.get(url + helper.toQueryString(data)).map(
        res=>res.json().data
    ).catch(this.handleError);
  }

  // 通过ID获取主题详情
  getTopicById(id) {
    let url = this.configService.getHost() + "/api/v1/topic/" + id;
    return this.http.get(url).map(
        res=>res.json().data
    ).catch(this.handleError);
  }

  // 新增主题
  postTopic(data) {
    let url = this.configService.getHost() + "/api/v1/topics";
    let body = helper.toBodyString(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url,body,{headers: headers}).map(
        res=>res.json()
    ).catch(this.handleError);
  }

  // 收藏主题
  postTopicCollect(data) {
    let url = this.configService.getHost() + "/api/v1/topic/collect";
    let body = helper.toBodyString(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url,body,{headers: headers}).map(
        res=>res.json().data
    ).catch(this.handleError);
  }

  // 取消收藏主题
  postTopicDeCollect(data) {
    let url = this.configService.getHost() + "/api/v1/topic/de_collect";
    let body = helper.toBodyString(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url,body,{headers: headers}).map(
        res=>res.json()
    ).catch(this.handleError);
  }

  // 新建评论
  postReplie(id, data) {
    let url = this.configService.getHost() + "/api/v1/topic/" + id + "/replies";
    let body = helper.toBodyString(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url,body,{headers: headers}).map(
        res=>res.json()
    ).catch(this.handleError);
  }

  // 为评论点赞
  postReplieUps(reply_id, accesstoken) {
    let url = this.configService.getHost() + "/api/v1/reply/" + reply_id + "/ups";
    let body = 'accesstoken=' + accesstoken;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url,body,{headers: headers}).map(
        res=>res.json()
    ).catch(this.handleError);
  }

  // 获取用户详情
  getUserByName(loginname) {
    let url = this.configService.getHost() + "/api/v1/user/" + loginname;
    return this.http.get(url).map(
        res=>res.json().data
    ).catch(this.handleError);
  }

  // 验证 accessToken 的正确性
  postUserLogin(accesstoken) {
    let url = this.configService.getHost() + "/api/v1/accesstoken";
    let body = 'accesstoken=' + accesstoken;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, body, {headers: headers}).map(
        res=>res.json()
    ).catch(this.handleError);
  }

  // 获取未读消息数
  getMessageCount(accessToken) {
    let url = this.configService.getHost() + "/api/v1/message/count?accesstoken=" + accessToken;
    return this.http.get(url).map(
        res=>res.json().data
    ).catch(this.handleError);
  }

  // 获取消息
  getMessages(accessToken) {
    let url = this.configService.getHost() + "/api/v1/messages?accesstoken=" + accessToken;
    return this.http.get(url).map(
        res=>res.json().data
    ).catch(this.handleError);
  }

  // 标记全部已读
  postMessageMark_all(accesstoken) {
    let url = this.configService.getHost() + "/api/v1/message/mark_all";
    let body = 'accesstoken=' + accesstoken;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, body, {headers: headers}).map(
        res=>res.json().data
    ).catch(this.handleError);
  }

  private handleError(error:Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server Error');
  }


}
