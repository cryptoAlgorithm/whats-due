import { signIn, useSession } from 'next-auth/react'
import { Alert, AlertTitle, Paper, Typography } from '@mui/material';
import { LoginRounded } from '@mui/icons-material';
import MicrosoftIcon from '../components/MicrosoftIcon';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ErrorContent = (props: {error: string}) => {
  switch (props.error) {
    case 'AccessDenied':
      return <>You aren&apos;t in any classes:<br/>You need to be assigned to at least one class to log in.</>
    default: return <>Something went wrong — please try again</>
  }
}

export default function Login(
  // { providers }: { providers: Record<BuiltInProviderType, ClientSafeProvider> }
) {
  const { status } = useSession(), router = useRouter();
  if (status === 'authenticated') router.push('/').then();

  const
    [isLoading, setIsLoading] = useState(true),
    [success, setSuccess] = useState(false);

  useEffect(() => setIsLoading(false), []);

  return (
    <main style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Paper sx={{p: 2, pb: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
        {
          router.query.error &&
            <Alert severity={'error'} sx={{mb: 1}}>
                <AlertTitle>Login failed</AlertTitle>
                <ErrorContent error={String(router.query.error)} />
            </Alert>
        }

        <LoginRounded color={'primary'} />
        <Typography variant={'h5'} mb={1.5}>Login</Typography>

        <LoadingButton
          onClick={() => {
            setIsLoading(true);
            signIn('azure-ad', { callbackUrl: '/' }).then(() => setSuccess(true));
          }} variant={'contained'} startIcon={<MicrosoftIcon />}
          loading={(isLoading && !success) || status === 'loading'} disabled={isLoading}
        >
          {success ? 'You are signed in and will be redirected...' : 'Sign in with Microsoft'}
        </LoadingButton>
        <Typography variant={'caption'}>Use your NUSH account</Typography>
      </Paper>
    </main>
  )
}

// This is the recommended way for Next.js 9.3 or newer
/*export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}*/