import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
    Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { observer } from "mobx-react-lite";
import { MoneyOutlined } from "@mui/icons-material";

interface Message {
    id: number;
    text: string;
    avatar: string;
}

function Message({ message }: { message: Message }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                mb: 1,
                "&:last-child": {
                    mb: 0,
                },
            }}
        >
            <Avatar sx={{ bgcolor: "primary.main" }}>
                {message.avatar}
            </Avatar>
            <Paper
                variant="outlined"
                sx={{
                    px: 2,
                    py: 1,
                    ml: 1,
                    mr: 0,
                    backgroundColor: "primary.light",
                    borderRadius: "15px 20px 20px 5px",
                }}
            >
                <Typography variant="body1">{message.text}</Typography>
            </Paper>
        </Box>
    );
}

function LiveChat() {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() !== "") {
            console.log(input);
            setInput("");
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const messages: Message[] = [
        { id: 1, text: "Hi there!", avatar: "😀" },
        { id: 2, text: "Hello!", avatar: "😁" },
        { id: 3, text: "Welcome to the Stream", avatar: "😇" },
        { id: 4, text: "Thanks, this stream is great!", avatar: "😁" },
        { id: 5, text: "I think so too!", avatar: "😇" },
        { id: 6, text: "What's your favorite part?", avatar: "😁" },
        { id: 7, text: "The part where I'm in the stream", avatar: "😇" },
        { id: 8, text: "Hi there!", avatar: "😀" },
        { id: 9, text: "Hello!", avatar: "😁" },
        { id: 10, text: "Welcome to the Stream", avatar: "😇" },
        { id: 11, text: "What's your favorite part?", avatar: "😁" },
        { id: 12, text: "The part where I'm in the stream", avatar: "😇" },
        { id: 13, text: "Hi there!", avatar: "😀" },
        { id: 14, text: "Hello!", avatar: "😁" },
        { id: 15, text: "Welcome to the Stream", avatar: "😇" },
    ];

    return (
        <Box maxHeight={545} sx={{ display: "flex", flexDirection: "column", backgroundColor: "#f7f7f7", borderRadius: 1, boxShadow: 1 }}>
            <Box sx={{overflowY: "scroll", p: 2 }}>
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </Box>
            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Grid container>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            placeholder="Type a message"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            size="small"
                            color="primary"
                            variant="outlined"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                        >
                        </Button>
                        <Button
                            fullWidth
                            size="small"
                            color="primary"
                            variant="outlined"
                            endIcon={<MoneyOutlined />}
                        >
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default observer(LiveChat);
