import { IconButton, ListItem, Stack } from "@mui/material";
import CreatorProfileSurface from "./CreatorProfileSurface";
import { UpdateOutlined } from "@mui/icons-material";

interface Props {
    collab: {name:string,description:string}
}

function CreatorProfileContribution({ collab }: Props) {
    return (
        <>
            <CreatorProfileSurface 
                content={
                    <ListItem
                        secondaryAction={
                            <Stack direction='row' spacing={1}>
                                <IconButton aria-label='Information'>
                                    <UpdateOutlined fontSize="small" />
                                </IconButton>
                            </Stack>
                        }
                    >
                        {collab.name}
                    </ListItem>
                }
            />
        </>
    );
}

export default CreatorProfileContribution;