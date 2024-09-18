// import {NavLink} from 'react-router-dom'
import {Button, Col} from 'react-bootstrap'
import style from '../ButtonCss/Button.module.css'

export default function ButtonLogin(props){

    return (
            <Col>
                {/* <NavLink to={'/'}> */}
                    {
                        /* logika logowania
                        { props.isDisabled ? (
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
                        ) } - pod spodem logika online - offline*/
                        <Button 
                            className={`
                                ${style.bgLoginButton} 
                                ${props.btnColor === 'red' ? style.bgRed : style.bgGreen} ${style.button} 
                                border-0 me-5 ${props.className}`}
                            disabled={props.isDisabled}
                        >
                            {props.title}
                        </Button>
                    }

                {/* </NavLink>     */}
            </Col>
    )
}