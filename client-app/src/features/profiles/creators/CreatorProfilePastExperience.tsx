import RichTextEditor from "../../../app/common/components/RichTextEditor";
import { Profile } from "../../../app/models/profile";

interface Props {
  currentProfileUserName: string;
  profile: Profile;
}

const CreatorProfilePastExperience = (props: Props) => {
  return (
    <RichTextEditor currentProfileUserName={props.currentProfileUserName} content={props.profile.creatorProfile?.pastExperiences} section='past-experiences' />
  );
}

export default CreatorProfilePastExperience;