import { Col, Row } from "react-bootstrap";
import SelectMeasurement from '../Selects/SelectMeasurement/SelectMeasurement';

export default function SortsModule(props){

    const optSex = [{
        name:'',
        title:'Wszyscy'
    }, {
        name:'K',
        title:'Kobiety'
    },{
        name:'M',
        title:'Mężczyźni'
    }]

    const optStatus = [{
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
            <Col md={6}>
                <SelectMeasurement controlId='filtrSex' 
                                    labelText='Filtr Płeć:'
                                    onChange={props.filtrSex}
                                    opt={optSex}
                                    lg={12}
                />
            </Col>
            <Col md={6}>
                <SelectMeasurement controlId='filtrStatus' 
                                    labelText='Filtr Status:'
                                    onChange={props.filtrStatus}
                                    opt={optStatus}
                                    lg={12}
                />            
            </Col>
        </Row>
    )
}