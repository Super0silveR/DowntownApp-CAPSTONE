import { Add, Clear } from '@mui/icons-material';
import { Card, CardMedia, Fab, Grid, Stack, SxProps, Typography, Zoom } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import CustomTabPanel from '../../app/common/components/TabPanel';
import PhotoUploadWidget from '../../app/common/image/PhotoUploadWidget';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import theme from '../../app/theme';
import ProfilePhotoButtons from './ProfilePhotoButtons';

// function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
//     return {
//       src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
//       srcSet: `${image}?w=${width * cols}&h=${
//         height * rows
//       }&fit=crop&auto=format&dpr=2 2x`,
//     };
//   }

interface Props {
  profile: Profile;
}  

const fabStyle = {
  position: 'relative',
  bottom: theme.spacing(0),
  right: theme.spacing(0)
}; 

const fabs = [
  {
    color: 'primary' as 'primary',
    icon: <Add />,
    sx: fabStyle as SxProps,
    label: 'Add',
  },
  {
    color: 'secondary' as 'secondary',
    icon: <Clear />,
    sx: fabStyle as SxProps,
    label: 'Cancel',
  },
]; 

const transitionDuration = {
  enter: theme.transitions.duration.enteringScreen,
  exit: theme.transitions.duration.leavingScreen,
};

function ProfilePhotos({ profile } : Props) {

    const { 
      profileStore: { 
        deletePhoto,
        isCurrentUser, 
        loading,
        uploadPhoto, 
        uploading,
        setMain,
      }
    } = useStore();

    const [addPhotoMode, setAddPhotoMode] = useState(false);

    function handlePhotoUpload(file: Blob) {
      uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    return (
        <CustomTabPanel
            content={
              <>
                <Grid container spacing={1}>
                  <Grid item xs={12} textAlign='right'>
                    <Stack direction='row' width='100%' justifyContent={addPhotoMode ? 'space-between' : 'right'}>
                      {addPhotoMode && <Typography variant='body2' fontSize={18} alignSelf='center'>Upload a new photo!</Typography>}
                      {isCurrentUser && 
                        fabs.map((fab, index) => (
                          /** TODO: Issue with the transition of button. */
                          <Zoom
                            key={fab.color}
                            in={Number(addPhotoMode) === index}
                            timeout={transitionDuration}
                            style={{
                              transitionDelay: `${Number(addPhotoMode) === index ? transitionDuration.exit : 0}ms`,
                            }}
                            unmountOnExit
                          >
                            <Fab 
                              size='small' 
                              key={fab.color}
                              aria-label={fab.label} 
                              color={fab.color}
                              onClick={() => setAddPhotoMode(!addPhotoMode)}
                              sx={fab.sx}
                            >
                              {fab.icon}
                            </Fab>
                          </Zoom>
                        ))
                      }
                    </Stack>
                  </Grid>
                  {addPhotoMode 
                    ? <PhotoUploadWidget uploadPhoto={handlePhotoUpload} uploading={uploading} />
                    : profile.photos?.map((photo) => (
                        <Grid item xs={12} sm={6} md={4} key={photo.id}>
                          <Card aria-details='profile-photo-card'>
                            <div style={{ position: "relative" }}>
                              <CardMedia
                                sx={{ minHeight: 250 }}
                                image={photo.url}
                                children={
                                  <ProfilePhotoButtons 
                                    deletePhoto={deletePhoto}
                                    isCurrentUser={isCurrentUser}
                                    loading={loading}
                                    photo={photo}
                                    setMain={setMain}
                                  />
                                }
                              />
                            </div>
                          </Card>
                        </Grid>
                    ))
                  }
                </Grid>
              </>
            }
            id='photos-profile-tab'
            value='1'
        />
    );
}

export default observer(ProfilePhotos);