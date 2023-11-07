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
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    padding: theme.spacing(2),
                    fontSize: 16
                }} 
                elevation={2}
            >
                {props.content ?? null}
            </Paper> 
        </>
    );
}

export default CreatorProfileSurface;