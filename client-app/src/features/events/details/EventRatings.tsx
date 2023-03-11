import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Grid, Paper, Rating, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Rating as EventRating } from '../../../app/models/event';
import { useStore } from '../../../app/stores/store';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

interface Props {
    rating: EventRating;
}

function EventRatings({ rating }: Props) {
    const theme = useTheme();

    const { eventStore } = useStore();
    const { setRating } = eventStore;

    const [voted, setVoted] = useState(true);

    function handleRatingChange(e: React.SyntheticEvent<Element, Event>, value: number | null) {
        setRating(value ?? 0);
        setVoted(false);
    }
    
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
                Rating
            </Typography>
            <Paper 
                sx={{
                    textAlign: 'center',
                    padding: theme.spacing(2)
                }} 
                elevation={3}
            >
                <Box>
                    <Grid>
                        <Grid item>
                            <Typography
                                sx={{ 
                                    display: 'inline',
                                    textDecoration: 'none',
                                    fontFamily:'monospace',
                                    fontWeight:700,
                                    fontSize:36
                                }}
                                component="span"
                                variant="h6"
                                color="text.secondary"
                            >
                                {rating.value ?? 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <StyledRating
                                disabled={!voted}
                                name="customized-color"
                                defaultValue={0}
                                value={rating.value}
                                getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={0.1}
                                icon={<Favorite fontSize="inherit" />}
                                emptyIcon={<FavoriteBorder fontSize="inherit" />}
                                onChange={(e, value) => handleRatingChange(e, value)}
                            />
                            <Typography
                                className={"MuiTypography--subheading"}
                                variant={"caption"}
                                sx={{
                                    color: '#000',
                                    verticalAlign: 'top',
                                    fontFamily: 'monospace'
                                }}
                            >
                                ({(rating.count !== 0) ? rating.count : 'N/A'})
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    );
};

export default observer(EventRatings);