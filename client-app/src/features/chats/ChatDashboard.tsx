import { Avatar, Box, Grid, Tab } from "@mui/material";
import ContentBox from "../../app/common/components/ContentBox";
import ContentHeader from "../../app/common/components/ContentHeader";
import { MessageOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import ChatDetails from "./ChatDetails";
import { useStore } from "../../app/stores/store";
import theme from "../../app/theme";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import LoadingComponent from "../../app/layout/LoadingComponent";

const ChatDashboard = () => {

    const { userChatStore: { chatRooms, loadChatRooms, setSelectedChatRoom, loadingChatRooms } } = useStore();
    
    const [value, setValue] = useState<string>('0');
  
    const handleChange = (newValue: string) => {
        setValue(newValue);
        setSelectedChatRoom(newValue);
    };

    useEffect(() => {
        const updateTabsValue = (value: string) => {
            setValue(value);
            setSelectedChatRoom(value);
        }
        
        if (chatRooms.length <= 1) 
            loadChatRooms().then(() => {
                runInAction(() => {
                    if (chatRooms.length >= 1) {
                        const chatRoom = chatRooms.at(0);
                        updateTabsValue(chatRoom!.id);
                    }
                })
            });
        else
            setValue(chatRooms.at(0)?.id!)
    }, [chatRooms, loadChatRooms, setSelectedChatRoom]);

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
                            {loadingChatRooms 
                                ? <LoadingComponent content='Loading Conversations...' />
                                : 
                                <TabContext 
                                    value={value}
                                >
                                    <Grid item xs={3}>
                                        
                                    <Box 
                                        marginBottom={3} 
                                        height={500} 
                                        display='block' 
                                        className='messages-box' 
                                        sx={{
                                            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                                            borderRadius: 0.3,
                                            color: theme.palette.primary.main,
                                            scrollMargin: 1,
                                            overflowY: 'auto',
                                            scrollBehavior: 'smooth',
                                            overscrollBehavior: 'contain',
                                            padding:2
                                        }}
                                    >
                                        <TabList
                                            sx={{maxHeight:600, width:'100%'}}
                                            onChange={(_, data) => handleChange(data)}
                                            aria-label="User Messages"
                                            selectionFollowsFocus
                                            orientation='vertical'
                                            variant='scrollable'
                                        >
                                            {chatRooms?.map((chatRoom, index) => (
                                                <Tab
                                                    key={chatRoom.id}
                                                    label={chatRoom.displayName!}
                                                    value={chatRoom.id} 
                                                    iconPosition='start'
                                                    icon={<Avatar src={`/assets/user.png`} sx={{border:'1px solid lightgray',width:35,height:35,marginRight:100}} />}
                                                    sx={{
                                                        ml:0.2,
                                                        mr:0.2,
                                                        mb:(index < chatRooms.length - 1 ? 1 : 0.1),
                                                        mt:(index === 0 ? 0.1 : 1),
                                                        boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                                                        borderRadius: 0.3,
                                                        color: theme.palette.primary.main,
                                                        minHeight: 0,
                                                        height: 50,
                                                        textTransform: "none",
                                                        lineHeight: 0,
                                                    }}
                                                />
                                            ))}
                                            {value === '0' && <Tab hidden value='0' label='No Conversation' />}
                                        </TabList>
                                    </Box>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <ChatDetails id={value} chatRoomId={value} />
                                    </Grid>
                                </TabContext>
                            }
                        </Grid>
                    </>
                )}
            />
        </>
    );
}

export default observer(ChatDashboard);