import RichTextEditor from "../../../app/common/components/RichTextEditor";

interface Props {
  currentProfileUserName: string;
}

const CreatorProfileContribution = (props: Props) => {
  return (
    <RichTextEditor currentProfileUserName={props.currentProfileUserName} content={null} />
  );
}

export default CreatorProfileContribution;