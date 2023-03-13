import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import React from 'react';
import { Contributor } from '../../../app/models/event';
import { useTheme } from '@mui/material/styles';

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

    return (
        <>
            <Typography
                sx={{ 
                    display: 'inline',
                    textDecoration: 'none',
                    fontFamily:'monospace' 
                }}
                component="span"
                variant="h6"
                color="text.secondary"
            >
                Contributors
            </Typography>
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
                                    {contributor.status !== 'Creator' 
                                        ? (
                                            <IconButton aria-label='Remove' disabled>
                                                <HighlightOffOutlinedIcon />
                                            </IconButton>)
                                        : null
                                    }
                                </Stack>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar alt={contributor.userName} src={contributor.image ?? faces[i]} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ 
                                                display: 'inline',
                                                fontFamily:'monospace' 
                                            }}
                                            component="span"
                                            variant="body1"
                                            color="primary.dark"
                                        >
                                            {contributor.displayName}
                                        </Typography>
                                    </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ 
                                                display: 'inline',
                                                textDecoration: 'none',
                                                fontFamily:'monospace' 
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
        </>
    );
}