import { Session } from 'next-auth';
import { useState } from 'react';
import Head from 'next/head';
import {
  Avatar, Backdrop, CircularProgress,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton, ListItemIcon,
  ListItemText,
  Menu,
} from '@mui/material';
import { getSession, signOut, useSession } from 'next-auth/react';
import { LogoutRounded } from '@mui/icons-material';
import { GetServerSideProps } from 'next';
import ProminentAppBar from '../../components/ProminentAppBar';
import TaskCreator from '../../components/TaskCreator';
import TaskList from '../../components/TaskList';
import Footer from '../../components/Footer';
import { ITask } from '../../types/ITask';
import mongoPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { IClass } from '../../types/IClass';
import containsObjectId from '../../lib/containsObjectId';

const UserManagement = (props: {session: Session}) => {
  const { session } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => setAnchorEl(null);

  return <>
    <IconButton
      sx={{p: 0}}
      aria-label='account of current user'
      aria-controls='menu-user-management'
      aria-haspopup='true'
      onClick={e => setAnchorEl(e.currentTarget)}
      color='inherit'
    >
      <Avatar>{session.user?.name?.charAt(0)}</Avatar>
    </IconButton>
    <Menu
      id='menu-user-management'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!anchorEl}
      onClose={handleClose}
    >
      <ListItem dense>
        <ListItemAvatar><Avatar>{session.user?.name?.charAt(0)}</Avatar></ListItemAvatar>
        <ListItemText primary={session.user?.name} secondary={session.user?.email} />
      </ListItem>
      <Divider />
      <ListItemButton onClick={() => signOut()} dense>
        <ListItemIcon><LogoutRounded /></ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </ListItemButton>
    </Menu>
  </>
}

const Tasks = (props: {tasks: ITask[], classData: IClass}) => {
  const { data: session, status } = useSession({required: true});
  if (status === 'loading') return <Backdrop open><CircularProgress color='primary' size={64} thickness={4} /></Backdrop>;

  return (
    <>
      <Head>
        <title>What&apos;s Due?</title>
      </Head>

      <main style={{minHeight: '100vh'}}>
        <ProminentAppBar title={props.classData.name}><UserManagement session={session} /></ProminentAppBar>

        <TaskCreator isAdmin={containsObjectId(props.classData.admins, session?.user.id)} isSuperAdmin={false} />
        <TaskList tasks={props.tasks} />
      </main>

      <Footer />
    </>
  )
}

export default Tasks;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('getProps, context:', context);
  const
    session = await getSession(context),
    db = (await mongoPromise).db();

  const redirectLanding = (page: string = '/') => {
    context.res.setHeader('location', page);
    context.res.statusCode = 302;
    return { props: { tasks: [], classData: null } };
  };

  if (!session?.user) return redirectLanding('/login'); // Make sure user is logged in
  if (!context.params?.classID || !ObjectId.isValid(String(context.params?.classID))) // Validate class ID
    return redirectLanding();
  console.log('checks passed');

  const classData = await db
    .collection('classes')
    .findOne<IClass>({
      _id: new ObjectId(String(context.params.classID)),
      members: new ObjectId(session.user.id),
    });

  console.log('classData', classData);

  if (!classData) return redirectLanding(); // This class doesn't exist or the user isn't in it

  const tasks = await db
    .collection('tasks')
    .find<ITask>({classID: new ObjectId(String(context.params.classID))}).toArray();
  if (!tasks) redirectLanding();

  console.log('tasks:', tasks)

  return { props: { tasks, classData } }
}