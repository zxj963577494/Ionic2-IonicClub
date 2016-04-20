import {Page, NavController, ViewController, Loading, Storage, LocalStorage} from 'ionic-angular';
import {IonicService} from "../../../services/IonicService";
import {ConfigService} from "../../../services/ConfigService";

@Page({
  templateUrl: 'build/pages/modal/topicAdd/topicAdd.html',
  providers: [IonicService, ConfigService],
})

export class TopicAddPage {
  private topicData:any = {
    accesstoken: '',
    title: '',
    tab: '',
    content: ''
  }
  private local:LocalStorage;

  constructor(private viewCtrl:ViewController, private nav:NavController, private ionicService:IonicService) {
    this.local = new Storage(LocalStorage);
  }

  ngOnInit() {
    this.local.get('User').then(u=> {
      if (u) {
        let user = JSON.parse(u);
        this.topicData.accesstoken = user.accesstoken;
      } else {
        this.loading('请登录后使用', 500);
        this.dismiss();
      }
    });
  }

  submit() {
    if (this.validate()) {
      this.ionicService.postTopic(this.topicData).subscribe(data=> {
        if (data.success) {
          this.loading('提交成功', 500);
          this.dismiss();
        } else {
          this.loading('提交失败', 500);
        }
      })
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  validate() {
    if (this.topicData.tab == '') {
      this.loading('类别不能为空', 500);
      return false;
    }
    else if (this.topicData.title == '') {
      this.loading('标题不能为空', 500);
      return false;
    }
    else if (this.topicData.title.length <= 10) {
      this.loading('标题字数在10字以上', 500);
      return false;
    }
    else if (this.topicData.content == '') {
      this.loading('内容不能为空', 500);
      return false;
    } else {
      return true;
    }
  }

  loading(content, duration) {
    let loading = Loading.create({
      spinner: 'hide',
      content: content,
      duration: duration
    });
    this.nav.present(loading);
  }
}
