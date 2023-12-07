import { Avatar, List, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem/ListItem';
import { useTheme } from '@mui/material/styles';
import { Review } from '../../../app/models/event';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface Props {
    ratings: Review[];
}

function EventRatingReviews({ ratings }: Props) {
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
                            >
                              <ListItemAvatar>
                                <Avatar alt={rating.user.userName?.toLocaleUpperCase()} src={rating.user.photo ?? `/assets/user.jpg`} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={rating.review}
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