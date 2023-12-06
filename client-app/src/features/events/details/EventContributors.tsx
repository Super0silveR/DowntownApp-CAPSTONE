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
import { UserDto } from '../../../app/models/user';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

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

function EventContributors({ contributors }: Props) {
  const theme = useTheme();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserDto[]>([]); 
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  

  const openInviteModal = () => {
    setInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setInviteModalOpen(false);
    };
    const { eventStore } = useStore(); 


  const handleUserSearch = async () => {
      setErrorMessage('');
      setIsSearchEmpty(false);
      setLoading(true);
      try {
          await eventStore.searchUsers(userSearchQuery);
          const results = eventStore.userSearchResults;
          setSearchResults(results);
          setIsSearchEmpty(results.length === 0);
      } catch (error) {
          console.error('Error searching for users:', error);
          setErrorMessage(eventStore.userSearchError);
      } finally {
          setLoading(false);
      }
  };

  const handleInvite = (user: UserDto) => {
    console.log('Inviting user:', user);
    closeInviteModal();
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Stack direction='row' justifyContent='space-between' width='100%' mb={1}>
          <Typography
            sx={{
              display: 'inline',
              textDecoration: 'none'
            }}
            component="span"
            variant="h6"
            color="text.secondary"
          >
            Contributors
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={openInviteModal}
            sx={{mr:0}}
          >
            Invite Contributor
          </Button>
        </Stack>
      </div>

      {eventStore.userSearchResults.map((user) => (
          <div key={user.userName}>
              <Typography>{user.displayName}</Typography>
              <Button
                  variant="contained"
                  onClick={() => handleInvite(user)}
              >
                  Invite
              </Button>
          </div>
      ))}

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
        backgroundColor: 'white',
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        maxWidth: '400px',
      }}
    >
      <Typography variant='h5' color='purple' sx={{ marginBottom: '1rem' }}>
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
            <Typography key={user.userName} sx={{ mt: 2 }}>
                {user.displayName}
            </Typography>

        ))
              )}
              {errorMessage && <Typography color="error">{errorMessage}</Typography>}
              {isSearchEmpty && !loading && <Typography>No users found.</Typography>}
    </Paper>
  </Modal>
    </>
  );
}

export default observer(EventContributors);
