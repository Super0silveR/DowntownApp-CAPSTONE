import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style';
import { Content, EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenuBar from './EditorMenuBar';
import { useStore } from '../../stores/store';
import { Box } from '@mui/material';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of our text <strong>editor</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a first contribution …
  </li>
  <li>
    … or a second one.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Edit and customize your own <i>contribution section</i>.
</p>
<blockquote>
  Wow, that’s amazing. Keep up the good work! 👏
  <br />
  — Downtown App Team.
</blockquote>
`;

interface Props {
  currentProfileUserName: string;
  content: Content | undefined | null;
  section: string;
}

export default (props: Props) => {

  const { userStore } = useStore();

  const isOwnProfile = userStore.user?.userName === props.currentProfileUserName;

  return (
    <Box>
      <EditorProvider 
          slotBefore={isOwnProfile && <EditorMenuBar section={props.section} />}
          extensions={extensions} 
          content={props.content ?? content} 
          children={null}
        />
    </Box>
  )
}