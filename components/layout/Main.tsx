import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { AccomodationData } from "../../lib/model/accomodation";
import { useRouter } from "next/router";
import MainCard from "../ui/mainCard/mainCard";

export default function MainPage() {
  const [mainData, setMainData] = useState<AccomodationData[] | null>(null);
  const router = useRouter();

  async function MainReq() {
    let res = await fetch('/api/main/find?publish=true');
    let json = await res.json();
    setMainData(json.data)
  };
  useEffect(() => {
    MainReq()
  }, [])


  return (<>
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, flexWrap: 'wrap', pl: 2, mt: 1.5 }}>

    {mainData && mainData.map((one,index) => <MainCard item={one} key={index}/>)}

    </Box>
  </>);
}


