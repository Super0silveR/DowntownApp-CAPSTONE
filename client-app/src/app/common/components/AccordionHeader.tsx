import { ExpandMore } from "@mui/icons-material";
import { Typography } from "@mui/material";
import theme from "../../theme";
import { AccordionSummary } from "@mui/material";

interface Props {
    name: string;
    title: string;
    description: string;
}

const AccordionHeader = ({ name, title, description }: Props) => {
    return (
        <AccordionSummary
            expandIcon={<ExpandMore sx={{color: theme.palette.primary.light}} />}
            aria-controls={name + 'bh-content'}
            id={name + 'bh-header'}
            sx={{backgroundColor: 'rgba(255, 255, 255, .05)', borderBottom:'1px solid lightgrey'}}
        >
            <Typography sx={{ width: '55%', flexShrink: 0 }}>
                {title}
            </Typography>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>{description}</Typography>
        </AccordionSummary>
    );
}

export default AccordionHeader;