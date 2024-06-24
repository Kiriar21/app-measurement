import {useState} from 'react'
import {Navbar} from "react-bootstrap"
import {List, XLg} from "react-bootstrap-icons"
import style from './ToggleButton.module.css'

export default function ToggleButton(props){
    const [active, setActive] = useState(false);
    return (
        <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className={`btn border-0 shadow-none`} 
            onClick={() => { setActive(!active);}}
        >
            <span className={`${style.label} p-2`}>
                {active ? 'Zamknij ' : props.title }
                <List className="ms-3 pb-1" hidden={active} size={40}/>
                <XLg className="ms-3 pb-1" hidden={!active} size={40}/>
            </span>
        </Navbar.Toggle>   
    )
}