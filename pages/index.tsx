import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react';
import {
  Backdrop,
  Button, CircularProgress,
  Paper,
  Typography
} from '@mui/material';
import { LoginRounded } from '@mui/icons-material';
import Footer from '../components/Footer';
import Head from 'next/head';

const NotSignedIn = () => {
  return <main style={{
    minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    padding: '2rem'
  }}>
    <Paper sx={{maxWidth: 500, p: 2}}>
      <Typography variant={'h4'} gutterBottom>What&apos;s Due?</Typography>
      <Typography mb={1.5}>
        Hey there! It looks like you aren&apos;t signed in.&nbsp;
        Sign in to see what&apos;s due!
      </Typography>
      <Button fullWidth onClick={() => signIn()} endIcon={<LoginRounded />}>Sign In</Button>
    </Paper>
  </main>
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Backdrop open><CircularProgress color='primary' size={64} thickness={4} /></Backdrop>;
  if (!session) return <NotSignedIn />;

  return (
    <>
      <Head>
        <title>Your Classes</title>
      </Head>

      <Typography variant={'h2'}>Home</Typography>
      <Footer />
    </>
  )
}

export default Home
