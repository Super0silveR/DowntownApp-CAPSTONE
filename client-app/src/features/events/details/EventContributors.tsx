import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useTheme } from '@mui/material/styles';
import { Contributor } from '../../../app/models/event';
import agent from '../../../app/api/agent';
import { User } from '../../../app/models/user';

// TEMPORARY.
const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
];

interface Props {
  contributors: Contributor[];
}

export default function EventContributors({ contributors }: Props) {
  const theme = useTheme();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]); 
  const [loading, setLoading] = useState(false);

  const openInviteModal = () => {
    setInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setInviteModalOpen(false);
  };

  const handleUserSearch = async () => {
    try {
      setLoading(true);
      const response = await agent.handleUserSearch(userSearchQuery);
      setSearchResults(response as unknown as User[]); 
    } catch (error) {
      console.error('Error searching for users:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInvite = (user: User) => {
    console.log('Inviting user:', user);
    closeInviteModal();
  };

  return (
    <>
      <Typography
        sx={{
          display: 'inline',
          textDecoration: 'none',
          fontFamily: 'monospace'
        }}
        component="span"
        variant="h6"
        color="text.secondary"
      >
        Contributors
      </Typography>
      <Button
        variant="outlined"
        onClick={openInviteModal}
        size="small"
              sx={{
                  ml: 2,
                  color: 'purple', 
                  borderColor: 'purple', 
                  '&:hover': {
                      backgroundColor: 'pink', 
                      borderColor: 'purple', 
                  }

              }}
      >
        Invite Contributor
      </Button>

      <Paper
        sx={{
          textAlign: 'center',
          fontFamily: 'monospace',
          padding: theme.spacing(1),
          fontSize: 16
        }}
        elevation={3}
      >
        <List>
          {contributors.map((contributor, i) => (
            <ListItem
              key={i}
              divider={i < contributors.length - 1}
              secondaryAction={
                <Stack direction='row' spacing={-1}>
                  <IconButton aria-label='Information'>
                    <HelpOutlineOutlinedIcon />
                  </IconButton>
                  {contributor.status !== 'Creator' ?
                    (
                      <IconButton aria-label='Remove' disabled>
                        <HighlightOffOutlinedIcon />
                      </IconButton>
                    ) : null
                  }
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar alt={contributor.user.userName} src={contributor.user.photo ?? faces[i]} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{
                        display: 'inline',
                        fontFamily: 'monospace'
                      }}
                      component="span"
                      variant="body1"
                      color="primary.dark"
                    >
                      {contributor.user.displayName}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{
                        display: 'inline',
                        textDecoration: 'none',
                        fontFamily: 'monospace'
                      }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {contributor.status}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Modal
        open={inviteModalOpen}
        onClose={closeInviteModal}
        aria-labelledby='invite-contributor-modal'
        aria-describedby='invite-contributor-description'
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '2rem',
            borderRadius: '16px',
            backgroundColor: '#ff86c3',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
            maxWidth: '400px',
          }}
        >
          <Typography variant='h5' color='white' sx={{ marginBottom: '1rem' }}>
            Invite Contributor
          </Typography>
          <TextField
            label='Search for users'
            variant='outlined'
            fullWidth
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
            sx={{ marginBottom: '1rem' }}
          />
          <Button
            variant="contained"
            onClick={handleUserSearch}
            fullWidth
            sx={{
              background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
              color: 'white',
              fontSize: '1.5rem',
              padding: '1em',
            }}
          >
            Search Users
          </Button>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            searchResults.map((user) => (
              <div key={user.userName}>
                {}
                <Typography>{user.displayName}</Typography>
                {}
                <Button
                  variant="contained"
                  onClick={() => handleInvite(user)}
                >
                  Invite
                </Button>
              </div>
            ))
          )}
        </Paper>
      </Modal>
    </>
  );
}