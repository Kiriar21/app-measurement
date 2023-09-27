import {useState} from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import H3Module from '../../../Texts/H3Module/H3Module'
import LineStep from './LineStep'
import Input from '../../FormInput/FormInput'
import Select from '../../Selects/SelectMeasurement/SelectMeasurement'
import Button from '../../../../Buttons/ButtonForm/ButtonForm'
import Alert from '../../../../Alerts/Alert/Alert'

export default function FormEvent(props) {
    const [showAlert, setShowAlert] = useState(false);
    const typesEvent = [{
        name:'run',
        title:'Bieg na czas'
    }]
    const optClass = [{
        name:'yes',
        title:'Tak'
    },{
        name:'no',
        title:'Nie'
    }]
    const classyfications = [{
        name:'krotknazwa',
        title:'Krótka Nazwa'
    }]
    const check = async (e) => {
        e.preventDefault()
        try{
            setShowAlert(true)
        } catch(err){
        }
    }
    return (
        <Container fluid>
            <Select controlId='nameClassChoose'
                    labelText='Wybierz Klasyfikacje'
                    jcc={true}
                    onChange={e=>{}}
                    opt={classyfications}
            />
            <H3Module title='Krótka nazwa' />
            <Form>
                <LineStep className='mt-3 mb-5' title='Krok 1 - Podstawowe Informacje'>
                    <Row>
                        <Col lg={3}>
                            <Select controlId='selectTypeEvent'
                                labelText='Typ imprezy'
                                onChange={e=>{}}
                                lg={12}
                                opt={typesEvent}
                                />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='datetime-local' 
                                controlId='datetimeEvent' 
                                labelText='Czas startu'
                                onChange={e=>{}}
                                lg={12}
                                />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='number' 
                                controlId='distanceEvent' 
                                labelText='Dystans (KM)'
                                min={0.1}
                                onChange={e=>{}}
                                lg={12}
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3}>
                            <Select controlId='selectOpenClass'
                                labelText='Kat Open'
                                onChange={e=>{}}
                                lg={12}
                                opt={optClass}
                                />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='number' 
                                    controlId='openCount' 
                                    labelText='Top OPEN'
                                    onChange={e=>{}}
                                    defaultValue={3}
                                    lg={12}
                                    />
                        </Col>
                        <Col lg={3}>
                            <Select controlId='selectAgeClass'
                                    labelText='Kat Wiekowa'
                                    onChange={e=>{}}
                                    lg={12}
                                    opt={optClass}
                                    />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='number' 
                                    controlId='ageCount' 
                                    labelText='Top Wiekowa'
                                    onChange={e=>{}}
                                    defaultValue={3}
                                    lg={12}
                                    />
                        </Col>
                    </Row>
                </LineStep>
                <LineStep className='mt-3 mb-5' title='Krok 2 - Punkt Pomiarowy Start'>
                    <Row>
                        <Col lg={3}>
                            <Input typeInput='number' 
                                    controlId='startImpulse' 
                                    labelText='Numer Impulsu'
                                    onChange={e=>{}}
                                    defaultValue={1}
                                    lg={12}
                                    />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='file' 
                                    controlId='fileStart1' 
                                    labelText='Plik 1'
                                    onChange={e=>{}}
                                    lg={12}
                                    />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='file' 
                                    controlId='fileStart2' 
                                    onChange={e=>{}}
                                    labelText='Plik 3'
                                    lg={12}
                                    />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='file' 
                                    controlId='fileStart3' 
                                    labelText='Plik 3'
                                    onChange={e=>{}}
                                    lg={12}
                                    />
                        </Col>
                    </Row>
                </LineStep>
                <LineStep className='mt-3 mb-5' title='Krok 3 - Punkt Pomiarowy Meta'>
                    <Row>
                        <Col lg={3}>
                            <Input typeInput='number' 
                                    controlId='metaImpulse' 
                                    labelText='Numer Impulsu'
                                    onChange={e=>{}}
                                    defaultValue={1}
                                    lg={12}
                                    />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='file' 
                                    controlId='fileMeta1' 
                                    labelText='Plik 1'
                                    onChange={e=>{}}
                                    lg={12}
                                    />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='file' 
                                    controlId='fileMeta2' 
                                    labelText='Plik 3'
                                    onChange={e=>{}}
                                    lg={12}
                                    />
                        </Col>
                        <Col lg={3}>
                            <Input typeInput='file' 
                                    controlId='fileMeta3' 
                                    labelText='Plik 3'
                                    onChange={e=>{}}
                                    lg={12}
                                    />
                        </Col>
                    </Row>
                </LineStep>
                <hr />
                <Button onClick={check} buttonTitle='Zapisz'/>
                {showAlert  && <Alert onClick={e=>{setShowAlert(false)}} variant='success' alertContent='Pomyślnie zapisano dane.'/>}
            </Form>
        </Container>
    )
}
