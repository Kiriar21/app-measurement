import {Col, Stack} from 'react-bootstrap'

export default function Column(props) {
    return (
        <Col lg={parseInt(props.width)} className='text-center pb-3'>
            <Stack>
               {props.children}
            </Stack>
        </Col>
    )
}