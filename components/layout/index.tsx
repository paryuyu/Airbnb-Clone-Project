import { Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
import MainPage from "./Main";
import Nav from "./nav";

export default function Layout({ children }: { children: ReactNode }) {


    const {data, status} = useSession();
    return (
        <Container disableGutters={true} maxWidth={false}>

            <header>
                <Header />
            </header>
            
            <nav>
                <Nav />
            </nav>

            <main>
                <MainPage/>
            </main>

            <footer>
                <Footer />
            </footer>

        </Container>
    );
}



