import {Form} from 'react-bootstrap'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../Buttons/ButtonForm/ButtonForm'
import FormInput from '../FormInput/FormInput'
import Alert from '../../../Alerts/Alert/Alert'

function timeToForm() {
    let dateToday = new Date();
    dateToday = new Date(dateToday.getTime() - (dateToday.getTimezoneOffset()*60*1000));
    let dateNow = dateToday.toISOString().slice(0, 10) 
    return dateNow;
}

export default function FormNewMeasurement(props){
    const [showAlert, setShowAlert] = useState(false);
    const [onLoading, setOnLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const dateNow = timeToForm()
    const [, setDate] = useState(dateNow)
    const navigate = useNavigate()    
    const check = async (e) => {
        e.preventDefault()
        setOnLoading(true)
        try{
            setTimeout(() => {
                setShowAlert(true)
            },1000)
            
        } catch(err) {
        } finally {
            setTimeout(() => {
                setOnLoading(false) 
                setDisabled(true)
            }, 1000);
            setTimeout(() => {
                navigate('/')
            },2000)
        }
    }
    return (
        <Form>
            <FormInput controlId='formDateEvent'
                        labelText='Data'
                        typeInput='date'
                        defaultValue={dateNow}
                        min={dateNow}
                        onChange={ e => setDate(e.target.value)}
                        placeholder='01/01/2000' />
            <FormInput controlId='formPlaintextName'
                        labelText='Nazwa'
                        typeInput='text'
                        // onChange={}
                        placeholder='Nazwa' />
            <FormInput controlId='formPlaintextCity'
                        labelText='Miejscowość'
                        typeInput='text'
                        // onChange={}
                        placeholder='Miejscowość' />
            <Button onClick={check} onLoading={onLoading} disabled={disabled} buttonTitle="Utwórz" />
            
            {showAlert  && <Alert variant='success' dismissible={false} alertContent='Udało się utworzyć nowy pomiar. Za chwile nastąpi przekierowanie na strone główną...'/>}
        </Form>
    )
}