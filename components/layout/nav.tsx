import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useState } from "react";
import CabinIcon from '@mui/icons-material/Cabin';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
export default function Nav() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (<Box>
        <Tabs
            centered
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable"
            textColor="inherit"
            indicatorColor="secondary"
        >
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Beach" icon={<BeachAccessIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
            <Tab label="Item One" icon={<CabinIcon />} iconPosition={"start"} />
        </Tabs>
    </Box>);
}
