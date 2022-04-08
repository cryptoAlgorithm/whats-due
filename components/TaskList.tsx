import { Masonry } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, CardActionArea, CardContent, Container, Modal, Typography } from '@mui/material';
import { ITask } from '../types/ITask';
import { useState } from 'react';
import TaskCard from './TaskCard';


export default function TaskList(props: { tasks: ITask[] }) {
  const [selTask, setSelTask] = useState<string | null>(null);

  return <>
    <Container maxWidth={'lg'} sx={{p: .5}}>
      <Masonry
        sx={{m: 0}}
        spacing={1}
        columns={{ 'lg': 4, 'md': 3, 'sm': 2, 'xs': 1 }}
      >
        { props.tasks.map(t =>
          <TaskCard
            key={t._id.toString()}
            expanded={selTask === t._id.toString()}
            task={t}
            onSelect={id => setSelTask(id)}
          />
        ) }
      </Masonry>
    </Container>
  </>
}