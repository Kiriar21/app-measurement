import {Row, Form ,Col} from 'react-bootstrap'
import style from '../FormInput/FormInput.module.css'
import React from 'react'

export default function SearchModule(props) {
    return(
        <React.Fragment>
            <Form.Label htmlFor={props.controlId} className='d-flex justify-content-start'>
                {props.labelText}
            </Form.Label>
            <Row className='mb-3'>
                { props.turnOffDate ? (
                        <>
                            <Col md={6}>
                                <Form.Control type='search' 
                                            onChange={props.onChange} 
                                            className={`${style.bg} ${style.width} my-3`}
                                            placeholder={ props.placeholder ? props.placeholder : 'Wyszukaj po nazwie lub miejscowości'}
                                            autoComplete='false'
                                            id={props.controlId}
                                            value={props.searchValue}
                                            />
                            </Col>
                            <Col md={6}>
                                <Form.Control type='reset'
                                            className={`${style.width} ${style.bg} ${style.bgRed} my-3`}
                                            onClick={props.onClear}
                                            value='Wyczyść'/>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col md={4}>
                                <Form.Control type='search' 
                                            onChange={props.onChange} 
                                            className={`${style.bg} ${style.width} my-3`}
                                            placeholder={ props.placeholder ? props.placeholder : 'Wyszukaj po nazwie lub miejscowości'}
                                            autoComplete='false'
                                            id={props.controlId}
                                            value={props.searchValue}
                                            />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    type='date' 
                                    onChange={props.onDateChange} 
                                    className={`${style.bg} ${style.width} my-3`}
                                    placeholder='Wyszukaj po dacie'
                                    value={props.dateValue}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control type='reset'
                                            className={`${style.width} ${style.bg} ${style.bgRed} my-3`}
                                            onClick={props.onClear}
                                            value='Wyczyść'/>
                            </Col>
                        </>
                    )
                }
 
            </Row>
        </React.Fragment>
    )
}