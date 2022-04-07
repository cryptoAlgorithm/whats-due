import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Avatar,
  Backdrop,
  Button, CircularProgress, Divider,
  IconButton,
  ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListItem,
  Menu,
  Paper,
  Typography
} from '@mui/material';
import ProminentAppBar from '../components/ProminentAppBar';
import { LoginRounded, LogoutRounded } from '@mui/icons-material';
import { useState } from 'react';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';
import TaskCreator from '../components/TaskCreator';
import { Session } from 'next-auth';

const NotSignedIn = () => {
  return <main style={{
    minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    padding: '2rem'
  }}>
    <Paper sx={{maxWidth: 500, p: 2}}>
      <Typography variant={'h4'} gutterBottom>What's Due?</Typography>
      <Typography mb={1.5}>
        Hey there! It looks like you aren't signed in.&nbsp;
        Sign in to see what's due!
      </Typography>
      <Button fullWidth onClick={() => signIn()} endIcon={<LoginRounded />}>Sign In</Button>
    </Paper>
  </main>
}

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

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Backdrop open><CircularProgress color='primary' size={64} thickness={4} /></Backdrop>;
  if (!session) return <NotSignedIn />;

  return (
    <>
      <ProminentAppBar appName={'What\'s Due?'}><UserManagement session={session} /></ProminentAppBar>

      <TaskCreator />
      <TaskList />

      <Footer />
    </>
  )
}

export default Home
