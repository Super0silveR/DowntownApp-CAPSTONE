import { DeleteForever, FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import CustomTabPanel from '../../app/common/components/TabPanel';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

function ProfilePhotos() {
    return (
        <CustomTabPanel
            content={
                <ImageList
                  sx={{
                    width: 600,
                    height: 415,
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: 'translateZ(0)',
                  }}
                  rowHeight={200}
                  gap={6}
                >
                    {itemData.map((item) => {          
                        return (
                            <ImageListItem key={item.img} cols={1} rows={1}>
                                <img
                                    {...srcset(item.img, 300, 200)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={item.title}
                                    position="top"
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'white', p:'0.2em', m:'0.2em' }}
                                            aria-label={`star ${item.title}`}
                                            aria-details='photo-actions'
                                            size='medium'
                                        >
                                            {item.featured ? <FavoriteOutlined /> : <FavoriteBorderOutlined fontSize='inherit'/>}
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                />
                                <ImageListItemBar
                                    sx={{
                                    background:
                                        'rgba(0,0,0,0)'
                                    }}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'white', p:'0.2em', m:'0.2em' }}
                                            aria-label={`star ${item.title}`}
                                            aria-details='photo-actions'
                                            size='medium'
                                        >
                                            <DeleteForever fontSize='inherit'/>
                                        </IconButton>
                                    }
                                    actionPosition="right"
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>
            }
            id='photos-profile-tab'
            value='1'
        />
    );
}

export default observer(ProfilePhotos);

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];