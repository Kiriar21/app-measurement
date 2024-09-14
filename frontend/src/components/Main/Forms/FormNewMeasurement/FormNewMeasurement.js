import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Buttons/ButtonForm/ButtonForm';
import FormInput from '../FormInput/FormInput';
import Alert from '../../../Alerts/Alert/Alert';

function timeToForm() {
    let dateToday = new Date();
    dateToday = new Date(dateToday.getTime() - (dateToday.getTimezoneOffset() * 60 * 1000));
    let dateNow = dateToday.toISOString().slice(0, 10);
    return dateNow;
}

export default function FormNewMeasurement(props) {
    const [showAlert, setShowAlert] = useState(false);
    const [onLoading, setOnLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState('');
    const [localization, setLocalization] = useState('');
    const [date, setDate] = useState(timeToForm());
    const navigate = useNavigate();

    const check = async (e) => {
        e.preventDefault();
        setOnLoading(true);

        const eventData = {
            name,
            localization,
            date
        };

        try {
            const response = await fetch('http://localhost:5001/api/createEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData), 
            });

            if (response.ok) {
                await response.json();
                setShowAlert(true);
                setOnLoading(false);
                setDisabled(true);

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                console.error('Failed to create event');
                setOnLoading(false);
            }
        } catch (error) {
            console.error('Error creating event:', error);
            setOnLoading(false);
        }
    };

    return (
        <Form>
            <FormInput
                controlId='formDateEvent'
                labelText='Data'
                typeInput='date'
                value={date}
                min={date}
                onChange={e => setDate(e.target.value)}
                placeholder='01/01/2000'
            />
            <FormInput
                controlId='formPlaintextName'
                labelText='Nazwa'
                typeInput='text'
                value={name}
                onChange={e => setName(e.target.value)} 
                placeholder='Nazwa'
            />
            <FormInput
                controlId='formPlaintextCity'
                labelText='Miejscowość'
                typeInput='text'
                value={localization}
                onChange={e => setLocalization(e.target.value)} 
                placeholder='Miejscowość'
            />
            <Button onClick={check} onLoading={onLoading} disabled={disabled} buttonTitle="Utwórz" />
            {showAlert && (
                <Alert
                    variant='success'
                    dismissible={false}
                    alertContent='Udało się utworzyć nowy pomiar. Za chwile nastąpi przekierowanie na strone główną...'
                />
            )}
        </Form>
    );
}
