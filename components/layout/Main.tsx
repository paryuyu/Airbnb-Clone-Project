import { Backdrop, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState , useContext} from "react";
import { AccomodationData } from "../../lib/model/accomodation";
import { useRouter } from "next/router";
import MainCard from "../ui/mainCard/mainCard";
import Head from "next/head";
import { CategoryCtx } from "../../context/category-context";
import { BackDropContext } from "../../pages/_app";

export default function MainPage() {
  const [mainData, setMainData] = useState<AccomodationData[]>([]);
  const router = useRouter();
  const ctx= useContext(CategoryCtx);
  const backCtx =useContext(BackDropContext)
  async function MainReq() {

    let res = await fetch('/api/main/find?publish=true&category='+ctx.category);
    let json = await res.json();
    setMainData(json.data)
    console.log(json)
    if(json.result){
      backCtx.setBackDrop(false)
    } 
  };

  useEffect(() => {
    backCtx.setBackDrop(true)
    MainReq()
  }, [ctx.category])


  return (<>
  <Head>
    <title>메인페이지</title>
  </Head>
{mainData && mainData.length>0 ?

    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, flexWrap: 'wrap', justifyContent:'center',  pl: 2, mt:2}}>

    { mainData.map((one,index) => <MainCard item={one} key={index}/>)}

    </Box>:<Typography>해당 카테고리에 존재하는 데이터가 없습니다.</Typography>

}
  </>);
}


