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
                profile.isContentCreator ? <CreatorProfileGeneral profile={profile} /> : null
            }
            id='general-profile-tab'
            value='0'
        />    
    );
}

export default observer(ProfileGeneral);