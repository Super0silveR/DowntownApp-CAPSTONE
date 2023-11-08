import { Paper } from "@mui/material";
import theme from "../../../app/theme";

interface Props {
    content?: JSX.Element | string | null;
}

function CreatorProfileSurface(props : Props) {
    return (
        <>
            <Paper
                sx={{
                    fontFamily: 'monospace',
                    fontSize: 16,
                    background: 'rgba(238, 238, 238, 0.85)',
                    borderRadius: 0
                }}
                elevation={2}
            >
                {props.content ?? null}
            </Paper> 
        </>
    );
}

export default CreatorProfileSurface;