import { Col, Row } from "react-bootstrap";
import SelectMeasurement from '../Selects/SelectMeasurement/SelectMeasurement';

export default function SortsModule(props){
    const sortOpt = [{
        name:'',
        title: 'Brak'
    },{
        name:'classAZ',
        title: 'Klasyfikacja A-Z'
    }, {
        name:'classZA',
        title: 'Klasyfikacja Z-A'
    },{
        name:'catAZ',
        title: 'Kategoria A-Z'
    },{
        name:'catZA',
        title: 'Kategoria Z-A'
    },{
        name:'ageASC',
        title: 'Od najmłodszego'
    },{
        name:'ageDESC',
        title: 'Od najstarszego'
    },{
        name:'clubAZ',
        title: 'Klub A-Z'
    },{
        name:'clubZA',
        title: 'Klub Z-A'
    },{
        name:'countryAZ',
        title: 'Kraj A-Z'
    },{
        name:'countryZA',
        title: 'Kraj Z-A'
    },{
        name:'cityAZ',
        title: 'Miejscowość A-Z'
    },{
        name:'cityZA',
        title: 'Miejscowość Z-A'
    }]
    const filtrSex = [{
        name:'',
        title:'Wszyscy'
    }, {
        name:'k',
        title:'Kobiety'
    },{
        name:'m',
        title:'Mężczyźni'
    }]
    const filtrParti = [{
        name:'',
        title:'Wszyscy'
    }, {
        name:'active',
        title:'Udział'
    },{
        name:'rest',
        title:'Pozostali'
    }]
    return (
        <Row>
        <Col md={4}>

                <SelectMeasurement controlId='sortCompFirst' 
                                    labelText='Sortuj po:'
                                    onChange={e=>{props.sortComp(e.target.value)}}
                                    opt={sortOpt}
                                    lg={12}
                                    />
        </Col>
        <Col md={4}>
                    <SelectMeasurement controlId='filtrSex' 
                                            labelText='Filtr Płeć:'
                                            onChange={e=>{props.filtrSex(e.target.value)}}
                                            opt={filtrSex}
                                            lg={12}
                                            />
        </Col>
        <Col md={4}>
                    <SelectMeasurement controlId='filtrStatus' 
                                            labelText='Filtr Status:'
                                            onChange={e=>{props.filtrStatus(e.target.value)}}
                                            opt={filtrParti}
                                            lg={12}
                                            />            
        </Col>
        </Row>
    )
}