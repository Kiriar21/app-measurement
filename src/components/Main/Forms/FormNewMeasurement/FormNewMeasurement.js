import {Form} from 'react-bootstrap'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../Buttons/ButtonForm/ButtonForm'
import FormInput from '../FormInput/FormInput'
import Alert from '../../../Alerts/Alert/Alert'

export default function FormNewMeasurement(props){
    const [showAlert, setShowAlert] = useState(false);
    const dateToday = new Date();
    const dateNow = dateToday.toISOString().slice(0, 10)
    const [, setDate] = useState(dateNow)
    const navigate = useNavigate()
    

    const check = async (e) => {
        e.preventDefault()
        try{
            setShowAlert(true)
            setTimeout(() => {
                navigate('/:id/statistic')
            },3000)
        } catch(err){
        }
    }
    return (
        <Form onSubmit={check}>
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
            <Button buttonTitle="Utwórz" />
            {showAlert  && <Alert variant='success' dismissible={false} alertContent='Udało się utworzyć nowy pomiar. Za chwile nastąpi przekierowanie na strone ze statystykami'/>}
        </Form>
    )
}