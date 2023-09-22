import {Alert} from 'react-bootstrap'
import style from './Alert.module.css'
export default function AlertSuccess(props){
    return(
        <Alert 
            onClose={null}
            onKeyDown={null}
            variant={props.variant} 
            className={` ${style.alert} mt-5`} 
            key={props.variant} 
            dismissible={props.dismissible === false ? false : true} 
            onClick={props.onClick}> 
                {props.alertContent}
        </Alert>
    )
}