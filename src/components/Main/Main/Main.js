import { Container } from 'react-bootstrap'
export default function Main(props){
    return(
        <Container fluid className='my-4'>
            {props.children}
        </Container>
    )
}