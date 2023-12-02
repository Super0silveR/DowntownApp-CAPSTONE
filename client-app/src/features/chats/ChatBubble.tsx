import { Box, Typography } from "@mui/material";

interface Props { 
    content: string;
}

const ChatBubble = ({ content } : Props) => { 
    return (
        <Box>
            <Typography>{content}</Typography>
        </Box>
    );
}

export default ChatBubble;