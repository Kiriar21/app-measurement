import {Row, Col} from 'react-bootstrap';
import style from './H4Module.module.css'

export default function ParagraphModule(props){
    return(
        <Row className='d-flex justify-content-center'>
            <h4 className="py-3">
            <Col>
                <p className={`mx-auto py-2 ${style.widthP}`}>
                    {props.text}
                </p>
            </Col>
            <Col className='mx-auto'>
                {props.children}
            </Col>
            </h4>
        </Row>
    )
}