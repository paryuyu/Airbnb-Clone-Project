import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { AccomodationData } from "../../lib/model/accomodation";
import MainCard from "../ui/main_card/mainCard";

export default function MainPage() {
  const [mainData,setMainData] = useState<AccomodationData[]|null>(null);

  async function MainReq(){
    let res= await fetch('/api/main/find');
    let json = await res.json();
    setMainData(json.data)
};
useEffect(()=>{
  MainReq()
},[])



  return ( <>
    {mainData !== null&& mainData.map((one)=>{
    <MainCard item={one}/>
    })}
  
  
  </> );
}


