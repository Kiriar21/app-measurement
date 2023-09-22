import React, {useState} from "react"
import ButtonLink from "../../Buttons/ButtonLink/ButtonLink"
import AlertSuccess from "../../Alerts/Alert/Alert"

export default function ExportFiles(props){
    const [alertShow, setAlertShow] = useState(false)
    const checkValidate = async () =>{
        setAlertShow(true)
    }
    return (
        <React.Fragment> 
            <ButtonLink pathLink='/:id/zip' onClick={e => checkValidate} buttonTitle="Pobierz Wyniki"/>
            {alertShow && <AlertSuccess onClick={e => setAlertShow(false)} variant='success' alertContent='Pobrano aktualne wyniki.' />}
        </React.Fragment>
    )
}