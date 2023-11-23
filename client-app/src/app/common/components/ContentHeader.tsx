import { Stack, Box, Typography, Button, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import theme from "../../theme";
import { ReactNode } from "react";

interface Props {
    title: string;
    subtitle: string;
    displayActionButton: boolean;
    actionButtonLabel?: string;
    actionButtonStartIcon: ReactNode | undefined;
    actionButtonDest: string;
}

const ContentHeader = (props: Props) => {
    return (
        <>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
                sx={{ marginBottom: 4 }}
            >
                <Box>
                    <Typography variant='h3'>{props.title}</Typography>
                    <Typography variant='subtitle1' color={theme.palette.primary.main} fontStyle='italic'>
                        {props.subtitle}
                    </Typography>
                </Box>
                {
                    props.displayActionButton && 
                    <Button
                        startIcon={props.actionButtonStartIcon}
                        variant='contained'
                        component={NavLink}
                        size='large'
                        to={props.actionButtonDest}
                        sx={{
                            borderRadius: '5px',
                            backgroundColor: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                                color: theme.palette.primary.dark
                            },
                            padding: '10px 15px',
                            boxShadow: 1,
                            transition: '0.1s',
                        }}
                    >
                        {props.displayActionButton ? props.actionButtonLabel : ''}
                    </Button>
                }
            </Stack>
            <Divider sx={{ my: 3 }} />
        </>
    );
}

export default ContentHeader;