import {Button} from 'react-bootstrap'
import style from '../ButtonCss/Button.module.css'
import LoadingIcon from '../../UI/loadingIcon'
export default function ButtonForm(props){
    return (
        <Button
                className={`${ props.colorBtn === 'red' ? style.bgRed : style.bgGreen}
                ${props.className} 
                shadow-none border-0 ${style.button} my-2`}
                onClick={props.onClick} disabled={props.disabled}>
                {props.onLoading ? <LoadingIcon /> : props.buttonTitle }
            {props.children}
        </Button>
    )
}