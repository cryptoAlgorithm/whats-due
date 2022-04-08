import { ObjectId } from 'bson';

export default function containsObjectId (arr: ObjectId[], id: string): boolean {
  return arr.some(item => item.toHexString() === id);
}