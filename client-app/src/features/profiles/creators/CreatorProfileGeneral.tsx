import { Edit, ExpandMore, FormatAlignLeft } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, IconButton, ToggleButton, Divider } from "@mui/material";
import CreatorProfileContribution from "./CreatorProfileContribution";
import theme from "../../../app/theme";
import { Profile } from "../../../app/models/profile";
import { useState, SyntheticEvent } from "react";
import AccordionHeader from "../../../app/common/components/AccordionHeader";
import AccordionContent from "../../../app/common/components/AccordionContent";

interface Props {
    profile: Profile;
}

function CreatorProfileGeneral({ profile }: Props) {
    const [expanded, setExpanded] = useState<string | false>("collaborations");
  
    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Accordion expanded={expanded === 'collaborations'} onChange={handleChange('collaborations')}>
                <AccordionHeader 
                    name="collaborations"
                    title="Collaborations"
                    description="Detailed Collaborations."
                />
                <AccordionContent 
                    child={<CreatorProfileContribution currentProfileUserName={profile.userName!} />}
                />
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionHeader 
                    name="past-experiences"
                    title="Past Experiences"
                    description="Detailed Past Experiences."
                />
                <AccordionContent 
                    child={<CreatorProfileContribution currentProfileUserName={profile.userName!} />}
                />
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionHeader 
                    name='stand-out'
                    title='Stand Out'
                    description='Detailed Stand Out Section.'
                />
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