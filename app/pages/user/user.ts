import {Page, NavController, NavParams} from 'ionic-angular';
import {IonicService} from "../../services/IonicService";
import {ConfigService} from "../../services/ConfigService";
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe.js';
import {DateFormatPipe} from 'angular2-moment/DateFormatPipe.js';
import {AvatarPipe} from "../../pipe/avatarPipe";


@Page({
  templateUrl: 'build/pages/user/user.html',
  providers: [IonicService, ConfigService],
  pipes: [TimeAgoPipe, DateFormatPipe, AvatarPipe]
})

export class UserPage {
  private loginname:string;
  private user = {
    avatar_url: '',
    loginname: '',
    score: '',
    create_at: '',
    recent_topics: [],
    recent_replies: [],
    collect_topics: []
  };

  constructor(private  navParams:NavParams, private nav:NavController, private ionicService:IonicService) {

  }

  ngOnInit() {
    this.loginname = this.navParams.get('loginname');
    this.ionicService.getUserByName(this.loginname).subscribe(
        data=> {
          this.user = data
        });
  }
}