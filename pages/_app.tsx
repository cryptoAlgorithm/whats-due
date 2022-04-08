import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { CssBaseline, ThemeProvider } from '@mui/material';
import makeTheme from '../lib/makeTheme';

import '@fontsource/roboto-slab';
import '@fontsource/poppins';

import superjson from 'superjson';
import { ObjectId } from 'bson';
import Head from 'next/head';

// Add ObjectId support to SuperJSON
superjson.registerCustom<ObjectId, string>(
  {
    isApplicable: (v): v is ObjectId => ObjectId.isValid(v),
    serialize: v => v.toString(),
    deserialize: v => new ObjectId(v),
  },
  'BSON ObjectId',
);

function WhatsDue({ Component, pageProps: { session, ...pageProps } }: AppProps<{session: Session}>) {
  return <SessionProvider session={session}>
    <Head>
      <meta name='description' content='What&apos;s Due? is a tool for managing your tasks.' />
      <title>What&apos;s Due?</title>
    </Head>

    <ThemeProvider theme={makeTheme()}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </SessionProvider>
}

export default WhatsDue
