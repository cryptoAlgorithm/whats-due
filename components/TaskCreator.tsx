import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Collapse,
  Container,
  Divider, Grow, IconButton,
  InputBase,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Paper,
  TextareaAutosize, Tooltip, Typography
} from '@mui/material';
import { useState } from 'react';
import { CampaignRounded, ExpandMoreRounded, GroupsRounded, PersonRounded } from '@mui/icons-material';
import { TaskVisibility } from './types';
import { User } from 'next-auth';

const StyledAutoresizeTextarea = styled(TextareaAutosize)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  flexGrow: 1,
  outline: 'none',
  border: 'none',
  padding: '.75rem 1rem',
  margin: 0,
  resize: 'none',
  ...theme.typography.body1,
  '&::-webkit-scrollbar': {
    width: '.5rem',
    backgroundColor: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider
  }
}));

const TitleInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  flexGrow: 1,
  width: '100%',
  padding: '.8rem 1rem .5rem 1rem',
  ...theme.typography.h6,
  '&>input': { padding: 0 }
}));

const CreatorContainer = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  margin: '1rem auto',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 24
}));

const MenuHeader = styled(ListSubheader)(({ theme }) => ({
  backgroundColor: 'transparent',
  lineHeight: '1em',
  margin: '.4rem 0 .6rem',
  paddingTop: 8,
}));

export default function TaskCreator(props: {isAdmin: boolean, isSuperAdmin: boolean}) {
  const
    [inputFocused, setInputFocused] = useState(false),
    [title, setTitle] = useState(''),
    [content, setContent] = useState(''),
    [optAnchor, setOptAnchor] = useState<null | HTMLElement>(null),
    [visibility, setVisibility] = useState<TaskVisibility>(TaskVisibility.Private),
    [optionsExpanded, setOptionsExpanded] = useState(false),
    shrunk = title.length === 0 && content.length === 0 && !inputFocused;

  const handleClose = (op: TaskVisibility | null = null) => {
    return () => {
      setOptAnchor(null);
      if (op) setVisibility(op);
    }
  }

  return <ClickAwayListener onClickAway={() => setInputFocused(false)}>
    <Container maxWidth={'sm'} onClick={() => setInputFocused(true)}>
      <CreatorContainer variant={shrunk ? 'outlined' : 'elevation'}>
        <Collapse in={!shrunk}>
          <TitleInput placeholder={'Title'} onChange={e => setTitle(e.target.value)} value={title} />
          <Divider sx={{borderStyle: 'dashed'}} />
        </Collapse>

        <StyledAutoresizeTextarea
          maxRows={10}
          placeholder={'Add a task...'}
          onInput={e => setContent(e.currentTarget.value)}
        />

        <Collapse in={!shrunk}>
          <Collapse in={optionsExpanded}>
            <Divider sx={{borderStyle: 'dashed'}} />
            <Box px={2}>
              <Typography variant={'overline'}>Options</Typography>
            </Box>
          </Collapse>

          <Divider sx={{borderStyle: 'dashed'}} />

          <Box px={1.3} py={1.25} display={'flex'} alignItems={'center'} gap={1}>
            <IconButton size={'small'} onClick={() => setOptionsExpanded(!optionsExpanded)}>
              <ExpandMoreRounded sx={{
                transform: `rotate(${optionsExpanded ? 180 : 0}deg)`,
                transition: t => t.transitions.create(['transform'])
              }} />
            </IconButton>
            <Grow in={!optionsExpanded}>
              <Typography variant={'caption'} lineHeight={'1.2em'}>More options</Typography>
            </Grow>

            <Box flexGrow={1} />

            <ButtonGroup variant={'contained'} size={'small'}>
              <Button>Add</Button>
              <Button
                sx={{pl: .3, pr: .7, minWidth: '0!important'}}
                aria-haspopup
                aria-controls={!!optAnchor ? 'add-ops' : undefined}
                onClick={e => setOptAnchor(e.currentTarget)}
              ><ExpandMoreRounded /></Button>
            </ButtonGroup>
            <Menu
              id={'add-ops'}
              anchorEl={optAnchor}
              open={!!optAnchor}
              onClose={handleClose()}
              MenuListProps={{ 'aria-labelledby': 'basic-button', dense: true }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuHeader>Visibility</MenuHeader>
              <Divider />
              <MenuItem onClick={handleClose(TaskVisibility.Private)}
                        selected={visibility === TaskVisibility.Private}>
                <ListItemIcon><PersonRounded /></ListItemIcon>
                <ListItemText primary={'Private'} secondary={'Only visible to you'} />
              </MenuItem>
              {
                props.isAdmin && <MenuItem onClick={handleClose(TaskVisibility.Class)}
                          selected={visibility === TaskVisibility.Class}>
                  <ListItemIcon><GroupsRounded /></ListItemIcon>
                  <ListItemText primary={'Class'} secondary={'Visible to class members'} />
                </MenuItem>
              }
              {
                props.isSuperAdmin && <MenuItem onClick={handleClose(TaskVisibility.Announcement)}
                          selected={visibility === TaskVisibility.Announcement}>
                  <ListItemIcon><CampaignRounded /></ListItemIcon>
                  <ListItemText primary={'Announcement'} secondary={''} />
                </MenuItem>
              }
            </Menu>
          </Box>
        </Collapse>
      </CreatorContainer>
    </Container>
  </ClickAwayListener>;
}