import { Paper, Typography } from '@mui/material';

export default function Footer() {
  const year = new Date().getFullYear();

  return <Paper square sx={{p: 2}}>
    <Typography variant={'h4'} gutterBottom>What's Due?</Typography>
    <Typography>
      This is a project by Vincent to help NUSH students better
      manage the many deadlines of projects, homework & assignments.
    </Typography>
    <Typography variant={'caption'}>
      &copy; Vincent 2022{year != 2022 ? ` - ${year}` : ''} • I ❤️ Open Source
    </Typography>
  </Paper>
}