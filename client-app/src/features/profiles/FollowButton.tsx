import React, { SyntheticEvent, useState } from "react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { Favorite, FavoriteBorder, HeartBroken } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useStore } from "../../app/stores/store";
import { LoadingButton } from "@mui/lab";

interface Props {
    profile: Profile | null | undefined;
}

/**
 * FollowButton Feature for web app usage.
 */
export default observer(function FollowButton({profile} : Props) {

    /** MobX Stores and Attributes. */
    const {profileStore, userStore} = useStore();
    const {updateFollowing, loading} = profileStore;

    /** Local States. */
    const [endIcon, setEndIcon] = useState<React.ReactNode>(profile?.isFollowing ? <Favorite /> : <FavoriteBorder />);
    const [followText, setFollowText] = useState(profile?.isFollowing ? "Following" : "Not Following");
    const [buttonOpacity, setButtonOpacity] = useState(1.0);
    
    /** User looking at their own profile won't be able to follow themselves. */
    if (userStore.user?.userName === profile?.userName) return null;

    /**
     * Handling the following management request.
     * @param e Synthetic Event, i.e. the button that was just clicked.
     * @param username Username of person to whom we manage their following.
     */
    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        if (profile?.isFollowing) {
            setEndIcon(<FavoriteBorder />);
            setFollowText("Not Following");
            updateFollowing(username, false);
        } else {
            setEndIcon(<Favorite />);
            setFollowText("Following");
            updateFollowing(username, true);
        }    
    }
    
    /**
     * Handling the mouse over UI changes for the follow button. Mostly alternating between different 'end icon' to reflect user actions.
     * @param e Synthetic Event, i.e. the button that was just clicked.
     */
    function handleMouseOver(e: SyntheticEvent) {
        e.preventDefault();
        if (profile?.isFollowing) { 
            setButtonOpacity(0.6);
            setEndIcon(<HeartBroken/>);
            setFollowText("Unfollow?");
        } else {
            setButtonOpacity(1.5);
            setEndIcon(<Favorite />);
            setFollowText("Follow!");
        }
    }

    /**
     * Handling the mouse over leave UI changes for the follow button. Mostly alternating between different 'end icon' to reflect user actions.
     * @param e Synthetic Event, i.e. the buttont that was just clicked.
     * @returns Nothing. Using 'return' statement for icon mangement.
     */
    function handleMouseLeave(e: SyntheticEvent) {
        e.preventDefault();

        setButtonOpacity(1.0);
        
        if (loading) return;

        if (profile?.isFollowing) { 
            setEndIcon(<Favorite/>);
            setFollowText("Following");
        } else {
            setEndIcon(<FavoriteBorder />);
            setFollowText("Not Following");
        }
    }

    return (
        <LoadingButton
            key={profile?.userName}
            variant='contained'
            size='small'
            sx={{width:'75%', opacity:buttonOpacity}}
            endIcon={endIcon}
            loading={loading}
            onClick={(e) => handleFollow(e, (profile?.userName as string))}
            onMouseOver={(e) => handleMouseOver(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
        >
            <Typography fontFamily='monospace'>
                {followText}
            </Typography>
        </LoadingButton>
        );
})