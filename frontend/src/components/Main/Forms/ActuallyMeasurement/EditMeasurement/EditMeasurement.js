import {Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../../../Buttons/ButtonForm/ButtonForm'
import FormInput from '../../FormInput/FormInput'
import Alert from '../../../../Alerts/Alert/Alert'
import axios from 'axios';

export default function FormNewMeasurement(props){
    const { id } = useParams()
    const [showAlert, setShowAlert] = useState(false)
    const dateToday = new Date();
    const dateNow = dateToday.toISOString().slice(0, 10)
    const [date, setDate] = useState(dateNow)
    const [name, setName] = useState('')
    const [localization, setlocalization] = useState('')

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/event/${id}/edit`); 
                const eventData = response.data;
                setDate(eventData.date);
                setName(eventData.name);
                setlocalization(eventData.localization);
            } catch (err) {
                console.log("Błąd przy pobieraniu danych wydarzenia: ", err);
            }
        };
        fetchEventData();
    }, [id]);

    const check = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { date, name, localization };
            await axios.put(`http://localhost:5001/api/event/${id}/edit`, updatedData); 
            setShowAlert(true);
        } catch (err) {
            console.log("Błąd przy zapisywaniu danych: ", err);
        }
    };

    return (
        <Form>
            <FormInput controlId='formDateEvent'
                        labelText='Data'
                        typeInput='date'
                        value={date}
                        onChange={ e => setDate(e.target.value)}/>
            <FormInput controlId='formPlaintextName'
                        labelText='Nazwa'
                        typeInput='text'
                        value={name}
                        onChange={ e => setName(e.target.value)}
                        placeholder='Nazwa' />
            <FormInput controlId='formPlaintextlocalization'
                        labelText='Miejscowość'
                        typeInput='text'
                        value={localization}
                        onChange={ e => setlocalization(e.target.value)}
                        placeholder='Miejscowość' />
            <Button buttonTitle="Zapisz" onClick={check} />
            {showAlert  && <Alert variant='success' dismissible={true} alertContent='Zmiany zostały zapisane.'/>}
        </Form>
    )
}