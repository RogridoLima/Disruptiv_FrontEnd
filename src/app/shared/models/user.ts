import { Hobbies } from './hobbies';
export class User {
  name: string;
  email: string;
  birth: Date;
  gender: string;
  hobbies: string;
  bio: string;
  picture: string;
  password: string;

  constructor(obj: any) {
    this.name = obj.name;
    this.email = obj.email;
    this.birth = obj.birth;
    this.gender = obj.gender;
    this.hobbies = obj.hobbies;
    this.bio = obj.bio;
    this.picture = obj.picture;
    this.password = obj.password;
  }
}
