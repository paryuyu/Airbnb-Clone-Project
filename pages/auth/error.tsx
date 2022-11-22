import mongoose from "mongoose";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SignUp } from "../../components/ui/signup/signup-form";
export default function AuthError() {
    const router = useRouter();
    console.log(router.query, "router.query")
    let error = router.query.error as string;
    let email = router.query.email as string;

    let firstname = router.query.firstname as string;
    let lastname = router.query.lastname as string;
    let provider = router.query.provider as string;
    let providerAccountId = router.query.providerAccountId as string;

    if (error === "Duplicated") {
        return (<SignUp email={email} firstname={firstname} lastname={lastname} provider={provider} />)
    }

}


export const getServerSideProps: GetServerSideProps = async (props) => {
    console.log(props.query);

    let uri = "mongodb+srv://mernyuyu:wkdrnahr777@cluster0.qeg74yn.mongodb.net/?retryWrites=true&w=majority"
    await mongoose.connect(uri, { dbName: `airbnbClone` })

    return {
        props: {
            error: props.query.error
        }
    }
}