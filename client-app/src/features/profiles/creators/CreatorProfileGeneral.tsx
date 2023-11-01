import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, ListItem, Card, Button, List } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CreatorProfileContributions from "./CreatorProfileContribution";
import CreatorProfileContribution from "./CreatorProfileContribution";

interface CreatorCollaborations {
    name: string;
    description: string;
}

function CreatorProfileGeneral() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [collaborations, setCollabs] = useState<CreatorCollaborations[]>([]);

    useEffect(() => {
        setCollabs([
            {
                name: 'collab 1',
                description: 'collab 1 descrition'
            }
        ]);
    }, [setCollabs])
  
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleAddContribution = () => (event: React.SyntheticEvent) => {
        const parent = ReactDOM.findDOMNode(event.currentTarget)?.parentElement;
        setCollabs([
            ...collaborations, 
            {
                name: "collab 2",
                description: "collab 2 description"
            }
        ])
        console.log(parent);
    }

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{backgroundColor: 'rgba(255, 255, 255, .05)'}}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Collaborations
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>List of past collaborations.</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Button onClick={handleAddContribution()} sx={{float:'right'}}>Add Contribution</Button>
                    <List>
                        {collaborations.map((collab, i) => (
                            <CreatorProfileContribution key={i} collab={collab} />
                        ))}
                    </List>
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