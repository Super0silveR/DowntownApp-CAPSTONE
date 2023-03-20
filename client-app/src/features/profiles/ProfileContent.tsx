import { CropOriginal, EmojiEvents, PeopleOutline, PermIdentity, InfoOutlined } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Tab } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import CustomTabPanel from '../../app/common/components/TabPanel';
import { Profile } from '../../app/models/profile';
import ProfileGeneral from './ProfileGeneral';

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

interface Props {
    profile: Profile;
}

function ProfileContent({ profile }: Props) {
    const [value, setValue] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Paper
            sx={{
                fontFamily: 'monospace',
                fontSize: 16
            }}
            elevation={3}
        >
            <TabContext value={value}>
                <TabList
                    sx={{ mt: 2}}
                    onChange={handleChange}
                    aria-label="Profile Sections"
                    selectionFollowsFocus
                    centered
                >
                    <Tab label="General" value='0' icon={<PermIdentity fontSize='small' />} iconPosition='top' />
                    <Tab label="Photos" value='1' icon={<CropOriginal fontSize='small' />} iconPosition='top' />
                    <Tab label="Events" value='2' icon={<EmojiEvents fontSize='small' />} iconPosition='top' />
                    <Tab label="Friends" value='3' icon={<PeopleOutline fontSize='small' />} iconPosition='top' />
                </TabList>
                <CustomTabPanel
                    content={<ProfileGeneral profile={profile} /> }
                    id='general-profile-tab'
                    value='0'
                />
                <CustomTabPanel
                    content={
                        <ImageList
                            sx={{ m: 'auto', borderRadius: 2 }}
                            variant="quilted"
                            cols={6}
                            rowHeight={121}
                        >
                            {itemData.map((item) => (
                                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                    <img
                                        {...srcset(item.img, 121, item.rows, item.cols)}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.title}
                                        subtitle={item.author}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.title}`}
                                            >
                                                <InfoOutlined />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>}
                    id='photos-profile-tab'
                    value='1'
                />
                <CustomTabPanel
                    id='events-profile-tab'
                    value='2'
                />
                <CustomTabPanel
                    id='followers-profile-tab'
                    value='3'
                />
            </TabContext>
        </Paper>
    );
};

export default observer(ProfileContent);

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
    },
];