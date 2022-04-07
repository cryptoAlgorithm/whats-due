import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { CssBaseline, ThemeProvider } from '@mui/material';
import makeTheme from '../lib/makeTheme';

import '@fontsource/roboto-slab';
import '@fontsource/poppins';

function WhatsDue({ Component, pageProps: { session, ...pageProps } }: AppProps<{session: Session}>) {
  return <SessionProvider session={session}>
    <ThemeProvider theme={makeTheme()}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </SessionProvider>
}

export default WhatsDue
