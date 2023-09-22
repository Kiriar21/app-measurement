import Table from '../../../../Tables/Table/Table'
import Thead from '../../../../Tables/Thead/Thead'
import THeader from '../../../../Tables/THeader/THeader'
import Tbody from '../../../../Tables/Tbody/Tbody'
import TDate from '../../../../Tables/TDate/TDate'
import ButtonLink from '../../../../Buttons/ButtonLink/ButtonLink'
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
                            <TDate>{e.date}</TDate>
                            <TDate>{e.name}</TDate>
                            <TDate>{e.city}</TDate>
                            <TDate>
                                <ButtonLink pathLink={`/${e.id}/scores`} typeTarget='_blank' buttonTitle='Wyniki' ikon={true}/>
                            </TDate>
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
                                alertSuccessContent='Wyniki lokalne zostały zespojone z wynikami w Bazie Danych.'
                            />
                            </TDate>
                        </tr>
                      )
                    })}
            </Tbody>
        </Table>
    )
}

