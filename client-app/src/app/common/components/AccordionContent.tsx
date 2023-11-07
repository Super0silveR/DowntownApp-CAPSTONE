import { AccordionDetails, ToggleButton } from "@mui/material";
import { ReactNode, useState } from "react";

interface Props {
    child: ReactNode;
}

const AccordionContent = ({ child }: Props) => {

    return (
        <AccordionDetails sx={{border: '1px solid lightgrey', m:2, boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', borderRadius:1, background: '#EEE'}}>
            {child}
        </AccordionDetails>        
    );
}

export default AccordionContent;