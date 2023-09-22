import {Container, Nav, Navbar} from "react-bootstrap"
import style from './NavbarMain.module.css'
import ToggleButton from "../ToggleButtons/ToggleButton"

export default function NavbarMain(props){
    return (
            <Navbar collapseOnSelect expand="lg" className={`${style.bg}`} style={{background:props.bgColor}}>
                <Container className={`${style.bg} d-flex justify-content-center`}>
                    <ToggleButton title={props.title} />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav activeKey={window.location.pathname} className={`${style.bg} ps-4`}>
                                {props.children}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}