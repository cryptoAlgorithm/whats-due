import { ObjectId } from 'mongodb';

export interface IClass {
  admins: ObjectId[];
  members: ObjectId[];
  _id: ObjectId;
  name: string;
}