import { Alert, Grid } from '@mui/material';

interface Props {
    errors: Array<string>;
}

export default function ValidationErrors({ errors }: Props) {

    if (Array.isArray(errors[0])) errors = errors[0];

    return (
        <>
            {errors && (
                <Grid 
                    container
                    maxWidth='md'
                    direction='column'
                >
                    {errors?.map((error, i) => (
                        <Grid item sx={{'&:not(:last-child)': { mb:2 }}} key={i}> 
                            <Alert severity="error">{error}</Alert>
                        </Grid>
                    ))}
                </Grid>                    
            )}
        </>
    );
}