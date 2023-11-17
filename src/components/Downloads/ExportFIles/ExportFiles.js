import React, {useState} from "react"
import ButtonLink from "../../Buttons/ButtonLink/ButtonLink"
import AlertSuccess from "../../Alerts/Alert/Alert"
import { useParams } from "react-router-dom"

export default function ExportFiles(props){
    const {id} = useParams()
    const [alertShow, setAlertShow] = useState(false)
    const checkValidate = async () =>{
        setAlertShow(true)
    }
    const link = "/"+id+"/exportScores"
    // Dodać widok 
    return (
        <React.Fragment> 
            <ButtonLink pathLink={link} onClick={e => checkValidate} buttonTitle="Pobierz Wyniki"/>
            {alertShow && <AlertSuccess onClick={e => setAlertShow(false)} variant='success' alertContent='Pobrano aktualne wyniki.' />}
        </React.Fragment>
    )
}