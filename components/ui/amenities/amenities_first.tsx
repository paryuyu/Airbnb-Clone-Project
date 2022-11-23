import { safeGet } from "@firebase/util";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useContext } from 'react';
import { AmenityData } from "../../../lib/model/accomodation";
import AmenityOne from '../amenities/amenity-one'
import AmenityThree from "./amenity-three";
import AmenityTwo from "./amenity-two";
export default function AmenitiesFirst() {
    //업데이트

    let router = useRouter();
    let { itemId } = router.query;
    let [facilities, setFacitlities] = useState<string[]>([]) 
    let [sp,setsp]=useState<string[]>([]);
    let [safty,setSafty]=useState<string[]>([]);
    //type Handlefacility = {(val:string[])=>void}

    let handlefacility= (val:string)=>{
        if(facilities.includes(val)){
            setFacitlities(facilities.filter(one => val !== one))
        }else{
            setFacitlities([...facilities,val])
        }
    } 

    let handleSpecial = (val:string)=>{
        if(sp.includes(val)){
            setsp(sp.filter(one => val !== one))
        }else{
            setsp([...sp,val])
        }
    }


    let handleSafty = (val:string)=>{
        if(safty.includes(val)){
            setSafty(safty.filter(one=> one !== val))
        }else{
            setSafty([...safty,val])
        }
    }

    let amemity = {
        facilities: facilities,
        special: sp,
        safty: safty
    } as AmenityData

    async function AmenityUpdate() {


        let res = await fetch('/api/accomodation/amenity', {
            method: 'post',
            body: JSON.stringify({ itemId: itemId, ameinty: amemity }),
            headers: { 'Content-type': 'application/json' }
        })
        let json = await res.json();
        console.log(json, "update")
        if (json.result) {
            router.push('/become-a-host/' + itemId + '/photos')
        }

    }



    const NextHanldle = () => {
        AmenityUpdate()
    }


    const BackHandle = () => {
        router.push('/become-a-host/' + itemId + '/floor-plan')
    }


    let spArr = ['수영장', '온수욕조', '파티오', '바비큐 그릴', '야외 식사공간', '화로', '당구대', '실내 벽난로', '피아노', '운동기구', '해변과 인접', '스키로 탄 채로 출입 가능', '야외 샤워 시설'];

    let safArr = ['화재경보기', '구급상자', '소화기', '침실문', '일산화탄소 경보기']

    let facArr = ['무선인터넷', 'TV', '세탁기', '건물 내 무료 주차', '건물 내 유료 주차', '에어컨', '업무 전용 공간'];

    
    return (<Box sx={{ overflow: 'scroll' }}>

        <Typography sx={{ fontSize: 20, fontWeight: 'bold', mt: 3, mb: 1 }}>숙소 편의시설 정보를 추가하세요</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: '100', mt: 3, mb: 1 }}>여기에 추가하려는 편의시설이 보이지 않더라도 걱정하지 마세요! 숙소를 등록한 후에 편의시설을 추가할 수 있습니다.</Typography>

        <Box sx={{ ...outlineBox }}>
            {facArr.map((item) => {
                return (<> <AmenityOne fac={facilities} item={item} onFac={handlefacility}/></>)
            })}
        </Box>

        <Typography sx={{ fontSize: 20, fontWeight: 'bold', mt: 3, mb: 1 }}>특별히 내세울 만한 편의시설이 있나요?</Typography>
        <Box sx={{ ...outlineBox }}>

            {spArr.map((one) => {
                return (<>
                    <AmenityTwo item={one} sp={sp} onSp={handleSpecial}/>
                </>)
            })
            }

        </Box>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold', mt: 3, mb: 1 }}>다음과 같은 안전 관련 물품이 있나요?</Typography>
        <Box sx={{ ...outlineBox }}>
            {safArr.map((one) => {

                return (<>
                    <AmenityThree safty={safty} item={one} onSafty={handleSafty}/>
                </>)
            })}


        </Box>
        <Box sx={{ ...buttonBox }}>
            <Button variant="contained" sx={{ ...button }} onClick={BackHandle} >뒤로</Button>
            <Button variant="contained" sx={{ ...button }} onClick={NextHanldle} >다음</Button>
        </Box>

    </Box>);
}

const outlineBox = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    gap: 2
}


const amenityBox = {
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: 'calc((100% - 32px) / 3)',
    height: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
}

const hover = { 'border': '3px solid black' }

const text = {
    fontSize: 13,
    textAlign: 'center'

}

const buttonBox = {
    display: 'flex', justifyContent: 'space-between'

}

const button = {
    width: 10, mt: 5, mb: 5, bgcolor: 'black',
    '&:hover': { 'backgroundColor': '#333' }
}
