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
import { CategoryCtx } from "../../context/category-context";
import HomeIcon from '@mui/icons-material/Home';
export default function Nav() {
    const [value, setValue] = React.useState(0);
    const ctx = React.useContext(CategoryCtx);

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
            <Tab label="??????" icon={<HomeIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('all')}}/>
            <Tab label="?????????" icon={<PoolIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????????')}}/>
            <Tab label="????????????" icon={< HotTubIcon fontSize="medium" />} iconPosition={"top"}  onClick={()=>{ctx.setCategory('????????????')}}/>
            <Tab label="?????????" icon={<YardIcon fontSize="medium" />} iconPosition={"top"}  onClick={()=>{ctx.setCategory('?????????')}}/>
            <Tab label="????????? ??????" icon={<OutdoorGrillIcon fontSize="medium" />} iconPosition={"top"}  onClick={()=>{ctx.setCategory('????????? ??????')}}/>
            <Tab label="?????? ????????????" icon={<DeckIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????? ????????????')}}/>
            <Tab label="??????" icon={<LocalFireDepartmentIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('??????')}}/>
            <Tab label="?????????" icon={<RiBilliardsFill size={25} />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????????')}}/>

            <Tab label="?????? ?????????" icon={<FireplaceIcon fontSize="medium" />} iconPosition={"top"}  onClick={()=>{ctx.setCategory('?????? ?????????')}}/>
            <Tab label="?????????" icon={<PianoIcon fontSize="medium" />} iconPosition={"top"}  onClick={()=>{ctx.setCategory('?????????')}}/>
            <Tab label="????????????" icon={<SportsTennisIcon fontSize="medium" />} iconPosition={"top"}  onClick={()=>{ctx.setCategory('????????????')}}/>
            <Tab label="????????? ??????" icon={<KitesurfingIcon fontSize="medium" />} iconPosition={"top"}onClick={()=>{ctx.setCategory('????????? ??????')}} />
            <Tab label="?????? ????????????" icon={<DownhillSkiingIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('????????? ??? ?????? ?????? ??????')}}/>
            <Tab label="?????? ????????????" icon={<ShowerIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????? ?????? ??????')}}/>

            <Tab label="?????????" icon={<AiFillAlert size={25} />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????????')}}/>
            <Tab label="????????????" icon={<MedicalServicesIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('????????????')}}/>
            <Tab label="?????????" icon={<FireExtinguisherIcon fontSize="medium" />} iconPosition={"top"}onClick={()=>{ctx.setCategory('?????????')}} />
            <Tab label="?????????" icon={<DoorSlidingIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????????')}}/>
            <Tab label="????????????" icon={<WifiIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('???????????????')}}/>
            <Tab label="TV" icon={<TvIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('TV')}} />
            <Tab label="?????????" icon={<LocalLaundryServiceIcon fontSize="medium" />} iconPosition={"top"}  onClick={()=>{ctx.setCategory('?????????')}}/>
            <Tab label="?????? ??????" icon={<LocalParkingIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????? ??????')}}/>
            <Tab label="?????? ??????" icon={<LocalParkingIcon fontSize="medium" />} iconPosition={"top"}onClick={()=>{ctx.setCategory('?????? ??????')}} />
            <Tab label="?????????" icon={<AcUnitIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????????')}} />
            <Tab label="????????????" icon={<WorkOutlineIcon fontSize="medium" />} iconPosition={"top"} onClick={()=>{ctx.setCategory('?????? ?????? ??????')}} />
        </Tabs>
        <Divider/>
    </Box>);
}
