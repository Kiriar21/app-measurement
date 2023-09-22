import {Form} from 'react-bootstrap'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../Buttons/ButtonForm/ButtonForm'
import FormInput from '../../FormInput/FormInput'
import Alert from '../../../../Alerts/Alert/Alert'
import SelectMeasurement from '../../Selects/SelectMeasurement/SelectMeasurement'

export default function FormNewMeasurement(props){
    const [showAlert, setShowAlert] = useState(false)
    const dateToday = new Date();
    const dateNow = dateToday.toISOString().slice(0, 10)
    const [date, setDate] = useState(dateNow)
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const navigate = useNavigate()
    const options = [{
        name:'run',
        title:'Bieg na czas'
    }] 
    const check = async (e) => {
        e.preventDefault()
        try{
            setShowAlert(true)
            setTimeout(() => {
                navigate('/:id/statistic')
            }, 3000)
        } catch(err){
            console.log(err)
        }
    }
    return (
        <Form>
            <FormInput controlId='formDateEvent'
                        labelText='Data'
                        typeInput='date'
                        defaultValue={date}
                        min={date}
                        onChange={ e => setDate(e.target.value)}/>
            <FormInput controlId='formPlaintextName'
                        labelText='Nazwa'
                        typeInput='text'
                        defaultValue={name}
                        onChange={ e => setName(e.target.value)}
                        placeholder='Nazwa' />
            <FormInput controlId='formPlaintextCity'
                        labelText='Miejscowość'
                        typeInput='text'
                        defaultValue={city}
                        onChange={ e => setCity(e.target.value)}
                        placeholder='Miejscowość' />
            <SelectMeasurement controlId='selectMeasurement'
                        labelText='Typ'
                        onChange={ e => {}}
                        opt={ options} />
            <Button buttonTitle="Zapisz" onClick={check} />
            {showAlert  && <Alert variant='success' dismissible={false} alertContent='Zmiany zostały zapisane. Za chwile nastąpi przekierowanie na strone ze statystykami'/>}
        </Form>
    )
}