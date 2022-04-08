import { ObjectID } from 'bson';

export interface ITask {
  _id: ObjectID;
  classID: ObjectID;
  title: string;
  content: string;
  added: Date;
  author: ObjectID;
}