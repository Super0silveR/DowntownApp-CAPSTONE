import { useCurrentEditor, EditorProvider } from '@tiptap/react';
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, Save, FormatBold, FormatColorFill, FormatItalic } from '@mui/icons-material';
import { Button, Divider, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import EditorMenuBar from './EditorMenuBar';

/**
 * Styling for the button group of the menu bar.
 */
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.2),
    border: `1px solid ${theme.palette.secondary.contrastText}`,
    '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.secondary.light,
    }
  },
}));

/**
 * Component representing the editorial abilities of the editor.
 * @returns 
 */
 export const EditorMenu = () => {

  const { editor } = useCurrentEditor();

  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(() => ['italic']);
  
  const handleFormat = (_event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  const handleAlignment = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  if (!editor) return null;

  return (
    <div id="editor-menu-div">
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
            size="small"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
          <ToggleButton 
            value="left" 
            aria-label="left aligned"
            aria-details='editor-tiptap'
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
              <FormatAlignLeft />
          </ToggleButton>
          <ToggleButton 
            value="center" 
            aria-label="centered"
            aria-details='editor-tiptap'
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <FormatAlignCenter />
          </ToggleButton>
          <ToggleButton 
            value="right" 
            aria-label="right aligned"
            aria-details='editor-tiptap'
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <FormatAlignRight />
          </ToggleButton>
          <ToggleButton 
            value="justify" 
            aria-label="justified"
            aria-details='editor-tiptap'
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
            disabled
          >
          <FormatAlignJustify />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton 
            value="bold" 
            aria-label="bold"
            aria-details='editor-tiptap'
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FormatBold />
          </ToggleButton>
          <ToggleButton 
            value="italic" 
            aria-label="italic"
            aria-details='editor-tiptap'
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FormatItalic />
          </ToggleButton>
          <ToggleButton value="color" aria-label="color"
            aria-details='editor-tiptap'>
            <FormatColorFill />
            <ArrowDropDownIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <Button onClick={() => editor.chain().focus().unsetTextAlign().run()}>unsetTextAlign</Button>
        <Button onClick={() => console.log(editor.getJSON())}><Save/></Button>
      </Paper>
    </div>
  );
}

// define your extension array
const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
  Paragraph
]

const content = `
  <h2>
    Hi there,
  </h2>
  <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
  <p>
    Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
  display: none;
  }</code></pre>
  <p>
    I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <blockquote>
    Wow, that’s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>
`

const EditorJSONPreview = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <pre>
      {JSON.stringify(editor.getJSON(), null, 2)}
    </pre>
  )
}

const RichTextEditor = () => {

  return (
    <>
      <EditorProvider slotBefore={<EditorMenuBar />} extensions={extensions} content={content} children={undefined} />
      <EditorJSONPreview />
    </>
  )
}

export default RichTextEditor;