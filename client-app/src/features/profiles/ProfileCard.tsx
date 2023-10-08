import { Profile } from "../../app/models/profile";
import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";
import { Person } from "@mui/icons-material";

interface Props {
    profile: Profile | null | undefined;
}

export default observer(function ProfileCard({ profile }: Props) {
    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardHeader
                    avatar={
                        <Avatar src={profile?.photo} />
                    }
                />
                <CardContent>
                    <Typography>
                        {profile?.displayName}
                    </Typography>
                    <Typography color="text.primary" component="div">
                        <IconButton>
                            <Person />
                            {profile?.followers}
                            followers
                        </IconButton>
                    </Typography>
                </CardContent>
                <FollowButton profile={profile} />
            </Box>
        </Card>
    );
});