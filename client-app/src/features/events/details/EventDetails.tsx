import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';

// TEMPORARY.
const faces = [
    "http://i.pravatar.cc/300?img=1",
    "http://i.pravatar.cc/300?img=2",
    "http://i.pravatar.cc/300?img=3",
    "http://i.pravatar.cc/300?img=4"
];

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

export default function EventDetails() {
    const theme = useTheme();
    const { eventStore } = useStore();
    const { selectedEvent: event, cancelSelectEvent, openForm, setRating } = eventStore;

    if (!event) return <LoadingComponent />;

    function randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <>
            <Card
                sx={{ml:2,my:1}}
            >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={`/assets/categoryImages/${randomIntFromInterval(1, 5)}.jpg`}
                    sx={{
                        p: 'none',
                        objectFit: 'cover',
                        height: '15em'
                    }}
                />
                <CardContent sx={{ padding: theme.spacing(1.5) }}>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                        sx={{
                            color: 'secondary.dark'
                        }}
                    >
                        {event.title}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        sx={{
                            color: 'secondary.light'
                        }}
                    >
                        {event.description}
                    </Typography>
                    <Divider
                        sx={{
                            margin: `${theme.spacing(3)}`
                        }}
                        className="divider"
                        light />
                    <Box
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex'
                        }}>
                        {faces.map((face, index) => (
                            <Avatar
                                sx={{
                                    display: 'inline-block',
                                    border: `2px solid ${index % 2 === 0 ? 'green' : 'darkred'}`,
                                    "&:not(:first-of-type)": {
                                        marginLeft: '0.2em'
                                    }
                                }}
                                className="avatar"
                                key={index}
                                src={face}
                                sizes='small'
                            />
                        ))}
                    </Box>
                </CardContent>
                <Box sx={{ padding: theme.spacing(1.5) }}>
                    <StyledRating
                        sx={{ padding: theme.spacing(0.7) }}
                        name="customized-color"
                        defaultValue={event.rating.value}
                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={0.1}
                        icon={<Favorite fontSize="inherit" />}
                        emptyIcon={<FavoriteBorder fontSize="inherit" />}
                        onChange={(event, newValue) => {setRating(newValue ?? 0)}}
                    />
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        sx={{
                            color: 'secondary.dark',
                            verticalAlign: 'top'
                        }}
                    >
                        ({event.rating.value})
                    </Typography>
                    <CardActions>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={1}
                        >
                            <Button
                                variant='outlined'
                                color='primary'
                                size="small"
                                sx={{ borderRadius: '0.2rem' }}
                                onClick={() => openForm(event.id)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant='outlined'
                                color='warning'
                                size="small"
                                sx={{ borderRadius: '0.2rem' }}
                                onClick={cancelSelectEvent}
                            >
                                Close
                            </Button>
                        </Stack>
                    </CardActions>
                </Box>
            </Card>
        </>
    );
}