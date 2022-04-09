import type { NextApiRequest, NextApiResponse } from 'next'
import { IClass } from '../../../../types/IClass';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import mongoPromise from '../../../../lib/mongodb';
import containsObjectId from '../../../../lib/containsObjectId';
import { ITask } from '../../../../types/ITask';

type Data = {
  success: boolean;
  error?: string;
  result?: { id: string };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
  if (!session?.user) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  const e = (msg: string, code: number = 400) => {
    res.status(code).json({ success: false, error: msg });
  }

  switch (req.method) {
    case 'POST':
      const db = (await mongoPromise).db();

      if (typeof req.body !== 'object') {
        e('Invalid request body');
        return
      }

      const { visibility, title, content, dueDate } = req.body;
      if ((!!dueDate && typeof dueDate !== 'number') || !visibility || !title || !content) {
        e('Invalid data');
        return
      }

      const classData = await db
        .collection('classes')
        .findOne<IClass>({
          _id: new ObjectId(String(req.query.classID)),
          members: new ObjectId(session.user.id),
        });
      if (!classData) {
        e('Class not found', 404);
        return;
      }
      if (
        (visibility === 'CLASS' && !containsObjectId(classData?.admins, session.user.id))
        || visibility === 'ANNOUNCEMENT'
      ) {
        e('Missing permissions', 403);
        return;
      }

      const insertedDoc = await db.collection<ITask>('tasks').insertOne({
        classID: classData._id,
        title,
        content,
        due: new Date(dueDate),
        visibility,
        author: new ObjectId(session.user.id),
        added: new Date(),
        _id: new ObjectId(),
      });

      res.status(200).json({ success: true, result: {id: insertedDoc.insertedId.toString()} });
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
