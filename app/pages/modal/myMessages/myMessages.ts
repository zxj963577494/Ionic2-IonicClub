import {Page, NavParams, ViewController, Storage, LocalStorage, Events} from 'ionic-angular';
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe.js';
import {DateFormatPipe} from 'angular2-moment/DateFormatPipe.js';
import {IonicService} from "../../../services/IonicService";
import {ConfigService} from "../../../services/ConfigService";


@Page({
  templateUrl: 'build/pages/modal/myMessages/myMessages.html',
  providers: [IonicService, ConfigService],
  pipes: [TimeAgoPipe, DateFormatPipe]
})

export class MyMessagesPage {
  private local:LocalStorage;
  private myMessages = {
    has_read_messages: [],
    hasnot_read_messages: []
  }

  constructor(private viewCtrl:ViewController, private navParams:NavParams, private ionicService:IonicService, private  events:Events) {
    this.local = new Storage(LocalStorage);
  }

  ngOnInit() {
    this.myMessages = this.navParams.get('messages');
    this.local.get('User').then(u=> {
      if (u) {
        let user = JSON.parse(u);
        this.ionicService.postMessageMark_all(user.accesstoken).subscribe(data=> {
          if (data.success) {
            this.events.publish('badge', 0);
            console.log("标记全部已读");
          }
        });
      }
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
