import {Page, NavParams, ViewController, Storage, LocalStorage} from 'ionic-angular';
import {IonicService} from "../../../services/IonicService";
import {ConfigService} from "../../../services/ConfigService";
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe.js';
import {AvatarPipe} from "../../../pipe/avatarPipe";

@Page({
  templateUrl: 'build/pages/modal/myCollects/myCollects.html',
  providers: [IonicService, ConfigService],
  pipes: [TimeAgoPipe, AvatarPipe]
})

export class MyCollectsPage {
  private user:any;
  private myCollects = {
    collect_topics: []
  }
  private collectData = {
    accesstoken: '',
    topic_id: ''
  }
  private local:LocalStorage;

  constructor(private viewCtrl:ViewController, private ionicService:IonicService) {
    this.local = new Storage(LocalStorage);
  }

  ngOnInit() {
    this.local.get('User').then(u=> {
      if (u) {
        this.user = JSON.parse(u);
        this.ionicService.getUserByName(this.user.loginname).subscribe(
            data=> {
              this.collectData.accesstoken = this.user.accesstoken;
              this.myCollects.collect_topics = data.collect_topics;
            });
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  remove(topic_id:string) {
    this.collectData.topic_id = topic_id;
    this.ionicService.postTopicDeCollect(this.collectData).subscribe(
        data=> {
          if (data.success) {
            this.ionicService.getUserByName(this.user.loginname).subscribe(
                data=> {
                  this.myCollects.collect_topics = [];
                  this.myCollects.collect_topics = data.collect_topics;
                });
          }
        });
  }
}
