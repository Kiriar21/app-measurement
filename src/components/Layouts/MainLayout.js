import React from "react"

export default function Layout(props) {
    return (
        <React.Fragment>
            <header>
                {props.header}
            </header>
            <main>
                {props.main}
            </main>
            <footer>
                {props.footer}
            </footer>
        </React.Fragment>
    )
}