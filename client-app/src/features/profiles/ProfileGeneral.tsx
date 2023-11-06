import { observer } from 'mobx-react-lite';
import CustomTabPanel from '../../app/common/components/TabPanel';
import { Profile } from '../../app/models/profile';
import CreatorProfileGeneral from './creators/CreatorProfileGeneral';

interface Props {
    profile: Profile;
}

function ProfileGeneral({ profile }: Props) {
    return (        
        <CustomTabPanel
            content={
                // profile.bio
                // ? <Stack direction='row'>
                //     <Typography sx={{textDecoration:'underline', mr:1}}>
                //         Bio
                //     </Typography>
                //     <Typography textAlign='justify'>
                //         A believer in the power of technology to accelerate progress in healthcare, Joaquin is leading Johnson & Johnson to harness data science and intelligent automation for insight 
                //         generation so that teams work as a united front, with expertise and purpose, to solve the world’s toughest health challenges.
                //     </Typography>
                // </Stack>
                // : null
                <CreatorProfileGeneral profile={profile} />
            }
            id='general-profile-tab'
            value='0'
        />    
    );
}

export default observer(ProfileGeneral);