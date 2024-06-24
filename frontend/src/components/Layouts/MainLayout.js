import React from "react"
import Header from "../Headers/Header/Header"
import Footer from "../Footers/Footer/Footer"

export default function Layout(props) {
    return (
        <React.Fragment>
            <header>
                <Header />
            </header>
            <main>
                {props.main}
            </main>
            <footer>
                <Footer />
            </footer>
        </React.Fragment>
    )
}