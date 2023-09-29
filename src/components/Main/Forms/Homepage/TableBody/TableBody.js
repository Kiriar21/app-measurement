import Table from '../../../../Tables/Table/Table'
import Thead from '../../../../Tables/Thead/Thead'
import THeader from '../../../../Tables/THeader/THeader'
import Tbody from '../../../../Tables/Tbody/Tbody'
import TDate from '../../../../Tables/TDate/TDate'
import ButtonLink from '../../../../Buttons/ButtonLink/ButtonLink'
import ModalBasic from '../../../../Modals/ModalBasic/ModalBasic'
import H3Module from '../../../Texts/H3Module/H3Module'
import { Col } from 'react-bootstrap'

export default function TableBody(props){
    return (
        <Table>
            <Thead>
                <tr>
                    {props.theader.map( (th) => {
                        return <THeader key={th} title={th} />
                    })}
                </tr>
            </Thead>
                    { props.tbody.length > 0  
                        ? props.tbody.map( (e) => {
                            return (
                                <Tbody>
                                    <tr key={e.id}>
                                        <TDate>{e.date}</TDate>
                                        <TDate>{e.name}</TDate>
                                        <TDate>{e.city}</TDate>
                                        <TDate>
                                            <ButtonLink pathLink={`/${e.id}/statistic`} buttonTitle='Edytuj'/>
                                        </TDate>
                                        <TDate>
                                        <ModalBasic 
                                            btnModalTitle='Usuń' formAction='/' 
                                            bgColor='red'
                                            modalTitle='Usuwanie Imprezy' 
                                            modalBody='Czy na pewno chcesz usunąć wybraną impreze? Pamiętaj, że usunięcie imprezy w tej aplikacji usunie tylko dane z lokalnej bazy danych i stracisz kopie. Żeby usunąć całkowicie impreze, musisz wejść na aplikacje panelu administratora. '
                                            modalBtnGreen='Usuń' 
                                            modalBtnRed='Anuluj'
                                            alertSuccessContent='Zawody zostały usunięte.'
                                        />
                                        </TDate>
                                    </tr>
                                </Tbody>
                            )
                        })
                        : 
                        <TDate colSpan={5}>
                            <Col lg={12} className='d-flex justify-content-center mt-5'>
                            <H3Module className='bg-transparent' title='Nie wykryto żadnych pomiarów.' />
                        </Col>
                        </TDate>
                    }
        </Table>
    )
}

