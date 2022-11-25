import { useSession } from "next-auth/react";

export default function Stay() {
    const { data, status } = useSession()

    console.log(data)
    console.log(status) 

    return (<></>);
}