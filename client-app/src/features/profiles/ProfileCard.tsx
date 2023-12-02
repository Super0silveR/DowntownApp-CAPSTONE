import { Profile } from "../../app/models/profile";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";
import { Person } from "@mui/icons-material";
import { router } from "../../app/router/Routes";

interface Props {
    profile: Profile | null | undefined;
}

export default observer(function ProfileCard({ profile }: Props) {

    const opacity = profile?.isFollowing ? 1 : 0.5;

    return (
        <Card sx={{ display: 'flex', minHeight:150, opacity:opacity}} variant="outlined">
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardActionArea onClick={() => router.navigate(`/profiles/${profile?.userName}`)}>
                    <CardMedia
                        component="img"
                        image={profile?.photo ?? `/assets/user.png`}
                        alt={`${profile?.displayName}'s PFP`}
                        sx={{p:0,objectFit: "contain",display:'flex', justiyContent:'space-between', flexDirection:'column'}}                   
                    />
                </CardActionArea>
                <CardContent>
                    <Typography>
                        {profile?.displayName}
                    </Typography>
                    <Typography color="text.primary" component="div">
                            <Person />
                            {profile?.followers}&nbsp;
                            followers
                    </Typography>
                </CardContent>
                <FollowButton profile={profile} />
            </Box>
        </Card>
    );
});