// import { useState } from 'react'
import {NavLink} from 'react-router-dom'
import {Button, Col} from 'react-bootstrap'
import style from '../ButtonCss/Button.module.css'

export default function ButtonLogin(props){
    //Sprawdzanie czy jest zalogowany - stare globalny powinien byc, bo wszędzie będzie ta informacja potrzebna.
    // const [isDisabled, setIsDisabled] = useState(true)
    return (
            <Col>
                <NavLink to='/login'>
                    <Button 
                        disabled={props.isDisabled}
                        className={`${style.bgLoginButton} ${style.bgGreen} ${style.button} border-0 me-5 ${props.className}`}
                    >
                        {props.buttonTitle}
                    </Button>
                </NavLink>
            </Col>
    )
}