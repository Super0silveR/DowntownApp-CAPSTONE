import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';

interface Props {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({ content = 'Loading...' } : Props) {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={true}
        >
            <Stack direction='column' spacing={2} alignItems='center'>
                <CircularProgress color='inherit' />
                <Typography
                    fontFamily='monospace'
                    fontWeight='600'
                    fontSize={18}
                >
                    {content}
                </Typography>
            </Stack>
        </Backdrop>    
    );
}