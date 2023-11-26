import { Edit } from "@mui/icons-material";
import { Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useCurrentEditor } from "@tiptap/react"
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import { LoadingButton } from "@mui/lab";

interface Props {
    section: string;
}

const EditorMenuBar = (props: Props) => {
    const { editor } = useCurrentEditor();

    const [editMode, setEditMode] = useState(false);

    const { profileStore: { updateCreatorFields, loading, profile } } = useStore();

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    useEffect(() => {
        editor?.setEditable(editMode);
    }, [editMode, editor])
  
    if (!editor) {
      return null
    }

    const handleSaveEditor = () => {
        switch (props.section) {
            case 'contributions': {
                updateCreatorFields({collaborations: editor?.getHTML(), pastExperiences: profile?.creatorProfile?.pastExperiences, standOut: profile?.creatorProfile?.standOut})
                    .then(() => setEditMode(false))
                    .catch((e) => console.log(e));
                break;
            }
            case 'past-experiences': {
                updateCreatorFields({pastExperiences: editor?.getHTML(), collaborations: profile?.creatorProfile?.collaborations, standOut: profile?.creatorProfile?.standOut})
                    .then(() => setEditMode(false))
                    .catch((e) => console.log(e));
                break;
            }
            case 'stand-out': {
                updateCreatorFields({standOut: editor?.getHTML(), collaborations: profile?.creatorProfile?.collaborations, pastExperiences: profile?.creatorProfile?.pastExperiences})
                    .then(() => setEditMode(false))
                    .catch((e) => console.log(e));
                break;
            }
        }
    }
  
    return (
        <>
            <Stack direction='row' justifyContent='space-between'>
                <ToggleButtonGroup>
                    <ToggleButton 
                        value="left"
                        size="small"
                        aria-label="left aligned"
                        aria-details='editor-tiptap'
                        sx={{height:25,width:25,color:"black",mb:1,mt:1}}
                        onClick={() => handleEditMode()}
                        className={editMode ? 'edit-mode-active' : ''}
                    >
                        <Edit sx={{height:20,width:20}} />
                    </ToggleButton>
                </ToggleButtonGroup>
                {editMode &&
                    <LoadingButton 
                        loading={loading}
                        color="success" 
                        variant="contained"
                        size="small"
                        sx={{height:25,width:25,color:"black",mb:1,mt:1}}
                        onClick={() => handleSaveEditor()}
                    >
                        <Typography fontFamily='monospace'>Save</Typography>
                    </LoadingButton>
                }
            </Stack>
            <div id='editor-menu-div' hidden={!editMode}>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    code
                </button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    clear marks
                </button>
                <button onClick={() => editor.chain().focus().clearNodes().run()}>
                    clear nodes
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    h1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    h2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    h3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    h4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    h5
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    h6
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    bullet list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    ordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    code block
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    blockquote
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    horizontal rule
                </button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                    hard break
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                    }
                >
                    undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                    }
                >
                    redo
                </button>
            </div>
        </>
    )

}

export default EditorMenuBar;