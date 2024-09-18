import { useState, useEffect } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Select from '../../Selects/SelectMeasurement/SelectMeasurement'
import ButtonForm from "../../../../Buttons/ButtonForm/ButtonForm"
import SortsModule from "../../SortsModule/SortsModule"
import SearchModule from "../../SearchModule/SearchModule"
import TableBody from "./TableBody"
import axios from 'axios'
// import H3Module from '../../../Texts/H3Module/H3Module'

export default function FormScores(props){
    const {id} = useParams();
    const [searchBar,setSearchBar] = useState('');;
    const [sortSel,setsortSel] = useState('');
    const [filtrSex,setfiltrSex] = useState(''); 
    const [filtrStatus,setfiltrStatus] = useState('');
    const [downloadingResults, setDownloadingResults] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!isMounted || !downloadingResults) return;

            try {
                await axios.get(`http://localhost:5001/api/event/${id}/classifications/updateData`);
            } catch (error) {
                console.error(error);
            }

            if (isMounted && downloadingResults) {
                fetchData();
            }
        };

        if (downloadingResults) {
            fetchData(); 
        }

        return () => {
            isMounted = false; 
        };
    }, [downloadingResults, id]);




    const check = async () => {
        console.log(searchBar,' ',sortSel,' ', filtrSex, ' ', filtrStatus)
    }
    const classyfications = [{
        name:'krotknazwa',
        title:'Krótka Nazwa'
    }]
    const categories = [{
        name:'open',
        title:'OPEN'
    },{
        name:'decoration',
        title:'Dekoracja'
    },{
        name:'catk16-99',
        title:'Kategoria K16-99'
    },{
        name:'catm16-99',
        title:'Kategoria M16-99'
    },]
    const theader=['Msc Open', 'Msc Kat', 'Msc Płeć', 'Nr', 'Zawodnik', 'Płeć', 'Klasyfikacja', 'Kategoria', 'Klub','Miejscowość','Czas','Czas Start','Czas Meta','Dystans (KM)','Średnie tempo']
    // funkcja pobierania danych z serwera
    // funkcja ktora obsluguje zmiane klasyfikacji i kategorii
    // wysrodkowac wybory klas i kat
    
    const tbody=[{
        placeOpen:1,
        placeCat:1,
        placeSex:1,
        id:1,
        competitor:'Anna Nowak',
        sex:'K',
        class:'5KM',
        cat:'K20-99',
        club:'',
        city:'Czestochowa',
        scores:'00:15:00.00',
        timeStart:'10:00:00.00',
        timeMeta:'10:15:00.00',
        distance:5.0,
        avgPace:'00:03:00.00'
    }]
    return (
        <Container fluid>
        <Row>
                <Col lg={6} className="d-flex">
                    <ButtonForm className='mx-2' buttonTitle='Exportuj Wyniki' onClick={e=>{}}/>
                    <ButtonForm
                        className='mx-2'
                        buttonTitle={downloadingResults ? 'Przestań pobierać wyniki' : 'Pobieraj Wyniki'}
                        colorBtn={downloadingResults ? 'red' : 'green'}
                        onClick={() => setDownloadingResults(!downloadingResults)}
                    />
                </Col>
            <Form className={`m-3`}>
                <Col lg={4}>
                    <Select controlId='selectClass'
                            labelText='Wybierz Klasyfikacje'
                            onChange={e=>{}}
                            opt={classyfications}
                            lg={12} />
                </Col>
                <Col lg={4}>
                    <Select controlId='selectCategory'
                            labelText='Wybierz Kategorie'
                            onChange={e=>{}}
                            opt={categories} 
                            lg={12} />
                </Col>
            </Form>
        </Row>
        <Form className={`m-3`}>
                <SortsModule sortComp={e=>{setsortSel(e)}} filtrSex={e=>{setfiltrSex(e)}} filtrStatus={e=>{setfiltrStatus(e)}}/>
                <SearchModule controlId='sbcompetitors' labelText='Szukaj zawodnika (Imie / Nazwisko / Numer)' onClick={check} onChange={e=>{setSearchBar(e.target.value)}} placeholder="Szuka zawodnika po imieniu, nazwisku lub numerze" turnOffDate={true} />
                <TableBody theader={theader} tbody={tbody}/>
                {/* Będzie wiele tabel po kilka zawodników - zależność od danej imprezy */}
        </Form>
        </Container>
    )
}