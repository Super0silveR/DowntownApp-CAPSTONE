import { DownloadDoneRounded, UploadFileRounded } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import theme from '../../theme';

interface Props {
    setFiles: (files: object[]) => void;
}

export default function PhotoDropZoneWidget({ setFiles } : Props) {
    const dzStyle = useMemo(() => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.text.disabled + '20',
        border: '3px dashed ' + theme.palette.primary.light + '80',
        borderColor: theme.palette.primary.light + '80',
        borderRadius: '5px',
        color: theme.palette.text.secondary,
        height: 150,
        justifyContent: 'center',
        paddingTop: '20px',
        textAlign: 'center'
    } as object), []);
    
    const activeStyle = useMemo(() => ({
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white
    }), [])

    const onDrop = useCallback((acceptedFiles: object[]) => {
        setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
            preview: URL.createObjectURL(file as Blob)
        })));
    }, [setFiles]);

    const { 
        getRootProps, 
        getInputProps, 
        isDragActive,
        acceptedFiles,
    } = useDropzone({accept: {'image/*': []}, onDrop});
    
    const style = useMemo(() => ({
        ...dzStyle,
        ...(isDragActive ? activeStyle : {}),
      }), [
        activeStyle,
        dzStyle,
        isDragActive
      ]);

    return (
        <Box sx={{'&:hover': {
            backgroundColor: theme.palette.primary.light + '10'
        }}}>
            <div 
                {...getRootProps({
                    style
                })}
            >
                <input {...getInputProps()} />
                <Stack width='100%' justifyContent='center' direction='column'>
                    <span>
                        {acceptedFiles.length 
                            ? <DownloadDoneRounded fontSize='large' color='success' /> 
                            : <UploadFileRounded fontSize='large' />
                        }
                    </span>
                    <Typography variant='subtitle2'>Drop your file here!</Typography>
                    <Typography variant='caption'>
                        {acceptedFiles.length ? acceptedFiles[0].name : null}
                    </Typography>
                </Stack>
            </div>            
        </Box>
    )
}