import { Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

function ServerError() {
    const { commonStore } = useStore();

    return (
        <>
            <Container>
                <Typography mb={2} variant='h4' fontFamily='monospace'>Server Error!</Typography>
                <Typography color='error' mb={2} variant='h6' fontFamily='monospace'>{commonStore.error?.message}</Typography>
                {commonStore.error?.details && (
                    <Paper sx={{p:4}}>
                        <Typography mb={2} variant='h6' fontFamily='monospace'>Stack Trace</Typography>
                        <code 
                            style={{
                                marginTop:'10px',
                                whiteSpace:'normal',
                                display:'inline-block',
                                maxWidth: '100%',
                                wordBreak: 'break-all',
                                wordWrap: 'break-word'
                            }}
                        >
                            {commonStore.error?.details}
                        </code>
                    </Paper>
                )}
            </Container>  
        </>
    );
}

export default observer(ServerError);