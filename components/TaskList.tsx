import { Masonry } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Container, Paper } from '@mui/material';

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 7
}));

export default function TaskList() {
  return <Container maxWidth={'lg'} sx={{p: .5}}>
    <Masonry
      sx={{m: 0}}
      spacing={1}
      columns={{ 'lg': 4, 'md': 3, 'sm': 2, 'xs': 1 }}
    >
      {heights.map((height, index) =>
        <Item key={index} sx={{ height }} variant={'outlined'}>{index + 1}</Item>
      )}
    </Masonry>
  </Container>
}