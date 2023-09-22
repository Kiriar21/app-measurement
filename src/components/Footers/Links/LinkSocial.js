import {Link} from 'react-router-dom'
import style from './LinkSocial.module.css'

export default function LinkSocial(props){
    return (
        <Link to={props.link} 
              target={props.typeTarget !== undefined && props.typeTarget === "_self" ? props.typeTarget : '_blank'} 
              className={`${style.link} px-3`}
        >
                {props.children}
        </Link>
    )
}