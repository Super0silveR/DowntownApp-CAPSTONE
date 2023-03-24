import { Instagram, Facebook, Pinterest } from '@mui/icons-material';
import { Paper, Container, Stack, Typography, Divider, ButtonGroup, IconButton } from '@mui/material';
import React from 'react';
import { Profile } from '../../app/models/profile';

interface Props {
    profile: Profile;
}

export default function ProfileAside({ profile }: Props) {
    return (
        <Paper aria-label='profile-side-header' sx={{bgcolor:'#3f50b5'}}>
            <Container sx={{p:1,mt:1,height:'auto'}}>
                <Stack 
                    color='#fff'
                    gap={1}
                    flexDirection="column"
                    width={1.0}
                    flexWrap="wrap"
                >
                    <Typography variant='body2' fontSize={12} pt={2}>
                        A believer in the power of technology to accelerate progress in healthcare, Joaquin is leading Johnson & Johnson to harness data science and intelligent...
                    </Typography>
                    <Typography>Location</Typography>
                    <Typography>Status</Typography>
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