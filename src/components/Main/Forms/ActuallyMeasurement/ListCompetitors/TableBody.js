import Table from '../../../../Tables/Table/Table'
import Thead from '../../../../Tables/Thead/Thead'
import THeader from '../../../../Tables/THeader/THeader'
import Tbody from '../../../../Tables/Tbody/Tbody'
import TDate from '../../../../Tables/TDate/TDate'
import ModalBasic from '../../../../Modals/ModalBasic/ModalBasic'

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
            <Tbody>
                    {props.tbody.map( (e) => {
                      return (
                        <tr key={e.id}>
                            <TDate>{e.counter}</TDate>
                            <TDate>{e.id}</TDate>
                            <TDate>{e.names}</TDate>
                            <TDate>{e.sex}</TDate>
                            <TDate>{e.age}</TDate>
                            <TDate>{e.datebirth}</TDate>
                            <TDate>{e.class}</TDate>
                            <TDate>{e.cat}</TDate>
                            <TDate>{e.country}</TDate>
                            <TDate>{e.club}</TDate>
                            <TDate>{e.participant}</TDate>
                            <TDate>{e.city}</TDate>
                            <TDate>
                            <ModalBasic 
                                btnModalTitle='Usuń' formAction='/:id/del' 
                                bgColor='red'
                                modalTitle='Usuwanie Zawodnika' 
                                modalBody='Czy na pewno chcesz usunąć wybranego zawodnika?'
                                modalBtnGreen='Usuń' 
                                modalBtnRed='Anuluj'
                                alertSuccessContent='Zawodnika został usunięty.'
                            />
                            </TDate>
                        </tr>
                      )
                    })}
            </Tbody>
        </Table>
    )
}

