import { ObjectID } from 'bson';
import { TaskVisibility } from '../components/types';

export interface ITask {
  _id: ObjectID;
  classID: ObjectID;
  title: string;
  content: string;
  added: Date;
  author: ObjectID;
  visibility: TaskVisibility;
  due?: Date;
}