import React from "react"
import Header from "../Headers/Header/Header"
import Footer from "../Footers/Footer/Footer"
import Message from "../Message/Message"

export default function Layout(props) {
    return (
        <React.Fragment>
            <header>
                <Header />
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