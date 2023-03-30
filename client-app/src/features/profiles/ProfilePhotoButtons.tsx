import { Star, StarBorderOutlined, DeleteForever, Fullscreen } from '@mui/icons-material';
import { Grid, Stack, IconButton, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Photo } from '../../app/models/photo';

interface Props {
    deletePhoto: (photo: Photo) => void;
    isCurrentUser: boolean;
    loading: boolean;
    photo: Photo;
    setMain: (photo: Photo) => void;
}

function ProfilePhotoButtons({ deletePhoto, isCurrentUser, loading, photo, setMain } : Props) {

    const [target, setTarget] = useState('');

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMain(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <>
            <Grid container justifyContent='space-evenly' minHeight='inherit' padding='0.2em'>
            <Grid item xs={12}>
                {isCurrentUser &&
                    <Stack 
                        direction='row' 
                        justifyContent='space-between'
                    >
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label='Set Main'
                            aria-details='profile-photos'
                            title='Set Main'
                            disabled={photo.isMain}
                            name={'main' + photo.id}
                            onClick={(e) => handleSetMainPhoto(photo, e)}
                        >
                            {photo.isMain ? <Star /> : (loading && target === 'main' + photo.id) ? <CircularProgress size={24} /> : <StarBorderOutlined />}
                        </IconButton>
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label='Delete Forever'
                            aria-details='profile-photos'
                            disabled={photo.isMain}
                            title='Delete Forever'
                            name={photo.id}
                            onClick={(e) => handleDeletePhoto(photo, e)}
                        >
                            {(loading && target === photo.id) ? <CircularProgress size={24} /> : <DeleteForever />}
                        </IconButton>                         
                    </Stack>
                }
            </Grid>
            <Grid item xs={12} textAlign='end'>
                <Stack direction='row' height='100%' alignItems='flex-end'>
                    <IconButton
                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                        aria-label='Expand'
                        aria-details='profile-photos'
                        title='Expand'
                    >
                        <Fullscreen />
                    </IconButton>
                </Stack>
            </Grid>
            </Grid>
        </>
    );
}

export default observer(ProfilePhotoButtons);