import {Page, NavController, Storage, LocalStorage, Modal, ViewController, Events} from 'ionic-angular';
import {IonicService} from "../../services/IonicService";
import {ConfigService} from "../../services/ConfigService";
import {MyCollectsPage} from "../modal/myCollects/myCollects";
import {AvatarPipe} from "../../pipe/avatarPipe";
import {MyTopicsPage} from "../modal/myTopics/myTopics";
import {MyMessagesPage} from "../modal/myMessages/myMessages";
import {AppVersion} from 'ionic-native';
import {TopicsPage} from "../topics/topics";
import {DateFormatPipe} from "../../pipe/DateFormatPipe";


@Page({
  templateUrl: 'build/pages/account/account.html',
  providers: [IonicService, ConfigService],
  pipes: [AvatarPipe, DateFormatPipe]
})

export class AccountPage {
  private local:LocalStorage;
  private versionNumber:string;
  private hasnot_read_messages_count:number = 0;
  private user = {
    avatar_url: '',
    loginname: '',
    score: '',
    create_at: '',
    recent_topics: [],
    recent_replies: [],
    collect_topics: []
  };
  private myTopics = {
    recent_topics: [],
    recent_replies: []
  }
  private myMessages = {
    has_read_messages: [],
    hasnot_read_messages: []
  }

  constructor(private viewCtrl:ViewController, private nav:NavController, private events:Events, private ionicService:IonicService) {
    this.events.subscribe('badge', (data)=> {
      this.hasnot_read_messages_count = data;
    });
    this.local = new Storage(LocalStorage);
  }

  openMyCollects() {
    let modal = Modal.create(MyCollectsPage);
    this.nav.present(modal);
  }

  openMyMessages() {
    let modal = Modal.create(MyMessagesPage, {'messages': this.myMessages});
    this.nav.present(modal);
  }

  openMyTopics() {
    let modal = Modal.create(MyTopicsPage, {'topics': this.myTopics});
    this.nav.present(modal);
  }

  ngOnInit() {
    this.local.get('User').then(u=> {
      if (u) {
        let user = JSON.parse(u);
        this.ionicService.getUserByName(user.loginname).subscribe(
            data=> {
              this.user = data
              this.myTopics.recent_replies = data.recent_replies;
              this.myTopics.recent_topics = data.recent_topics;

            });
        this.ionicService.getMessages(user.accesstoken).subscribe(data=> {
          this.myMessages = data
        });
        this.ionicService.getMessageCount(user.accesstoken).subscribe(data=> {
          this.hasnot_read_messages_count = data;
        });
      }
    });

    AppVersion.getVersionNumber().then(data=> {
      this.versionNumber = data;
    });
  }

  loginOut() {
    this.local.clear();
    this.nav.setRoot(TopicsPage);
  }
}