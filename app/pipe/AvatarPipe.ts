import {PipeTransform, Pipe} from "angular2/core";

@Pipe({
  name: 'avatarPipe'
})
export class AvatarPipe implements PipeTransform {
  constructor() {

  }

  transform(value:string, args:any[]) {
    // add https protocol
    if (value) {
      value = value.replace("https://avatars.githubusercontent.com", "http://7xj5bc.com1.z0.glb.clouddn.com");
      value = value + "&imageView2/2/w/120";
    }
    return value;
  }
}