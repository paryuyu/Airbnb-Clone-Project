import { Box } from "@mui/system";
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';





function RoomList({ item }: any) {
    //여기서 Pulish가 있는데 트루인 애들은 빼주고 없는 애들만 뿌려주기.
    // console.log(item.step, '??!?@?!@?!@?')
    const router = useRouter();




    const handleclick = () => {
        switch (item.step) {
            case 1:
                router.push("/become-a-host/" + item._id + "/property-type");
                break;
            case 2:
                router.push("/become-a-host/" + item._id + "/privacy-type");
                break;
            case 3:
                router.push("/become-a-host/" + item._id + "/location");
                break;
            case 4:
                router.push("/become-a-host/" + item._id + "/floor-plan");
                break;
            case 5:
                router.push("/become-a-host/" + item._id + "/amenities");
                break;
            case 6:
                router.push("/become-a-host/" + item._id + "/photos");
                break;
            case 7:
                router.push("/become-a-host/" + item._id + "/title");
                break;
            case 8:
                router.push("/become-a-host/" + item._id + "/description");
                break;
            case 9:
                router.push("/become-a-host/" + item._id + "/price");
                break;
            case 10:
                router.push("/become-a-host/" + item._id + "/lastpage");
                break;
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