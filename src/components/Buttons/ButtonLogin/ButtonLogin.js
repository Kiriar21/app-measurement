import {NavLink} from 'react-router-dom'
import {Button, Col} from 'react-bootstrap'
import style from '../ButtonCss/Button.module.css'
import { useState } from 'react'

export default function ButtonLogin(props){
    const [login, setLogin] = useState(false)
    return (
            <Col>
                <NavLink to={'/login'}>
                    <Button 
                        disabled={props.isDisabled}
                        className={`${style.bgLoginButton} ${style.bgGreen} ${style.button} border-0 me-5 ${props.className}`}
                        onClick={e => setLogin(!login)}
                    >
                        {props.isDisabled ? 'Offline' : ( login === false ? 'Zaloguj się' : 'Wyloguj się') }
                    </Button>
                </NavLink>
            </Col>
    )
}