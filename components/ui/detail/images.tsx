import { ImageListItem } from "@mui/material";

function Images({item}:any) {
    return (  <><ImageListItem cols={1} rows={1} >
        <img
            src={`${item}?w=248&fit=crop&auto=format`}
            srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item}
        />
    </ImageListItem></>);
}
export default Images;