import { LoadingButton } from '@mui/lab';
import { Button, Grid, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import theme from '../../theme';
import PhotoCropperWidget from './PhotoCropperWidget';
import PhotoDropZoneWidget from './PhotoDropZoneWidget';

interface Props {
    uploading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({ uploading, uploadPhoto } : Props) {

    const [activeStep, setActiveStep] = useState(0);
    const [files, setFiles] = useState<object & {preview?: string}[]>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const onCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
        }
    };
  
    const handleNext = () => {
      if (activeStep !== 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        onCrop();
      }
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setFiles([]);
    };
    
    const steps = [
        {
            label: 'Add Photo',
            description: 'Add a photo that represents you the most.',
            component: <PhotoDropZoneWidget setFiles={setFiles} />
        },
        {
            label: 'Crop, Preview & Upload!',
            description: 'Customize the size of your photo and once you\'re satisfied with the preview, upload it!',
            component: (files && files.length > 0 &&
                <PhotoCropperWidget 
                    setCropper={setCropper} 
                    imagePreview={files[0].preview!}
                />
            )
        }
    ];

    /** 
     * Make sure to get empty the memory from the 
     * object we created as preview for the cropper. 
     * */
    useEffect(() => {
        return () => {
            files.forEach((file : object & {preview?: string}) => URL.revokeObjectURL(file.preview!));
        }
    }, [files]);

    return (
        <Stepper activeStep={activeStep} orientation="vertical" sx={{p:3,width:'100%'}}>
            {steps.map((step, index) => (
                <Step key={step.label} sx={{fontWeight:700,fontSize:30}}>
                    <StepLabel
                        optional={
                            (index === 2 && activeStep === 2) ? (
                                <Typography variant="caption" color={theme.palette.primary.light}>Last step!</Typography>
                            ) : null
                        }
                    >
                        {step.label}
                    </StepLabel>
                    <StepContent>
                        <Typography sx={{fontSize:15}} variant='subtitle1' color={theme.palette.text.secondary} fontSize={12}>{step.description}</Typography>
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <div>
                                {step.component ?? null}
                                <>                               
                                    <LoadingButton
                                        disabled={files.length <= 0}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                        loading={(index === steps.length - 1) && uploading}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </LoadingButton>
                                    <Button
                                        disabled={index === 0 || uploading}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </>
                            </div>
                        </Grid>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    );
}