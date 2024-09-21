import React from "react"
import Header from "../Headers/Header/Header"
import MainNavigation from "../Navigations/MainNavigation/MainNavigation"
import Container from '../Container/Container'
import Footer from "../Footers/Footer/Footer"
import Message from "../Message/Message"

export default function Layout(props) {
    return (
        <React.Fragment>
            <header>
                <Container >
                    <Header />
                    <MainNavigation />
                </Container>
            </header>
            <Message />
            <main>
                {props.main}
            </main>
            <footer>
                <Footer />
            </footer>
        </React.Fragment>
    )
}