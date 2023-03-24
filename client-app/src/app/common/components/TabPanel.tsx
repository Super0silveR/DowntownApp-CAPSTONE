import { TabPanel } from '@mui/lab';
import { Box, Divider } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
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
            <Divider />
            <Box p={1} minHeight={100}>
                {content ?? <NotComplete />}
            </Box>
        </TabPanel> 
    );
}