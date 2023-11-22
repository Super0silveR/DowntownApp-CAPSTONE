import { Instagram, Facebook, Pinterest } from '@mui/icons-material';
import { Paper, Container, Stack, Typography, Divider, ButtonGroup, IconButton, useTheme } from '@mui/material';
import { Profile } from '../../app/models/profile';

interface Props {
    profile: Profile;
}

// TODO: Make use of profile prop.
export default function ProfileAside({ profile } : Props) {

    const theme = useTheme();

    return (
        <Paper aria-label='profile-side-header' sx={{bgcolor:theme.palette.primary.main}}>
            <Container sx={{p:1,mt:1,height:'auto'}}>
                <Stack 
                    color='#fff'
                    gap={1}
                    flexDirection="column"
                    width={1.0}
                    flexWrap="wrap"
                >
                    <Typography variant='body2' pt={2}>
                        {profile.bio ?? 'Missing Bio.'}
                    </Typography>
                    <Typography variant='body2' pt={2}>{profile.location ?? 'Missing Location.'}</Typography>
                    <Divider />
                    <ButtonGroup sx={{justifyContent:'center'}}>
                        <IconButton aria-label='Instagram' aria-details='socials'>
                            <Instagram fontSize='small' />                                    
                        </IconButton>
                        <IconButton aria-label='Facebook' aria-details='socials'>
                            <Facebook fontSize='small' />                                    
                        </IconButton>
                        <IconButton aria-label='Pinterest' aria-details='socials'>
                            <Pinterest fontSize='small' />                                    
                        </IconButton>
                    </ButtonGroup>
                </Stack>
            </Container>                           
        </Paper>        
    );
}