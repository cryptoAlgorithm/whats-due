import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { cloneElement, ReactElement } from 'react';
import { useScrollTrigger } from '@mui/material';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}));

function ElevationScroll(props: { children: ReactElement }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 64,
  });

  return cloneElement(props.children, {
    elevation: trigger ? 6 : 2,
  });
}

export default function ProminentAppBar(props: {title: string, children?: ReactElement}) {
  return (
    <Box sx={{ flexGrow: 1, top: -64, position: 'sticky', zIndex: t => t.zIndex.appBar }}>
      <ElevationScroll>
        <AppBar position='static'>
          <StyledToolbar>
            <Typography
              variant='h5'
              noWrap
              component='div'
              sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
            >
              {props.title}
            </Typography>
            {props.children}
          </StyledToolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}