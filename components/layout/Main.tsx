import { Backdrop, Card, CardContent, CardMedia, CircularProgress, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useContext } from "react";
import accomodation, { AccomodationData } from "../../lib/model/accomodation";
import { useRouter } from "next/router";
import MainCard from "../ui/mainCard/mainCard";
import Head from "next/head";
import { CategoryCtx } from "../../context/category-context";
import { BackDropContext } from "../../pages/_app";
import dbConnect from "../../lib/db_connect";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function MainPage() {
  const [mainData, setMainData] = useState<AccomodationData[]>([]);
  const router = useRouter();
  const ctx = useContext(CategoryCtx);
  const backCtx = useContext(BackDropContext);


  async function MainReq() {
    let res = await fetch('/api/main/find?publish=true&category=' + ctx.category);
    let json = await res.json();
    setMainData(json.data)
  };

  useEffect(() => {
    MainReq()
  }, [ctx.category])
  console.log(mainData)

  return (<>
    <Head>
      <title>메인페이지</title>
    </Head>
    {mainData && mainData.length > 0 ?
      <Box sx={mainPage}>
        {mainData.map((one, index) => <MainCard item={one} key={index} />)}
      </Box> : <Box sx={mainPage}>
        
        <Skeleton variant="rectangular" width={270} height={300} sx={skeletonStyle} /> 
        <Skeleton variant="rectangular" width={270} height={300} sx={skeletonStyle} /> 
        <Skeleton variant="rectangular" width={270} height={300} sx={skeletonStyle} /> 
        <Skeleton variant="rectangular" width={270} height={300} sx={skeletonStyle} /> 
  
      </Box>

    }
  </>);
}

const skeletonStyle ={
  borderTopLeftRadius:5,
  borderTopRightRadius:5
}

const mainPage = {
  display: 'flex',
  flexDirection: 'row',
  gap: 1.5,
  flexWrap: 'wrap',
  justifyContent: 'center',
  pl: 2,
  mt: 2,
  height:'100vh'
}