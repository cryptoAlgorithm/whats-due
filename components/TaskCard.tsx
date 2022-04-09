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
import { DeleteForeverRounded, EditRounded } from '@mui/icons-material';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderRadius: 7
}));

const MotionItem = motion(Item);
const MotionContent = motion(CardContent);

export default function TaskCard(props: {expanded: boolean, task: ITask, onSelect: (id: string | null) => void}) {
  const
    {expanded, task, onSelect} = props,
    id = task._id.toString();

  return <AnimateSharedLayout>
    <motion.div layoutId={'cont' + id}>
      <MotionItem variant={'outlined'}
                  layoutId={'item' + id}>
        <CardActionArea onClick={() => onSelect(id)}>
          <MotionContent sx={{py: 1.5, pt: 1.25}} layoutId={id}>
            <Typography gutterBottom variant='h6' color={'text.primary'} component={'div'}>{task.title}</Typography>
            <Typography variant='body2' color={'text.secondary'} whiteSpace={'pre'}>{task.content}</Typography>
          </MotionContent>
        </CardActionArea>
      </MotionItem>
    </motion.div>

    <AnimatePresence>
      <Modal open={expanded} onClose={() => onSelect(null)} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <motion.div layoutId={'cont' + id} style={{outline: 'none'}}>
          <MotionItem
            layoutId={'item' + id}
            sx={{
              width: 'min(600px, calc(100vw - 1rem))',
              outline: 'none',
              borderRadius: 2
            }}
          >
            <MotionContent sx={{py: 1.5, pt: 1.25}} layoutId={id}>
              <Typography gutterBottom variant='h5' color={'text.primary'}>{task.title}</Typography>
              <Typography variant='body2' color={'text.secondary'} whiteSpace={'pre'}>{task.content}</Typography>
            </MotionContent>
            <Divider />
            <CardActions>
              <Tooltip title={'Delete'}>
                <IconButton><DeleteForeverRounded sx={{color: t => t.palette.text.secondary}} /></IconButton>
              </Tooltip>
              <Tooltip title={'Edit'}>
                <IconButton><EditRounded sx={{color: t => t.palette.text.secondary}} /></IconButton>
              </Tooltip>
              <Box flexGrow={1} />
              <Button variant={'outlined'} onClick={() => onSelect(null)}>Close</Button>
            </CardActions>
          </MotionItem>
        </motion.div>
      </Modal>
    </AnimatePresence>
  </AnimateSharedLayout>
}