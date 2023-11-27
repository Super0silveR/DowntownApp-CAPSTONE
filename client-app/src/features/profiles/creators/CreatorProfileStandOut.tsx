import RichTextEditor from "../../../app/common/components/RichTextEditor";
import { Profile } from "../../../app/models/profile";

interface Props {
  currentProfileUserName: string;
  profile: Profile;
}

const CreatorProfileStandOut = (props: Props) => {
  return (
    <RichTextEditor currentProfileUserName={props.currentProfileUserName} content={props.profile.creatorProfile?.standOut} section='stand-out' />
  );
}

export default CreatorProfileStandOut;