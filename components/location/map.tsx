import { Wrapper } from "@googlemaps/react-wrapper";
import { Box } from "@mui/system";
import React from 'react'
import { LocationCtx } from "../../context/location-context";

function MapComponents({ }) {
    const [lat, setLat] = React.useState(null)
    const [lng, setLng] = React.useState(null)
    const ctx = React.useContext(LocationCtx);
    const ref = React.useRef<HTMLElement>();


    React.useEffect(() => {
        !async function () {
            let lat, lng;
            if (!ctx?.what?.lat) {
                const result : {lat : number, lng : number}= await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        lat = pos.coords.latitude
                        lng = pos.coords.longitude
                        resolve({ lat, lng });
                    })
                });
                lat = result.lat;
                lng = result.lng;
            
            } else {

                lat = ctx?.what?.lat;
                lng = ctx?.what?.lng;
            }

            let map = new google.maps.Map(ref?.current!, {
                center: { lat: lat, lng: lng },
                zoom: 15
            })

            const image = "/icons/marker.png";

            const marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                icon: image,
            });

            map.addListener("center_changed", () => {

                setTimeout(() => {

                    const center = map.getCenter();

                    marker.setPosition({ lat: center?.lat()!, lng: center?.lng()! });
                    ctx?.setMapNew({ lat: center?.lat(), lng: center?.lng() });
                }, 100)
            });
        }();
    }, [])

    return (
        <Box ref={ref} sx={{ height: '50vh' , marginLeft:23 , marginRight:23,position:'relative',}}></Box>)
}




export const Maap = ({ }) => {
let key = process.env.GOOGLE_APP_KEY as string;
    return (
        <Wrapper apiKey={key}>
            <MapComponents />
        </Wrapper>
    )
}