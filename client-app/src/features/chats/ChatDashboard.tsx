import { Avatar, Grid, Tab } from "@mui/material";
import ContentBox from "../../app/common/components/ContentBox";
import ContentHeader from "../../app/common/components/ContentHeader";
import { MessageOutlined, RiceBowl } from "@mui/icons-material";
import { useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import ChatDetails from "./ChatDetails";
import { useStore } from "../../app/stores/store";
import theme from "../../app/theme";

const ChatDashboard = () => {

    const { userChatStore: { chatRooms } } = useStore();
    const [value, setValue] = useState("0");
  
    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <ContentBox 
                content={(
                    <>
                        <ContentHeader 
                            title='Conversations'
                            subtitle='Here lies all of your private conversations.'
                            actionButtonLabel='NEW'
                            displayActionButton={true}
                            actionButtonStartIcon={<MessageOutlined />}
                            actionButtonDest='#'
                        />
                        <Grid container minHeight={500}>
                            <TabContext 
                                value={value}
                            >
                                <Grid item xs={3}>
                                    <TabList
                                        sx={{maxHeight:600, width:'100%'}}
                                        onChange={(_, data) => handleChange(data)}
                                        aria-label="Profile Sections"
                                        selectionFollowsFocus
                                        orientation='vertical'
                                        variant='scrollable'
                                    >
                                    {chatRooms?.map((chatRoom, index) => (
                                        <Tab 
                                            key={index}
                                            label={`Hephaestots`} 
                                            value={`${index}`} 
                                            iconPosition='start'
                                            icon={<Avatar src={`/assets/user.png`} sx={{border:'1px solid lightgray',width:35,height:35}} />}
                                            sx={{
                                                ml:0.1,
                                                mr:0.1,
                                                mb:(index < chatRooms.length - 1 ? 1 : 0.1),
                                                mt:(index === 0 ? 0.1 : 1),
                                                boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                                                borderRadius: 0.3,
                                                color: theme.palette.primary.main,
                                                minHeight: 0,
                                                height: 50,
                                                textTransform: "none",
                                                lineHeight: 0
                                            }}
                                        />
                                    ))}
                                    </TabList>
                                </Grid>
                                <Grid item xs={9}>
                                    <ChatDetails id={value} chats={[]} />
                                </Grid>
                            </TabContext>
                        </Grid>
                    </>
                )}
            />
        </>
    );
}

export default ChatDashboard;