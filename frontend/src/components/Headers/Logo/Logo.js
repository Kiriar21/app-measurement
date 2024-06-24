import { Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import style from './Logo.module.css'

export default function Logo(){
    return(
            <Col className='d-flex py-4 px-5 justify-content-center'>
                <h1>
                    <Link to="/" className={`${style.link}`}>
                        Nazwa Firmy
                    </Link>
                </h1>
            </Col>
    )
}