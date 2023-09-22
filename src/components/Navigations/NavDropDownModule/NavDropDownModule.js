import { Dropdown } from "react-bootstrap";
import style from './NavDropDownModule.module.css';
import styleLink from '../NavLinks/NavLink.module.css'

export default function NavDropDownModule(props){
    return(
        <Dropdown>
            <Dropdown.Toggle variant="link" className={`${styleLink.linkM} border-0`}>{props.title}</Dropdown.Toggle>
                <Dropdown.Menu className={`${style.navdropdown} me-3`}>
                    {props.children}
        </Dropdown.Menu>
      </Dropdown>
    )
}