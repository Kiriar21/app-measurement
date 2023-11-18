import React, {useState} from "react"
import AlertSuccess from "../../Alerts/Alert/Alert"
import { useParams } from "react-router-dom"
import ButtonForm from "../../Buttons/ButtonForm/ButtonForm"

export default function ExportFiles(props){
    const {id} = useParams()
    const [alertShow, setAlertShow] = useState(false)
    const checkValidate = async () =>{
        try{
            const link = "/"+id+"/exportScores"
            console.log(link)
            setAlertShow(true)
        } catch(e) {
            
        }
    }
   
    return (
        <React.Fragment> 
            <ButtonForm buttonTitle="Pobierz Wyniki" onClick={checkValidate}/>
            {alertShow && <AlertSuccess onClick={e => setAlertShow(false)} variant='success' alertContent='Pobrano aktualne wyniki.' />}
        </React.Fragment>
    )
}