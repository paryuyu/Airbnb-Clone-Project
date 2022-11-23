import { Box, Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import FireplaceIcon from '@mui/icons-material/Fireplace';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import PoolIcon from '@mui/icons-material/Pool';
import DeckIcon from '@mui/icons-material/Deck';
import HotTubIcon from '@mui/icons-material/HotTub';
import YardIcon from '@mui/icons-material/Yard';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { RiBilliardsFill } from 'react-icons/ri';
import { AiFillAlert } from 'react-icons/ai';
import PianoIcon from '@mui/icons-material/Piano';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import KitesurfingIcon from '@mui/icons-material/Kitesurfing';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import ShowerIcon from '@mui/icons-material/Shower';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import WifiIcon from '@mui/icons-material/Wifi';
import TvIcon from '@mui/icons-material/Tv';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export default function Nav() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (<Box>
        <Tabs
        variant="scrollable"
            value={value}
            onChange={handleChange}
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable"
            textColor="inherit"
            TabIndicatorProps={{style:{background:'black', padding:3 } }}
        >
            <Tab label="수영장" icon={<PoolIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="온수욕조" icon={< HotTubIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="파티오" icon={<YardIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="바비큐 그릴" icon={<OutdoorGrillIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="야외 식사공간" icon={<DeckIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="화로" icon={<LocalFireDepartmentIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="당구대" icon={<RiBilliardsFill size={25} />} iconPosition={"top"} />

            <Tab label="실내 벽난로" icon={<FireplaceIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="피아노" icon={<PianoIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="운동기구" icon={<SportsTennisIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="해변과 인접" icon={<KitesurfingIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="스키 출입가능" icon={<DownhillSkiingIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="야외 샤워시설" icon={<ShowerIcon fontSize="medium" />} iconPosition={"top"} />

            <Tab label="경보기" icon={<AiFillAlert size={25} />} iconPosition={"top"} />
            <Tab label="구급상자" icon={<MedicalServicesIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="소화기" icon={<FireExtinguisherIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="침실문" icon={<DoorSlidingIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="와이파이" icon={<WifiIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="TV" icon={<TvIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="세탁기" icon={<LocalLaundryServiceIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="무료 주차" icon={<LocalParkingIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="유료 주차" icon={<LocalParkingIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="에어컨" icon={<AcUnitIcon fontSize="medium" />} iconPosition={"top"} />
            <Tab label="업무공간" icon={<WorkOutlineIcon fontSize="medium" />} iconPosition={"top"} />
        </Tabs>
        <Divider/>
    </Box>);
}
