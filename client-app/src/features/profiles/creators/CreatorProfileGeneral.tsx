import { Edit, ExpandMore, FormatAlignLeft } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, IconButton, ToggleButton, Divider } from "@mui/material";
import CreatorProfileContribution from "./CreatorProfileContribution";
import theme from "../../../app/theme";
import { Profile } from "../../../app/models/profile";
import { useState, SyntheticEvent } from "react";

interface Props {
    profile: Profile;
}

function CreatorProfileGeneral({ profile }: Props) {
    const [expanded, setExpanded] = useState<string | false>("panel1");
  
    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMore sx={{color: theme.palette.primary.light}} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{backgroundColor: 'rgba(255, 255, 255, .05)', borderBottom:'1px solid lightgrey'}}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Collaborations
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>List of past collaborations.</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{border: '1px solid lightgrey', m:2, boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', borderRadius:1, background: '#EEE'}}>
                    <ToggleButton 
                        value="left"
                        size="small"
                        aria-label="left aligned"
                        aria-details='editor-tiptap'
                        sx={{height:25,width:25,color:"black",mb:1,mt:1}}
                    >
                        <Edit sx={{height:20,width:20}} />
                    </ToggleButton>
                    <CreatorProfileContribution currentProfileUserName={profile.userName!} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Past Experiences</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        List of past experiences as a content creator.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                    varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                    laoreet.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Stand Out
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Short description about why this content creator stands out.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default CreatorProfileGeneral;