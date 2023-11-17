import {Alert} from 'react-bootstrap'
import style from './BigAlert.module.css'
export default function AlertSuccess(props){
    
    setTimeout(() =>{
        window.location.reload()
    },3000)
    return(
        <Alert 
            onClose={null}
            onKeyDown={null}
            variant='success'
            className={` ${style.alert} mt-5`} 
            key='success' 
            dismissible={props.dismissible === false ? false : true} 
            onClick={props.dspbaclick}> 
                {props.alertContent}
        </Alert>
    )
}