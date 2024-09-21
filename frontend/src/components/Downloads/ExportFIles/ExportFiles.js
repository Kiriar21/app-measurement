import React, { useState } from "react";
import AlertSuccess from "../../Alerts/Alert/Alert";
import { useParams } from "react-router-dom";
import ButtonForm from "../../Buttons/ButtonForm/ButtonForm";
import axios from "axios";  

export default function ExportFiles(props) {
    const { id } = useParams();
    const [alertShow, setAlertShow] = useState(false);

    const checkValidate = async () => {
        try {
            const response = await axios.get(`/event/${id}/getScoresZIP`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'results.zip'); 
            document.body.appendChild(link);
            link.click(); 
            document.body.removeChild(link); 
            setAlertShow(true);
        } catch (e) {
            console.error("Błąd podczas pobierania wyników:", e);
        }
    };

    return (
        <React.Fragment>
            <ButtonForm buttonTitle="Pobierz Wyniki" onClick={checkValidate} />
            {alertShow && <AlertSuccess onClick={e => setAlertShow(false)} variant='success' alertContent='Pobrano aktualne wyniki.' />}
        </React.Fragment>
    );
}
