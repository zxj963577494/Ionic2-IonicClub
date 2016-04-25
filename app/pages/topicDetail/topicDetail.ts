import {Page, Loading, NavController, NavParams, Storage, LocalStorage} from "ionic-angular";
import {IonicService} from "../../services/IonicService";
import {ConfigService} from "../../services/ConfigService";
import {AmTimeAgoPipe} from '../../pipe/AmTimeAgoPipe';
import {AvatarPipe} from "../../pipe/avatarPipe";
import {LinkPipe} from "../../pipe/linkPipe";
import {SocialSharing} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/topicDetail/topicDetail.html',
  providers: [IonicService, ConfigService],
  pipes: [AmTimeAgoPipe, LinkPipe, AvatarPipe]
})

export class TopicDetailPage {
  private user;
  private local:LocalStorage;
  private isLogin:boolean = false;
  private id:string;
  private topicDetail = {
    author: {
      loginname: '',
      avatar_url: ''
    },
    create_at: '',
    last_reply_at: '',
    content: '',
    visit_count: '',
    reply_count: '',
    replies: []
  };

  // 评论参数
  private replyData = {
    accesstoken: '',
    content: '',
    reply_id: ''
  }

  // 收藏参数
  private collectData = {
    accesstoken: '',
    topic_id: ''
  }

  // 分享参数
  private shareData = {
    message: '',
    subject: '',
    link: ''
  };

  constructor(private nav:NavController, private  navParams:NavParams, private ionicService:IonicService) {
    this.local = new Storage(LocalStorage);
  }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.collectData.topic_id = this.id;
    this.ionicService.getTopicById(this.id).subscribe(
        data => {
          this.topicDetail = data;
          this.shareData.message = data.content.substring(0, 150) + '......';
          this.shareData.subject = data.title;
          this.shareData.link = 'http://ionichina.com/topic/' + data.id;
        });
    this.local.get('User').then(u=> {
      if (u) {
        this.isLogin = true;
        this.user = JSON.parse(u);
        this.replyData.accesstoken = this.user.accesstoken;
        this.collectData.accesstoken = this.user.accesstoken;
      }
    });
  }

  // 点赞
  replieUps(replyId) {
    if (this.isLogin) {
      this.ionicService.postReplieUps(replyId, this.replyData.accesstoken).subscribe(
          data => {
            if (data.success) {
              if (data.action == 'up') {
                this.loading('赞一个', 500);
              } else {
                this.loading('取消点赞', 500);
              }
            } else {
              this.loading(data.error_msg, 500);
            }
          }, error=> {
            this.loading(error, 500);
          });
    } else {
      this.loading('请登录后使用', '500');
    }
  }

  // 回复
  reReply(replyId, loginname) {
    if (this.isLogin) {
      this.replyData.content = '@' + loginname + ' ';
      this.replyData.reply_id = replyId;
    } else {
      this.loading('请登录后使用', '500');
    }
  }

  // 收藏
  collect() {
    if (this.isLogin) {
      this.ionicService.postTopicCollect(this.collectData).subscribe(
          data => {
            this.loading('收藏成功', 500);
          });
    }
    else {
      this.loading('请登录后使用', '500');
    }
  }

  // 分享
  share() {
    SocialSharing.share(this.shareData.message, this.shareData.subject, this.shareData.link);
  }

  // 提交评论
  saveReply() {
    if (this.replyData.content.indexOf('@') < 0) {
      this.replyData.reply_id = '';
    }
    this.ionicService.postReplie(this.id, this.replyData).subscribe(
        data => {
          if (data.success) {
            let replie = {
              author: {
                loginname: this.user.loginname,
                avatar_url: this.user.avatar_url
              },
              content: '<div class=\"markdown-text\"><p>' + this.replyData.content + '</p>\n</div>',
              id: data.reply_id
            };
            this.topicDetail.replies.unshift(replie);
            this.loading('评论成功', 500);
            this.replyData.content = '';
          }
        })
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

