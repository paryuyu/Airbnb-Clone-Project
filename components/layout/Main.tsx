import { useEffect, useState, useContext } from "react";
import Head from "next/head";

import {  Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";

import  { AccomodationData } from "../../lib/model/accomodation";
import MainCard from "../ui/mainCard/mainCard";

import { CategoryCtx } from "../../context/category-context";


export default function MainPage() {

  const [mainData, setMainData] = useState<AccomodationData[]>([]);
  const [loading, setLoading] = useState(false);
  const ctx = useContext(CategoryCtx);


  useEffect(() => {
    setLoading(true);
    !async function() {
    
      let res = await fetch('/api/main/find?publish=true&category=' + ctx.category);
      let json = await res.json();
      setMainData(json.data)
      if(json){
        setLoading(false)
      }else{
        setLoading(true)
      }
    }();

console.log(loading)
  }, [ctx.category])

  return (<>
    <Head>
      <title>메인페이지</title>
    </Head>
    { mainData.length > 0 &&
      <Box sx={mainPage}>
        {mainData.map((one, index) => <MainCard item={one} key={index} />)}
      </Box> }

    { loading ?
      <Box sx={mainPage}>
        <Skeleton variant="rectangular" width={270} height={300} sx={skeletonStyle} /> 
        <Skeleton variant="rectangular" width={270} height={300} sx={skeletonStyle} /> 
        <Skeleton variant="rectangular" width={270} height={300} sx={skeletonStyle} /> 
        <Skeleton variant="rectangular" width={270} height={300} sx={skeletonStyle} /> 
      </Box>
      :
      mainData.length === 0 &&
      <Box sx={mainPage}>
      <Typography>해당 카테고리와 일치하는 데이터가 없습니다.</Typography>
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
  height:'78vh'
}