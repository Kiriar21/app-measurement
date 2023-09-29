import { useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import Select from '../../Selects/SelectMeasurement/SelectMeasurement'
import ButtonForm from "../../../../Buttons/ButtonForm/ButtonForm"
import SortsModule from "../../SortsModule/SortsModule"
import SearchModule from "../../SearchModule/SearchModule"
import TableBody from "./TableBody"
// import H3Module from '../../../Texts/H3Module/H3Module'

export default function FormScores(props){
    const [searchBar,setSearchBar] = useState('') 
    const [sortSel,setsortSel] = useState('') 
    const [filtrSex,setfiltrSex] = useState('') 
    const [filtrStatus,setfiltrStatus] = useState('')
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
                    <ButtonForm className='mx-2' buttonTitle='Pobieraj Wyniki' onClick={e=>{}}/>
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
                <SearchModule controlId='sbcompetitors' labelText='Szukaj zawodnika (Zawonika / Numer)' onClick={check} onChange={e=>{setSearchBar(e.target.value)}} />
                <TableBody theader={theader} tbody={tbody}/>
                {/* Będzie wiele tabel po kilka zawodników - zależność od danej imprezy */}
        </Form>
        </Container>
    )
}