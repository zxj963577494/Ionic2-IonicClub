import {Page, NavParams, ViewController} from 'ionic-angular';
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe.js';
import {AvatarPipe} from "../../../pipe/avatarPipe";


@Page({
  templateUrl: 'build/pages/modal/myTopics/myTopics.html',
  pipes: [TimeAgoPipe, AvatarPipe]
})

export class MyTopicsPage {
  private myTopics = {
    recent_topics: [],
    recent_replies: [],
  }

  constructor(private viewCtrl:ViewController, private navParams:NavParams) {

  }

  ngOnInit() {
    this.myTopics = this.navParams.get('topics');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
