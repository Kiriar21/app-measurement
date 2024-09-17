import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from 'axios';
import SearchModule from "../../../../components/Main/Forms/SearchModule/SearchModule";
import MainBackground from "../../../../components/Main/MainBackground/MainBackground";
import SortsModule from "../../../../components/Main/Forms/SortsModule/SortsModule";
import TableBody from "../../../../components/Main/Forms/ActuallyMeasurement/ListCompetitors/TableBody";
import ModalBasic from "../../../../components/Modals/ModalBasic/ModalBasic";
import FormInput from '../../../../components/Main/Forms/FormInput/FormInput';
import SelectMeasurement from "../../../../components/Main/Forms/Selects/SelectMeasurement/SelectMeasurement";
import LineStep from "../../../../components/Main/Forms/ActuallyMeasurement/AmSettingsEvent/LineStep";

export default function Login(props) {
    const { id } = useParams();
    const [tbody, setTbody] = useState([]);
    const [file, setFile] = useState('');

    const [searchBar, setSearchBar] = useState(''); 
    const [filtrSex, setfiltrSex] = useState(''); 
    const [filtrStatus, setfiltrStatus] = useState('');

    const [sortField, setSortField] = useState({ field: '', order: '' });

    const [selectedCompetitor, setSelectedCompetitor] = useState(null);

    const [status, setStatus] = useState('Ładowanie danych...');
    const theader = [
        { field: 'counter', label: 'Lp' },
        { field: 'number', label: 'Nr' },
        { field: 'competitor', label: 'Zawodnik' },
        { field: 'gender', label: 'Płeć' },
        { field: 'age', label: 'Wiek' },
        { field: 'date_of_birth', label: 'Data Urodzenia' },
        { field: 'classification', label: 'Klasyfikacja' },
        { field: 'category', label: 'Kategoria' },
        { field: 'country', label: 'Kraj' },
        { field: 'club', label: 'Klub' },
        { field: 'status', label: 'Udział' },
        { field: 'location', label: 'Miejscowość' },
        { field: 'edit', label: 'Edycja' },
        { field: 'delete', label: 'Usuwanie' }
    ];

    const csvModalChildRef = useRef(null);
    const deleteModalChildRef = useRef(null);

    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
    
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);
        
        return debouncedValue;  
    }
    
    const debouncedSearchBar = useDebounce(searchBar, 500);
    
    const fetchParticipants = useCallback(async () => {


        try {

            let queryParams = `?`;

            if (debouncedSearchBar) {
                queryParams += `search=${encodeURIComponent(debouncedSearchBar)}&`;
            }

            if (filtrSex) {
                queryParams += `genderFilter=${encodeURIComponent(filtrSex)}&`;
            }

            if (filtrStatus) {
                if (filtrStatus === 'active') {
                    queryParams += `statusFilter=START&`;
                } else if (filtrStatus === 'rest') {
                    queryParams += `statusFilter=NOT_START&`;
                }
            }

            if (sortField.field) {
                queryParams += `sortField=${encodeURIComponent(sortField.field)}&sortOrder=${encodeURIComponent(sortField.order)}&`;
            }

            const response = await axios.get(`http://localhost:5001/api/event/${id}/getUsers${queryParams}`);

            if (response.data.length > 0) {
                setTbody(response.data);
                setStatus('');
            } else {
                setTbody([]);
                setStatus('Nie znaleziono żadnych zawodników.');
            }
        } catch (error) {
            console.error('Error fetching participants:', error);
            setStatus('Błąd podczas ładowania danych.');
        }
    }, [id, sortField, filtrSex, filtrStatus, debouncedSearchBar]);


    
    useEffect(() => {
        fetchParticipants();
    }, [fetchParticipants]); 

    const handleSort = (field) => {
        setSortField(prevSortField => {
            if (prevSortField.field !== field) {
                
                return { field, order: 'asc' };
            } else if (prevSortField.order === 'asc') {
                
                return { field, order: 'desc' };
            } else {
                
                return { field: '', order: '' };
            }
        });
    };

    const csvUploadModalBody = (
        <React.Fragment>
            <FormInput controlId='fileDataCompetitors'
                labelText='Wybierz plik z danymi'
                typeInput='file'
                name='file'
                enctype='multipart/form-data'
                onChange={e => { setFile(e.target.files[0]) }}
                acceptFile='.csv'
                lg={10}
            />
            <p>Dozwolone pliki: .csv.</p>
            <p>Jeżeli dane już są wgrane, z nowego pliku zostaną dodane tylko te osoby, których nie ma w bazie.</p>
        </React.Fragment>
    );

    const genderCompetitor = [
        {
            name:'M',
            title:'Mężczyzna'
        },
        {
            name:'K',
            title:'Kobieta'
        }
    ]
    const finishedCompetitor = [
        {
            name:'true',
            title:'TAK'
        },
        {
            name:'false',
            title:'NIE'
        }
    ]
    const statusCompetitor = [
        {
            name:'START',
            title:'START'
        },
        {
            name:'DNS',
            title:'DNS'
        },
        {
            name:'DNF',
            title:'DNF'
        },
        {
            name:'DNQ',
            title:'DNQ'
        },
    ]

    const editUserModalBody = (
        <React.Fragment>
            <p style={{fontWeight: "bold",}}>Numer Zawodnika: {selectedCompetitor && selectedCompetitor.number}</p>
            <LineStep className='mt-3 mb-5 my-5' title='Podstawowe Informacje o zawodniku'>
                <FormInput controlId='nameCompetitor'
                    labelText='Zawodnik'
                    typeInput='text'
                    value={selectedCompetitor && selectedCompetitor.competitor}
                    lg={10}
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, competitor: e.target.value })}           
                />
                <SelectMeasurement controlId='genderCompetitor'
                        labelText='Płeć'
                        onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, gender: e.target.value })}
                        opt={genderCompetitor}
                        lg={10}
                        value={selectedCompetitor && selectedCompetitor.gender !== null ? selectedCompetitor.gender : ''}
                />
                <FormInput controlId='dateOfBirthCompetitor'
                    labelText='Data urodzenia'
                    typeInput='date'
                    value={selectedCompetitor && selectedCompetitor.date_of_birth}
                    lg={10}
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, date_of_birth: e.target.value })}           
                />
                <FormInput controlId='countryCompetitor'
                    labelText='Kraj'
                    typeInput='text'
                    value={selectedCompetitor && selectedCompetitor.country}
                    lg={10}
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, country: e.target.value })}           
                />
                <FormInput controlId='locationCompetitor'
                    labelText='Miasto'
                    typeInput='text'
                    value={selectedCompetitor && selectedCompetitor.location}
                    lg={10}
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, location: e.target.value })}           
                />
                <FormInput controlId='clubCompetitor'
                    labelText='Klub'
                    typeInput='text'
                    value={selectedCompetitor && selectedCompetitor.club}
                    lg={10}
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, club: e.target.value })}           
                />
                <FormInput controlId='telCompetitor'
                    labelText='Numer telefonu'
                    typeInput='text'
                    value={selectedCompetitor && selectedCompetitor.tel}
                    lg={10}
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, tel: e.target.value })}           
                />
            </LineStep>
            <LineStep className='mt-3 mb-5 my-5' title='Ustawienia Pomiarowe'>
                <FormInput controlId='chipNumberCompetitor'
                    labelText='Numer chipu'
                    typeInput='number'
                    value={selectedCompetitor && selectedCompetitor.chip_number}
                    lg={10}
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, chip_number: e.target.value })}           
                />
                <SelectMeasurement controlId='statusCompetitor'
                        labelText='Status Zawodnika'
                        onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, status: e.target.value })}
                        opt={statusCompetitor}
                        lg={10}
                        value={selectedCompetitor && selectedCompetitor.status != null ? selectedCompetitor.status : ''}
                />
                <FormInput controlId='chipNumberCompetitor'
                    labelText='Numer chipu'
                    typeInput='number'
                    value={selectedCompetitor && selectedCompetitor.chip_number}
                    lg={10}
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, chip_number: e.target.value })}           
                />
            </LineStep>
            <LineStep className='mt-3 mb-5 my-5' title='Wyniki czasowe'>
                <FormInput controlId='timStartCompetitor'
                    labelText='Godzina startu'
                    typeInput='text'
                    value={selectedCompetitor && selectedCompetitor.time_start}
                    lg={10}
                    placeholder="hh:mm:ss.mmm"
                    pattern="^([01]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9]\.[0-9]{3}$"
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, time_start: e.target.value })}           
                />  
                <FormInput controlId='timEndCompetitor'
                    labelText='Godzina Mety'
                    typeInput='text'
                    value={selectedCompetitor && selectedCompetitor.time_end}
                    lg={10}
                    placeholder="hh:mm:ss.mmm"
                    onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, time_end: e.target.value })}           
                    pattern="^([01]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9]\.[0-9]{3}$"
                />    
                <SelectMeasurement controlId='finishedCompetitor'
                        labelText='Zawonik ukończył bieg'
                        onChange={(e) => setSelectedCompetitor({ ...selectedCompetitor, finished: e.target.value })}
                        opt={finishedCompetitor}
                        lg={10}
                        value={selectedCompetitor && selectedCompetitor.finished != null ? selectedCompetitor.finished : ''}
                />
            </LineStep>
        </React.Fragment>
    );

    const cleanSets = () => {
        setSearchBar('');
        setfiltrSex('')
        setfiltrStatus('')
        setSortField({ field: '', order: '' });
        setStatus('Ładowanie danych...')
    }

    const uploadCSV = async (e, isAdded) => {
        if (!file) {
            alert('Proszę wybrać plik CSV przed przesłaniem.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            let response = null;

            if (isAdded) {
                response = await axios.post(`http://localhost:5001/api/event/${id}/replaceDataCSV`, formData) 
            } else {
                response = await axios.post(`http://localhost:5001/api/event/${id}/updateDataCSV`,formData)
            }

            if (response.status >= 200 && response.status < 300) {
                await fetchParticipants();

                
                if (csvModalChildRef.current) {
                    csvModalChildRef.current.handleClose();
                }
            
                

            } else {
                const errorData = await response.json();
                alert(`Błąd: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Błąd przesyłania pliku:', error);
            alert('Wystąpił błąd podczas przesyłania pliku');
        }
    };

    const deleteParticipant = async (number) => {
        try {
            const response = await axios.delete(`http://localhost:5001/api//event/${id}/deleteUser/${number}`);
    
            if (response.status === 200) {
                fetchParticipants(); 
                if (deleteModalChildRef.current) {
                    deleteModalChildRef.current.handleClose();
                }
            } else {
                alert('Wystąpił problem podczas usuwania zawodnika.');
            }
        } catch (error) {
            console.error('Error deleting participant:', error);
            alert('Błąd podczas usuwania zawodnika.');
        }
    };
    
    const fetchCompetitorDetails = async (number) => {
        
        try {
            const response = await axios.get(`http://localhost:5001/api/event/${id}/getUser/${number}`);
            if (response.status === 200) {
                response.data.date_of_birth = response.data.date_of_birth.split('T')[0];
                setSelectedCompetitor(response.data);  
            } else {
                alert('Nie udało się pobrać danych zawodnika.');
            }
        } catch (error) {
            console.error('Błąd podczas pobierania danych zawodnika:', error);
            alert('Błąd podczas pobierania danych zawodnika.');
        }
    };
    
    const updateCompetitor = async (number, modalRef) => {
        if (!selectedCompetitor) {
            alert('Brak danych zawodnika do zapisania.');
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:5001/api/event/${id}/editUser/${number}`, selectedCompetitor);
            
            if (response.status === 200) {
                fetchParticipants();
                if (modalRef && modalRef.current) {
                    modalRef.current.handleClose();
                }
            } else {
                alert('Wystąpił błąd podczas aktualizacji danych zawodnika.');
            }
        } catch (error) {
            console.error('Błąd podczas aktualizacji zawodnika:', error);
            alert('Błąd podczas aktualizacji zawodnika.');
        }
    };
    
    
    return (
        <MainBackground titlePage="Lista Zawodników">
            <ModalBasic
                ref={csvModalChildRef}
                btnModalTitle='Wgraj Dane'
                modalTitle='Wgrywanie Danych'
                modalBody={csvUploadModalBody}
                modalBtnGreen='Wgraj'
                secondButton={true}
                ownFunctions={true}
                onClick={e => uploadCSV(e, false)}
                onClick2={e => uploadCSV(e, true)}
                onClose={() => { setFile('') }}
                secondButtonTitle='Usuń poprzednie dane i zastąp nowymi'
                modalBtnRed='Anuluj'
            />
            <Form className={`m-3`}>
                <SortsModule
                    filtrSex={e => { setfiltrSex(e.target.value); }}
                    filtrStatus={e => { setfiltrStatus(e.target.value); }}
                />
                <SearchModule
                    controlId='sbcompetitors'
                    onClear={cleanSets}
                    labelText='Szukaj zawodnika (Imię / Nazwisko / Numer)'
                    onChange={e => { setSearchBar(e.target.value); }}
                    placeholder="Szukaj zawodnika po imieniu, nazwisku lub numerze"
                    turnOffDate={true}
                />
                <TableBody 
                    theader={theader} 
                    tbody={tbody} 
                    status={status}
                    
                    modalBody={editUserModalBody} 
                    
                    sortField={sortField  || { field: '', order: '' }}
                    
                    handleSort={handleSort} 
                    
                    deleteParticipant={deleteParticipant}
                    deleteModalRef={deleteModalChildRef}
                    
                    fetchCompetitorDetails={fetchCompetitorDetails}
                    updateCompetitor={updateCompetitor}
                />
            </Form>
        </MainBackground>
    );
}