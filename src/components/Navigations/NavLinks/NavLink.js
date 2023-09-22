import { NavLink } from "react-router-dom";
import style from './NavLink.module.css'


export default function NavLinkModule(props){
    return(
        <NavLink to={`/${props.path}`}
            className={({ isActive }) => {
                return isActive ? `nav-link ${style.activeLink}` : `nav-link ${style.linkM}`;
            }}> {props.nameLink}
        </NavLink>
    )
}