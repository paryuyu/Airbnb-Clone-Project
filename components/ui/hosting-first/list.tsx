import { Box } from "@mui/system";
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ConstructionOutlined } from "@mui/icons-material";
import { AccomodationData } from "../../../lib/model/accomodation";





function RoomList({ item }:any) {
    //여기서 Pulish가 있는데 트루인 애들은 빼주고 없는 애들만 뿌려주기.

    const router = useRouter();
    let arr = Object.keys(item);
    let first = arr.includes('groupType')
    let second = arr.includes('propertyType')
    let third = arr.includes("privacyType");
    let four = arr.includes("location");
    let five = arr.includes("floorPlan");
    let six = arr.includes("amenities");
    // let seven = rst.result.Photos.length > 0
    let eight = arr.includes("title"); //description
    // let  =rst.result.description.length > 0
    let ten = arr.includes("price");



    const handleclick = () => {
        if (first && !second && !third && !four && !five && !six && item.Photos.length == 0 && !eight && item.description.length == 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/property-type");
        } else if (first && second && !third && !four && !five && !six && item.Photos.length == 0 && !eight && item.description.length == 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/privacy-type");

        } else if (first && second && third && !four && !five && !six && item.Photos.length == 0 && !eight && item.description.length == 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/location");

        } else if (first && second && third && four && !five && !six && item.Photos.length == 0 && !eight && item.description.length == 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/floor-plan");

        } else if (first && second && third && four && five && !six && item.Photos.length == 0 && !eight && item.description.length == 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/amenities");
        } else if (first && second && third && four && five && six && item.Photos.length == 0 && !eight && item.description.length == 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/photos");
        } else if (first && second && third && four && five && six && item.Photos.length > 0 && !eight && item.description.length == 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/title");
        } else if (first && second && third && four && five && six && item.Photos.length > 0 && eight && item.description.length == 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/description");
        } else if (first && second && third && four && five && six && item.Photos.length > 0 && eight && item.description.length > 0 && !ten) {
            router.push("/become-a-host/" + item._id + "/price");
        } else if (first && second && third && four && five && six && item.Photos.length > 0 && eight && item.description.length > 0 && ten) {
            router.push("/become-a-host/" + item._id + "/lastpage");
        }
    }

    return (<>

        {!item.publish && 
        <Box border={'3px solid #d0d0d0'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={handleclick} >

            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HomeIcon sx={{ bgcolor: "#ddd", p: "2px", borderRadius: 2, mr: 2, fontSize: 30 }} /><Typography fontSize={13.5}>{item.groupType}</Typography>
                </Box>

                <KeyboardArrowRightIcon />
            </Box>

        </Box>

}



    </>);
}

export default RoomList;