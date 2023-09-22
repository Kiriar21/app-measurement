import {Row, Form ,Col} from 'react-bootstrap'
import style from '../FormInput/FormInput.module.css'
import Button from '../../../Buttons/ButtonForm/ButtonForm'
import React from 'react'

export default function SearchModule(props) {
    return(
        <React.Fragment>
            <Form.Label htmlFor='searchValue' className='d-flex justify-content-start'>
                Wyszukaj po nazwie lub miejscowości
            </Form.Label>
            <Row className='mb-3'>
                <Col md={4}>
                    <Form.Control type='search' 
                                onChange={props.onChange} 
                                className={`${style.bg} ${style.width} my-3`}
                                placeholder='Wyszukaj...'
                                autoComplete='false'
                                id='searchValue'
                                />
                </Col>
                <Col md={2}>
                    <Button onClick={props.onClick} className={`${style.width} my-3`} buttonTitle='Wyszukaj' />
                </Col>
            </Row>
        </React.Fragment>
    )
}