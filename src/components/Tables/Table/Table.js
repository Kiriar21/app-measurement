import {Table} from 'react-bootstrap'

export default function TableBody(props){
    return (
        <Table responsive striped hover variant='dark'>
            {props.children}
        </Table>
    )
}