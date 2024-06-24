import {Button} from 'react-bootstrap'
import style from '../ButtonCss/Button.module.css'

export default function ButtonLogin(props){
    return (
        <Button 
            className={`${props.bgColor === 'red' ? style.bgRed : style.bgGreen} ${style.button} border-0 ${props.className}`}
            onClick={props.onClick}>
            {props.buttonTitle}
        </Button>
    )
}