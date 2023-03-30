import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Grid } from '@mui/material';

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}

export default function PhotoCropperWidget({ imagePreview, setCropper } : Props) {
    return (
        <Grid container>
            <Grid item xs={12} sm={5} md={7}>
                <Cropper
                    src={imagePreview}
                    style={{height: 200, width: '100%'}}
                    initialAspectRatio={1}
                    aspectRatio={1}
                    preview='.img-preview'
                    guides={false}
                    viewMode={1}
                    autoCropArea={1}
                    background={false}
                    onInitialized={cropper => setCropper(cropper)}
                />
            </Grid>
            <Grid item xs={12} sm={5} md={5} pl={5} justifyContent='center'>
                <div 
                    className='img-preview' 
                    style={{
                        justifyContent:'center',
                        minHeight:200,
                        overflow:'hidden'
                    }} 
                />
            </Grid>
        </Grid>
    );
}