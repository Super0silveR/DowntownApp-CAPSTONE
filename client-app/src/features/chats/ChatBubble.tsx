import { Box, Typography } from "@mui/material";
import theme from "../../app/theme";
import { UserChatDto } from "../../app/models/userChat";
import dayjs from "dayjs";

interface Props { 
    content: UserChatDto;
    previousDate: Date;
}

const ChatBubble = ({ content } : Props) => {
    return (
        <>
            <Box 
                sx={{
                    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                    width: '42%',
                    padding: 1,
                    borderRadius: 1,
                    backgroundColor: content.isMe ? theme.palette.common.white : theme.palette.primary.main,
                    color: content.isMe ? theme.palette.primary.main : theme.palette.common.white,
                    wordBreak: 'break-word'
                }}
                alignSelf={content.isMe ? 'flex-end' : 'flex-start'}
                margin={10}
            >
                <Typography alignContent='center' display='block'>{content.message}</Typography>
            </Box>
            {content.isLastInGroup &&   
                <Typography 
                    component="span"
                    alignSelf={content.isMe ? 'flex-end' : 'flex-start'} 
                    variant="subtitle2" 
                    fontWeight="100" 
                    color={theme.palette.primary.main + '70'}
                >
                    {dayjs(content.sentAt!).format('M/DD/YY — h:mm A')}
                </Typography>
            }
        </>
    );
}

export default ChatBubble;