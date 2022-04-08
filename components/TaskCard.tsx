import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Modal,
  Typography,
  Box,
  Divider,
  IconButton, Tooltip
} from '@mui/material';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { ITask } from '../types/ITask';
import { styled } from '@mui/material/styles';
import { EditRounded } from '@mui/icons-material';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderRadius: 7
}));

const MotionItem = motion(Item);

export default function TaskCard(props: {expanded: boolean, task: ITask, onSelect: (id: string | null) => void}) {
  const
    {expanded, task, onSelect} = props,
    id = task._id.toString();

  return <AnimateSharedLayout>
    {
      !expanded && <MotionItem layoutId={id} variant={'outlined'}>
            <CardActionArea onClick={() => onSelect(id)}>
                <CardContent sx={{py: 1.5, pt: 1.25}}>
                    <Typography gutterBottom variant='h6' component='div' color={'text.primary'}>{task.title}</Typography>
                    <Typography variant='body2' color='text.secondary'>{task.content}</Typography>
                </CardContent>
            </CardActionArea>
        </MotionItem>
    }
    <AnimatePresence>
      <Modal open={expanded} onClose={() => onSelect(null)} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <MotionItem
          sx={{
            width: 'min(600px, calc(100vw - 1rem))',
            outline: 'none',
            borderRadius: 2
          }}
          layoutId={id}
        >
          <CardContent sx={{py: 1.5, pt: 1.25}}>
            <Typography gutterBottom variant='h5' component='div' color={'text.primary'}>{task.title}</Typography>
            <Typography variant='body2' color={'text.secondary'}>{task.content}</Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Tooltip title={'Edit'}>
              <IconButton><EditRounded sx={{color: t => t.palette.text.secondary}} /></IconButton>
            </Tooltip>
            <Box flexGrow={1} />
            <Button variant={'outlined'} onClick={() => onSelect(null)}>Close</Button>
          </CardActions>
        </MotionItem>
      </Modal>
    </AnimatePresence>
  </AnimateSharedLayout>
}