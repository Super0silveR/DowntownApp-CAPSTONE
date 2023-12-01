import { DeleteForeverOutlined, RemoveCircleOutline } from "@mui/icons-material";
import { ListItem, Stack, IconButton, ListItemAvatar, Avatar, ListItemText, Typography, Card } from "@mui/material";
import React from "react";
import { ChatRoom } from "../../app/models/chatRoom";
import dayjs from "dayjs";

interface Props {
    id: number;
    chatRoom: ChatRoom;
}

const MessageListItem = ({ id, chatRoom }: Props) => {
    return (
        <>
            <Card
                sx={{
                    mb:1,
                    maxHeight:'100px'
                }}
                variant='outlined'
            >
                <ListItem
                    key={id}
                    secondaryAction={
                        <Stack direction='row' spacing={-1}>
                            <IconButton aria-label='Close' aria-details='base-invert'>
                                <RemoveCircleOutline fontSize='small' />
                            </IconButton>
                        </Stack>
                    }
                    sx={{ wordBreak: "break-word" }}
                >
                    <ListItemAvatar>
                        <Avatar alt={'contributor.user.userName'} src={"contributor.user.photo ?? faces[i]"} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <>
                                <Typography
                                    sx={{
                                        display: 'inline',
                                    }}
                                    component="span"
                                    variant="body1"
                                    color="primary.dark"
                                    fontSize={15}
                                >
                                    Vincent Harvey
                                </Typography>
                            </>
                        }
                        secondary={
                            <>
                                <Typography
                                    sx={{
                                    display: 'inline',
                                    textDecoration: 'none',
                                    }}
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    something{"contributor.status"}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
            </Card>
        </>
    );
}

export default MessageListItem;