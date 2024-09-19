import {useParams} from 'react-router-dom'
import React, { useState, useEffect, useCallback } from "react"
import { Col, Row, Form } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import H3Module from '../../../Texts/H3Module/H3Module'
import LineStep from './LineStep'
import Input from '../../FormInput/FormInput'
import Select from '../../Selects/SelectMeasurement/SelectMeasurement'
import ModalBasic from '../../../../Modals/ModalBasic/ModalBasic'
import axios from 'axios'

export default function FormEvent(props) {

    const typesEvent = [{
        name:'Bieg na czas',
        title:'Bieg na czas'
    }]
    const typeOfCategorization = [{
        name:'true',
        title:'Tak'
    },{
        name:'false',
        title:'Nie'
    }]

    const { id } = useParams()
    const [classificationsNames, setClassificationsNames] = useState([])
    const [status, setStatus] = useState('Ładowanie danych...')
    const [selectedClassificationIndex, setSelectedClassificationIndex] = useState(0);
    const [classificationData, setClassificationData] = useState(null);
    const [availableFiles, setAvailableFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/event/${id}/availableFiles`);
                setAvailableFiles(res.data.files);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, [id]);

    const getClassificationsNames = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:5001/api/event/${id}/classifications`)
            
            if(res.status >= 200 && res.status < 300) {
                setClassificationsNames(res.data)
                setStatus('')
            }

        } catch (error) {
            console.log(error)
            setStatus('Błąd ładowania danych.')
        }
    }, [id])

    useEffect(() => {
        getClassificationsNames()
    }, [getClassificationsNames])

    useEffect(() => {
        const getClassificationData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/event/${id}/classifications/${selectedClassificationIndex}`);

                if (res.status >= 200 && res.status < 300) {
                    setClassificationData(res.data);
                    setStatus('');
                }
            } catch (error) {
                console.log(error);
                setStatus('Błąd ładowania danych.');
            }
        };

        if (classificationsNames.length > 0) {
            getClassificationData();
        }

    }, [id, selectedClassificationIndex, classificationsNames]);

    const handleSave = async () => {
        try {
            const { _id, createdAt, updatedAt, ...payload } = classificationData;

            payload.category_open.exist = payload.category_open.exist.toString();
            payload.category_age.exist = payload.category_age.exist.toString();


            await axios.put(
                `http://localhost:5001/api/event/${id}/classifications/${selectedClassificationIndex}`,
                payload
            );
        } catch (error) {
            console.log(error);
            alert('Błąd podczas zapisywania danych.');
        }
    };
    
    const titleAlert = () => {
        return (`Czy na pewno chcesz zapisać zmiany w klasyfikacji ${classificationData.name}?`).toString();
    }

    return (
        <Container fluid>
            { classificationsNames.length > 0 ? (
                <>
                    <Select controlId='nameClassChoose'
                            labelText='Wybierz Klasyfikacje'
                            jcc={true}
                            onChange={e => setSelectedClassificationIndex(parseInt(e.target.value))}
                            opt={classificationsNames}
                            value={selectedClassificationIndex}
                    />
                    { classificationData ? (
                        <>
                            <H3Module title={classificationData ? "Ustawienia dla klasyfikacji: " + classificationData.name : 'Ładowanie...'} />  
                            <Form>
                                <LineStep className='mt-3 mb-5' title='Krok 1 - Podstawowe Informacje'>
                                    <Row>
                                        <Col lg={3}>
                                            <Select controlId='selectTypeEvent'
                                                labelText='Typ imprezy'
                                                name='type_of_event'
                                                value={classificationData.type_of_event}
                                                onChange={(e) => setClassificationData({ ...classificationData, type_of_event: e.target.value })}
                                                lg={12}
                                                opt={typesEvent}
                                                />
                                        </Col>
                                        <Col lg={3}>
                                            <Input typeInput='text' 
                                                controlId='datetimeEvent' 
                                                labelText='Czas startu'
                                                name='date_and_time'
                                                placeholder='hh:mm:ss.mmm'
                                                value={classificationData.date_and_time}
                                                onChange={(e) => setClassificationData({ ...classificationData, date_and_time: e.target.value })}
                                                lg={12}
                                                />
                                        </Col>
                                        <Col lg={3}>
                                            <Input typeInput='number' 
                                                controlId='distanceEvent' 
                                                labelText='Dystans (KM)'
                                                name='distance'
                                                min={0.1}
                                                value={classificationData.distance}
                                                onChange={(e) => setClassificationData({ ...classificationData, distance: e.target.value })}
                                                lg={12}
                                                />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3}>
                                            <Select controlId='selectOpenClass'
                                                labelText='Kat Open'
                                                name='category_open.exist'
                                                value={classificationData.category_open.exist}
                                                onChange={(e) => setClassificationData({ ...classificationData, category_open: { ...classificationData.category_open, exist: e.target.value } })}
                                                lg={12}
                                                opt={typeOfCategorization}
                                                />
                                        </Col>
                                        <Col lg={3}>
                                            <Input
                                                typeInput='number'
                                                controlId='openCount'
                                                labelText='Top OPEN'
                                                name='category_open.number_of_position'
                                                value={classificationData.category_open.number_of_position}
                                                onChange={(e) => setClassificationData({ ...classificationData, category_open: { ...classificationData.category_open, number_of_position: e.target.value } })}
                                                lg={12}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Select
                                                controlId='selectAgeClass'
                                                labelText='Kat Wiekowa'
                                                name='category_age.exist'
                                                value={classificationData.category_age.exist}
                                                onChange={(e) => setClassificationData({ ...classificationData, category_age: { ...classificationData.category_age, exist: e.target.value } })}
                                                lg={12}
                                                opt={typeOfCategorization}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Input
                                                typeInput='number'
                                                controlId='ageCount'
                                                labelText='Top Wiekowa'
                                                name='category_age.number_of_position'
                                                value={classificationData.category_age.number_of_position}
                                                onChange={(e) => setClassificationData({ ...classificationData, category_age: { ...classificationData.category_age, number_of_position: e.target.value } })}                                                lg={12}
                                            />
                                        </Col>
                                    </Row>
                                </LineStep>
                                <LineStep className='mt-3 mb-5' title='Krok 2 - Punkt Pomiarowy Start'>
                                    <Row>
                                        <Col lg={3}>
                                            <Input
                                                typeInput='number'
                                                controlId='startImpulse'
                                                labelText='Numer Impulsu'
                                                name='impuls_number_start'
                                                value={classificationData.impuls_number_start}
                                                onChange={(e) => setClassificationData({ ...classificationData, impuls_number_start: e.target.value })}                                                
                                                lg={12}
                                            />
                                        </Col>
                                        <Col lg={9}>
                                            <Select
                                                controlId='startFileSelect'
                                                labelText='Wybierz plik START'
                                                onChange={(e) => setClassificationData({ ...classificationData, input_file_start: e.target.value })}
                                                value={classificationData.input_file_start ? classificationData.input_file_start : ''}
                                                opt={[{ name: '', title: 'Nie wybrano pliku' }, ...availableFiles.map(file => ({ name: file, title: file }))]}
                                                lg={12}
                                            />
                                        </Col>
                                    </Row>
                                </LineStep>
                                <LineStep className='mt-3 mb-5' title='Krok 3 - Punkt Pomiarowy Meta'>
                                    <Row>
                                        <Col lg={3}>
                                            <Input
                                                typeInput='number'
                                                controlId='metaImpulse'
                                                labelText='Numer Impulsu'
                                                name='impuls_number_finish'
                                                value={classificationData.impuls_number_finish}
                                                onChange={(e) => setClassificationData({ ...classificationData, impuls_number_finish: e.target.value })}                                                
                                                lg={12}
                                            />
                                        </Col>
                                        <Col lg={9}>
                                            <Select
                                                controlId='metaFileSelect'
                                                labelText='Wybierz plik META'
                                                onChange={(e) => setClassificationData({ ...classificationData, input_file_meta: e.target.value })}
                                                value={classificationData.input_file_meta ? classificationData.input_file_meta : ''}
                                                opt={[{ name: '', title: 'Nie wybrano pliku' }, ...availableFiles.map(file => ({ name: file, title: file }))]}
                                                lg={12}
                                            />
                                        </Col>
                                    </Row>
                                </LineStep>
                                <hr />
                                <ModalBasic
                                    btnModalTitle='Zapisz'
                                    modalTitle='Pliki Wynikowe' 
                                    modalBody={titleAlert()}
                                    modalBtnGreen='Zapisz' 
                                    onClick={handleSave}
                                    secondButtonTitle='Usuń poprzednie pliki i zastąp nowymi'
                                    modalBtnRed='Anuluj'
                                    alertSuccessContent='Dane zawodników zostały zaktualizowane.'
                                    />
                            </Form>
                </>
            ) : (
                <h1>Ładowanie danych...</h1>
            )}
        </>
    ) : (
        <h1>{status}</h1>
    )}
</Container>
    )
}
