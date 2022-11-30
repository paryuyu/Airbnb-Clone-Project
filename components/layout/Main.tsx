import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState , useContext} from "react";
import { AccomodationData } from "../../lib/model/accomodation";
import { useRouter } from "next/router";
import MainCard from "../ui/mainCard/mainCard";
import Head from "next/head";
import { CategoryCtx } from "../../context/category-context";

export default function MainPage() {
  const [mainData, setMainData] = useState<AccomodationData[] | null>(null);
  const router = useRouter();
  const ctx= useContext(CategoryCtx);

  async function MainReq() {
    let res = await fetch('/api/main/find?publish=true&category='+ctx.category);
    let json = await res.json();
    setMainData(json.data)
  };

  useEffect(() => {
    MainReq()
  }, [ctx])


  return (<>
  <Head>
    <title>메인페이지</title>
  </Head>
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, flexWrap: 'wrap', justifyContent:'center',  pl: 2, mt:2}}>

    {mainData && mainData.map((one,index) => <MainCard item={one} key={index}/>)}

    </Box>
  </>);
}


