import { Accordion } from "@mui/material";
import CreatorProfileContribution from "./CreatorProfileContribution";
import { Profile } from "../../../app/models/profile";
import { SyntheticEvent, useState } from "react";
import AccordionHeader from "../../../app/common/components/AccordionHeader";
import AccordionContent from "../../../app/common/components/AccordionContent";
import CreatorProfilePastExperience from "./CreatorProfilePastExperience";
import CreatorProfileStandOut from "./CreatorProfileStandOut";

interface Props {
    profile: Profile;
}

function CreatorProfileGeneral({ profile }: Props) {
    const [expanded, setExpanded] = useState<string | false>();
  
    const handleChange = (panel: string) => (_e: SyntheticEvent, isExpanded: boolean) => {
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
                    child={<CreatorProfileContribution currentProfileUserName={profile.userName!} profile={profile} />}
                />
            </Accordion>
            <Accordion expanded={expanded === 'past-experiences'} onChange={handleChange('past-experiences')}>
                <AccordionHeader 
                    name="past-experiences"
                    title="Past Experiences"
                    description="Detailed Past Experiences."
                />
                <AccordionContent 
                    child={<CreatorProfilePastExperience currentProfileUserName={profile.userName!} profile={profile} />}
                />
            </Accordion>
            <Accordion expanded={expanded === 'stand-out'} onChange={handleChange('stand-out')}>
                <AccordionHeader 
                    name='stand-out'
                    title='Stand Out'
                    description='Detailed Stand Out Section.'
                />
                <AccordionContent 
                    child={<CreatorProfileStandOut currentProfileUserName={profile.userName!} profile={profile} />}
                />
            </Accordion>
        </>
    );
}

export default CreatorProfileGeneral;