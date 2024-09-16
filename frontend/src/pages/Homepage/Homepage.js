import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import MainBackground from "../../components/Main/MainBackground/MainBackground";
import SearchModule from "../../components/Main/Forms/SearchModule/SearchModule";
import TableBody from '../../components/Main/Forms/Homepage/TableBody/TableBody';
import ButtonForm from '../../components/Buttons/ButtonForm/ButtonForm';
import H3Module from '../../components/Main/Texts/H3Module/H3Module';
import axios from 'axios';

export default function Login(props) {
    const [searchValue, setSearchValue] = useState('');
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc'); 
    const [onLoading, setOnLoading] = useState(false);
    const [searchDate, setSearchDate] = useState('');
    const [tbody, setTbody] = useState([]);
    const navigate = useNavigate();
    const theader = ['Data','Nazwa','Miejscowość','Edytuj','Usuń']

    const searching = useCallback(async () => {
        setOnLoading(true);
        try {
            let query = `?search=${searchValue}&sortField=${sortField}&sortOrder=${sortOrder}`;
            if (searchDate) {
                query += `&date=${searchDate}`; 
            }
    
            const response = await axios.get(`http://localhost:5001/api/getEvents${query}`);
            setTbody(response.data.events);
            setOnLoading(false);
        } catch (error) {
            console.error('Error during search and sort:', error);
            setOnLoading(false);
        }
    }, [searchValue, searchDate, sortField, sortOrder]); 
    

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
        searching(); 
    };

    const fetchEvents = async () => {
        setSearchValue('');  
        setSearchDate('');
        setOnLoading(true);
        try {
            const response = await axios.get(`http://localhost:5001/api/getEvents?sortField=${sortField}&sortOrder=${sortOrder}`);
            setTbody(response.data.events);
            setOnLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setOnLoading(false);
        }
    };

    useEffect(() => {
        searching();
    }, [searching]);



    const deleteEvent = async (eventId, modalRef) => {
        try {
            const response = await axios.delete(`http://localhost:5001/api/event/${eventId}`);

            if (response.status >= 200 && response.status < 300) {
                await fetchEvents();
                if (modalRef.current) {
                    modalRef.current.handleClose();
                }
            } else {
                console.error('Błąd podczas usuwania eventu');
            }
        } catch (e) {
            console.error("Error:", e);
        }
    };

    return (
        <MainBackground titlePage="Wyniki Lokalne">
            <Form>
                <H3Module title='Nowy pomiar'>
                    <ButtonForm onClick={e => { navigate('/new-measurement') }} buttonTitle='Utwórz nowy pomiar' />
                    <hr />
                </H3Module>
            </Form>
            <Form className={`m-3`}>
            <SearchModule
                controlId='plainTextSearchbarHp'
                onLoading={onLoading}
                onClick={searching}
                onClear={fetchEvents}
                onChange={e => setSearchValue(e.target.value)}  
                searchValue={searchValue}
                dateValue={searchDate}  
                onDateChange={e => setSearchDate(e.target.value)}  
            />
                <TableBody 
                    theader={theader}
                    tbody={tbody} 
                    handleSort={handleSort}  
                    sortField={sortField}
                    sortOrder={sortOrder}
                    fetchEvents={fetchEvents}
                    deleteEvent={deleteEvent}
                />
            </Form>
        </MainBackground>
    );
}
