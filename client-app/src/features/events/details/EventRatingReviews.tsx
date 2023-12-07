import { Avatar, IconButton, List, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem/ListItem';
import { useTheme } from '@mui/material/styles';
import { Review } from '../../../app/models/event';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';

interface Props {
    ratings: Review[];
    currentUsername: string;
}

function EventRatingReviews({ ratings, currentUsername }: Props) {
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
                Reviews
            </Typography>
            <Paper 
                sx={{
                    textAlign: 'left',
                    padding: theme.spacing(2)
                }} 
                elevation={3}
            >
                <List>
                    {ratings && ratings.map((rating, i) => {
                        return (
                            <ListItem 
                                alignItems="flex-start" 
                                key={i} 
                                divider={i < (ratings.length)} 
                                sx={{
                                    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 1px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                                    mb: (i < ratings.length) ? 1 : 0
                                }}
                                secondaryAction={
                                    rating.user.userName === currentUsername &&
                                    <IconButton edge="end" aria-label="delete" aria-details="base-invert">
                                        <Delete />
                                    </IconButton>
                                }
                            >
                              <ListItemAvatar>
                                <Avatar alt={rating.user.userName?.toLocaleUpperCase()} src={rating.user.photo ?? `/assets/user.png`} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                    <Stack direction='row' spacing={1}>
                                        <Typography variant='body1'>{rating.review}</Typography>
                                        <Typography variant='caption' alignSelf='center' color={theme.palette.primary.main}>({rating.vote}/5)</Typography>
                                    </Stack>
                                }
                                secondary={
                                  <> 
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="caption"
                                      color="text.primary"
                                    >
                                      <Link to={rating.user ? `/profiles/${rating.user.userName}` : '#'}>{rating.user.displayName}</Link>—
                                    </Typography>
                                    {dayjs(rating.rated!).format('MMMM DD — YYYY')}
                                  </>
                                }
                              />
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </>
    );
}

export default EventRatingReviews;