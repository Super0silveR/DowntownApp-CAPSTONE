import { Avatar, Grid, Tab } from "@mui/material";
import ContentBox from "../../app/common/components/ContentBox";
import ContentHeader from "../../app/common/components/ContentHeader";
import { MessageOutlined } from "@mui/icons-material";
import { useState } from "react";
import { ChatRoom } from "../../app/models/chatRoom";
import { TabContext, TabList } from "@mui/lab";
import ProfileEvents from "../profiles/ProfileEvents";
import ProfileFollowers from "../profiles/ProfileFollowers";
import ProfileFollowings from "../profiles/ProfileFollowings";
import theme from "../../app/theme";

const chatRooms: ChatRoom[] = [
    {
        id: '1',
        chats: [
            {chatRoomId:'1',message:'Hi dude!',sent:new Date(),userId:'1'},
            {chatRoomId:'1',message:'Hey my dude!',sent:new Date(),userId:'2'}
        ],
        users: [{chatRoomId:'1',userId:'1'},{chatRoomId:'1',userId:'2'}]
    },
    {
        id: '2',
        chats: [
            {chatRoomId:'1',message:'Hi dude!',sent:new Date(),userId:'1'},
            {chatRoomId:'1',message:'Hey my dude!',sent:new Date(),userId:'2'}
        ],
        users: [{chatRoomId:'1',userId:'1'},{chatRoomId:'1',userId:'2'}]
    },
    {
        id: '3',
        chats: [
            {chatRoomId:'1',message:'Hi dude!',sent:new Date(),userId:'1'},
            {chatRoomId:'1',message:'Hey my dude!',sent:new Date(),userId:'2'}
        ],
        users: [{chatRoomId:'1',userId:'1'},{chatRoomId:'1',userId:'2'}]
    },
    {
        id: '4',
        chats: [
            {chatRoomId:'1',message:'Hi dude!',sent:new Date(),userId:'1'},
            {chatRoomId:'1',message:'Hey my dude!',sent:new Date(),userId:'2'}
        ],
        users: [{chatRoomId:'1',userId:'1'},{chatRoomId:'1',userId:'2'}]
    },
    {
        id: '5',
        chats: [
            {chatRoomId:'1',message:'Hi dude!',sent:new Date(),userId:'1'},
            {chatRoomId:'1',message:'Hey my dude!',sent:new Date(),userId:'2'}
        ],
        users: [{chatRoomId:'1',userId:'1'},{chatRoomId:'1',userId:'2'}]
    },
    {
        id: '6',
        chats: [
            {chatRoomId:'1',message:'Hi dude!',sent:new Date(),userId:'1'},
            {chatRoomId:'1',message:'Hey my dude!',sent:new Date(),userId:'2'}
        ],
        users: [{chatRoomId:'1',userId:'1'},{chatRoomId:'1',userId:'2'}]
    }
]

const tabProps = (index: number) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const MessageDashboard = () => {

    const [value, setValue] = useState('0');
  
    const handleChange = (newValue: string) => {
        setValue(newValue);
        console.log(newValue);
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
                        <Grid container>
                            <TabContext 
                                value={value}
                            >
                                <Grid item xs={3}>
                                    <TabList
                                        sx={{p: 1, pt:0, mb:-1, maxHeight:600}}
                                        onChange={(_, data) => handleChange(data)}
                                        aria-label="Profile Sections"
                                        selectionFollowsFocus
                                        orientation='vertical'
                                        variant='scrollable'
                                    >
                                        {chatRooms.map((chatRoom, i) => (
                                            <Tab 
                                                label={`Chat Room ${i}`} 
                                                value={`${i}`} 
                                                key={chatRoom.id} 
                                                iconPosition='start'
                                                icon={<Avatar src={`/assets/user.png`} sx={{border:'1px solid lightgray'}} />}
                                                sx={{
                                                    ml:0.2,
                                                    mr:0.2,
                                                    mb:(i < chatRooms.length - 1 ? 1 : 0.5),
                                                    mt:(i === 0 ? 0.5 : 1),
                                                    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                                                    borderRadius: 0.5,
                                                    color: theme.palette.primary.main,
                                                }}
                                            />
                                        ))}
                                    </TabList>
                                </Grid>
                                <Grid item xs={9} sx={{border:'1px solid blue'}}>
                                    MESSAGE CONTENT.
                                    <ProfileEvents />
                                    <ProfileFollowings key='following' />
                                    <ProfileFollowers key='followers' />
                                </Grid>
                            </TabContext>
                        </Grid>
                    </>
                )}
            />
        </>
    );
}

export default MessageDashboard;