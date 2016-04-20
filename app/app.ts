import 'es6-shim';
import {App, Platform, IonicApp} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {CommonService} from "./services/CommonService";
import {RouteConfig} from "angular2/router";
import {TopicsPage} from "./pages/topics/topics";
import {UserPage} from "./pages/user/user";
import {TopicDetailPage} from "./pages/topicDetail/topicDetail";
import {LoginPage} from "./pages/login/login";
import {AccountPage} from "./pages/account/account";
import {Toast} from 'ionic-native';
import {Splashscreen} from 'ionic-native';
import * as moment from 'moment';
import * as locales from 'moment/min/locales.js';

@App({
  templateUrl: 'build/app.html',
  providers: [CommonService],
  config: {
    backButtonText: '',
    backButtonIcon: 'arrow-round-back',
  }
})

@RouteConfig([
  {path: '/topics', component: TopicsPage, as: 'Topic'},
  {path: '/topics/:tab', component: TopicsPage, as: 'Topic'},
  {path: '/topicDetail/:id', component: TopicDetailPage, as: 'TopicDetail'},
  {path: '/user/:loginname', component: UserPage, as: 'User'},
  {path: '/login', component: LoginPage, as: 'Login'},
  {path: '/account', component: AccountPage, as: 'Account'}
])

export class MyApp {
  private rootPage = TopicsPage;
  private menuPage:any;
  private tabs = [];
  private backPressed:boolean = false;

  constructor(private app:IonicApp, platform:Platform, private commonService:CommonService) {
    // 如果时间格式无法显示中文,请将node_modules/moment/min/locales.js与node_modules/moment/moment.js合并,原因是无法加载locales.js文件,知道如何引入的朋友可以在issues上发表一下.
    moment.locale('zh-cn');
    platform.ready().then(() => {
      StatusBar.styleDefault();
      this.registerBackButtonListener();
    });
  }

  registerBackButtonListener() {
    document.addEventListener('backbutton', ()=> {
      let nav = this.getNav();
      if (nav.canGoBack()) {
        nav.pop();
        return;
      }
      if (!this.backPressed) {
        this.backPressed = true;
        Toast.showShortBottom("再按一次退出应用").subscribe(
            toast => {
              console.log(toast);
            }
        );
        setTimeout(()=>this.backPressed = false, 2000);
        return;
      }
      // 利用 cordova.js 退出应用
      navigator.app.exitApp();
    }, false);
  }

  getNav() {
    return this.app.getComponent('nav');
  }

  setRootPage(tab:string) {
    this.getNav().setRoot(TopicsPage, {tab: tab});
  }
}
