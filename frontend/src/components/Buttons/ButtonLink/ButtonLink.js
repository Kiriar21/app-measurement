import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import style from '../ButtonCss/Button.module.css'
import { BoxArrowUpRight } from 'react-bootstrap-icons'

export default function ButtonLink(props){
    return(
        <Link to={props.pathLink} 
            target=
                {props.typeTarget !== undefined && props.typeTarget === "_blank" 
                ? props.typeTarget 
                : '_self'}>
            <Button 
                className={`${style.bgGreen} border-0 ${props.className} ${style.button}`} 
                onClick={props.onClick}>
                    {props.buttonTitle}
                    {props.ikon && <BoxArrowUpRight className=' ms-2 mb-2' size={20}/>}
            </Button>
        </Link>
    )
}