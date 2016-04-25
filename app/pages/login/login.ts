import {Page, Alert, NavController, Storage, LocalStorage, ViewController} from 'ionic-angular';
import {IonicService} from "../../services/IonicService";
import {ConfigService} from "../../services/ConfigService";
import {BarcodeScanner} from 'ionic-native';
import {AccountPage} from "../account/account";
import {AppVersion} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/login/login.html',
  providers: [IonicService, ConfigService]
})

export class LoginPage {
  private local;
  private versionNumber;

  constructor(private viewCtrl:ViewController, private nav:NavController, private ionicService:IonicService) {
    this.local = new Storage(LocalStorage);
  }

  ngOnInit() {
    AppVersion.getVersionNumber().then(data=> {
      this.versionNumber = data;
    });
  }

  login() {
    let confirm = Alert.create({
      title: '扫码登录',
      message: 'PC登录 http://ionichina.com后，扫描设置页面的Access Token二维码即可完成登录',
      buttons: [
        {
          text: '我知道了',
          handler: () => {
            BarcodeScanner.scan().then((barcodeData) => {
              let User = {
                accesstoken: '',
                loginname: '',
                avatar_url: ''
              }
              User.accesstoken = barcodeData.text;
              this.ionicService.postUserLogin(User.accesstoken).subscribe(
                  data=> {
                    User.loginname = data.loginname;
                    User.avatar_url = data.avatar_url;
                    this.local.set('User', JSON.stringify(User));
                    this.nav.push(AccountPage).then(()=> {
                      let index = this.viewCtrl.index;
                      this.nav.remove(index);
                    });
                  });
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    this.nav.present(confirm);
  }
}