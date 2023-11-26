import RichTextEditor from "../../../app/common/components/RichTextEditor";
import { Profile } from "../../../app/models/profile";

interface Props {
  currentProfileUserName: string;
  profile: Profile;
}

const CreatorProfileContribution = (props: Props) => {
  return (
    <RichTextEditor currentProfileUserName={props.currentProfileUserName} content={props.profile.creatorProfile?.collaborations} section='contributions' />
  );
}

export default CreatorProfileContribution;