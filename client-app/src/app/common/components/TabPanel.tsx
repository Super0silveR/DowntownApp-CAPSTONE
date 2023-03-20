import { TabPanel } from '@mui/lab';
import { Box, SxProps, Theme } from '@mui/system';
import React from 'react';
import NotComplete from '../NotComplete';

interface Props {
    id: string;
    content?: JSX.Element | null;
    sx?: SxProps<Theme> | undefined;
    value: string;
}

/** Custom tab panel that I use for the profile right now. */
export default function CustomTabPanel({ id, content, value, sx }: Props) {
    return (
        <TabPanel
            id={id}
            value={value}
            sx={{
                padding: '0.5em',
                paddingTop: 0,
                ...sx
            }}
        >
            <Box
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 4px 0px inset',
                    borderRadius: '0.5em',
                    minHeight: '150px',
                    padding: 2,
                }}
            >
                {content ?? <NotComplete />}
            </Box>
        </TabPanel> 
    );
}