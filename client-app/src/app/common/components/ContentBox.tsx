import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    content: ReactNode;
}

const ContentBox = ({content}: Props) => {
    return (
        <Box sx={{p:5,boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',bgcolor:'rgba(249, 249, 249, 0.15)'}}>
            {content}
        </Box>
    );
}

export default ContentBox;