import {NavLink} from 'react-router-dom'
import {Button, Col} from 'react-bootstrap'
import style from '../ButtonCss/Button.module.css'

export default function ButtonLogin(props){

    return (
            <Col>
                <NavLink to={'/login'}>
                    {
                        props.isDisabled ? (
                            <Button 
                                disabled={props.isDisabled}
                                className={`
                                    ${style.bgLoginButton} 
                                    ${style.bgGreen} ${style.button} 
                                    border-0 me-5 ${props.className}`}>
                                Offline
                            </Button>
                        ) : (
                            <Button 
                                className={`
                                    ${style.bgLoginButton} 
                                    ${style.bgGreen} ${style.button} 
                                    border-0 me-5 ${props.className}`}
                                    onClick={props.onClick}>
                                {props.user ? 'Wyloguj się ('+props.user+')' : 'Zaloguj się'}
                            </Button>
                        )
                    }

                </NavLink>    
            </Col>
    )
}