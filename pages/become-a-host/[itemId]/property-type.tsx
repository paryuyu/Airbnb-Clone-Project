import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { AccomodationData } from "../../../lib/model/accomodation";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Types } from "../../../lib/model/dummy";



export default function Property() {

    const router = useRouter();
    const { itemId } = router.query;

    const [propertyTypeData, setPropertyTypeData] = React.useState<Types[]>();

    const [propertyChoose, setPropertyChoose] = React.useState<AccomodationData>();
    //경로를 그냥 끌고 들어오면 ???3


    React.useEffect(() => {
       
        if (itemId) {

            !async function () {
                let a = await fetch("/api/accomodation/roomtypefind", {
                    method: "post",
                    body: JSON.stringify({ itemId: itemId }),
                    headers: { "Content-type": "application/json" }
                });
            
                let rstdata = await a.json();
                if(rstdata !== null && rstdata.data){
                    setPropertyTypeData(rstdata.data.types)
                }
            }();
           
        }
    }, [itemId])




    async function PropertyUpdate(propertyType : string){
        let update = await fetch("/api/accomodation/update", {
            method: "post",
            body: JSON.stringify({ itemId: itemId, propertyType: propertyType }),
            headers: { "Content-type": "application/json" }
        })

        let finalRst = await update.json();
        setPropertyChoose(finalRst);
        if(finalRst){
            router.push("/become-a-host/" + itemId + "/privacy-type")
        }
    }

    const handleClick :React.MouseEventHandler<HTMLDivElement> = (evt) => {
        let propertyType = evt.currentTarget.innerText as string;
        //바디값은 잘 들어감 -> 업데이트 다시 확인하자.
        if(itemId){
            PropertyUpdate(propertyType)
        }
    }


    const BackHandle = ()=>{
        //데이터 날려주기.
        fetch("/api/accomodation/room-delete?id="+itemId)
        .then(rc=>rc.json)
        .then(rst=>console.log(rst))

        router.push("/become-a-host/property-type-group")
    }

    return (<Grid component={"main"} container  >

        <Grid item sx={{ display: "flex", flex: 1, bgcolor: "black", color: "white", height: '100vh', alignItems: "center", justifyContent: "center" }}
        >
            <Typography component="h1" variant="h5" textAlign={"center"}>
                다음 중 숙소를 가장 잘 설명하는 문구는 무엇인가요?
            </Typography>
        </Grid>

        <Grid item sx={{ display: "flex", flex: 1, flexDirection: "column", height: '100vh', pr: 10, pl: 10, justifyContent: "center" }}>
        <Button>나가기</Button>
            {propertyTypeData && propertyTypeData.map((one,index) => {
                return (<Box key={index} border={'3px solid #d0d0d0'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={handleClick} >
                    <Box key={index}  sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Box key={index}  sx={{ display: "flex", alignItems: "center" }}>
                            <Typography  key={index}  fontSize={15}>{one.property}</Typography>
                        </Box>
                        <KeyboardArrowRightIcon key={index} 
                        />
                    </Box>
                </Box>)
            })}
            <Button variant="outlined" sx={{width:10, mt:5}} onClick={BackHandle}>뒤로</Button>
        </Grid>
    </Grid>);
}


