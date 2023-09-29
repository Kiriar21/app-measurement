import {Button} from 'react-bootstrap'
import style from '../ButtonCss/Button.module.css'
export default function ButtonForm(props){
    return (
        <Button
                className={`${ props.colorBtn === 'red' ? style.bgRed : style.bgGreen}
                ${props.className} 
                shadow-none border-0 ${style.button} my-2`}
                onClick={props.onClick}>
            {props.buttonTitle}
            {props.children}
        </Button>
    )
}