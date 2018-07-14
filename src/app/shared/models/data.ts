export class Data {
  id: number;
  body: string;
  title: string;
  userId: number;

  constructor(obj: any) {
    this.id = obj.id;
    this.body = obj.body;
    this.title = obj.title;
    this.userId = obj.userId;
  }
}
