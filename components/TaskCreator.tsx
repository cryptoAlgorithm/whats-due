import { styled } from '@mui/material/styles';
import { Box, Button, ClickAwayListener, Collapse, Container, InputBase, Paper, TextareaAutosize } from '@mui/material';
import { useState } from 'react';

const StyledAutoresizeTextarea = styled(TextareaAutosize)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  flexGrow: 1,
  outline: 'none',
  border: 'none',
  padding: '.75rem 1rem',
  resize: 'none',
  ...theme.typography.body1,
}));

const TitleInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  flexGrow: 1,
  width: '100%',
  padding: '1rem 1rem 0 1rem',
  ...theme.typography.h6,
  '&>input': {
    padding: 0
  }
}));

export default function TaskCreator() {
  const
    [inputFocused, setInputFocused] = useState(false),
    [title, setTitle] = useState(''),
    [content, setContent] = useState(''),
    canShrink = title.length === 0 && content.length === 0 && !inputFocused;

  return <ClickAwayListener onClickAway={() => setInputFocused(false)}>
    <Container maxWidth={'sm'} onClick={() => setInputFocused(true)}>
      <Paper variant={'outlined'}
             sx={{mx: 'auto', my: 2, display: 'flex', flexDirection: 'column', borderRadius: 2}}>
        <Collapse in={!canShrink}>
          <TitleInput placeholder={'Title'} onChange={e => setTitle(e.target.value)} value={title} />
        </Collapse>

        <StyledAutoresizeTextarea
          maxRows={10}
          placeholder={'Add a task...'}
          onInput={e => setContent(e.currentTarget.value)}
        />

        <Collapse in={!canShrink}>
          <Box px={1.4} pb={1.25} display={'flex'}>
            <Box flexGrow={1} />
            <Button size={'small'}>Add</Button>
          </Box>
        </Collapse>
      </Paper>
    </Container>
  </ClickAwayListener>;
}