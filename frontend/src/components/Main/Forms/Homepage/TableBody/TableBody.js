import Table from '../../../../Tables/Table/Table'
import Thead from '../../../../Tables/Thead/Thead'
import THeader from '../../../../Tables/THeader/THeader'
import Tbody from '../../../../Tables/Tbody/Tbody'
import TDate from '../../../../Tables/TDate/TDate'
import ButtonLink from '../../../../Buttons/ButtonLink/ButtonLink'
import ModalBasic from '../../../../Modals/ModalBasic/ModalBasic'

export default function TableBody(props){

    const renderSortIcon = (field) => {
        if (props.sortField === field) {
            return props.sortOrder === 'asc' ? '🔼' : '🔽';
        }
        return ''; 
    };

    return (
        <Table>
            <Thead>
                <tr style={{"cursor":"pointer"}}>
                    <THeader onClick={() => { props.handleSort('date'); }} title={`Data ${renderSortIcon('date')}`} />
                    <THeader onClick={() => { props.handleSort('name'); }} title={`Nazwa ${renderSortIcon('name')}`} />
                    <THeader onClick={() => { props.handleSort('localization'); }} title={`Miejscowość ${renderSortIcon('localization')}`} />
                    <THeader title="Edytuj" />
                    <THeader title="Usuń" />
                </tr>
            </Thead>
            <Tbody>
                    { props.tbody.length > 0 ? 
                        props.tbody.map( (e, index) => {
                      return (
                        <tr key={index}>
                            <TDate>{e.date}</TDate>
                            <TDate>{e.name}</TDate>
                            <TDate>{e.city}</TDate>
                            <TDate>
                                <ButtonLink pathLink={`/${e.id}/statistic`} buttonTitle='Edytuj'/>
                            </TDate>
                            <TDate>
                            <ModalBasic 
                                btnModalTitle='Usuń' formAction="" 
                                bgColor='red'
                                modalTitle='Usuwanie Imprezy' 
                                modalBody='Czy na pewno chcesz usunąć wybraną impreze? Pamiętaj, że usunięcie imprezy w tej aplikacji usunie tylko dane z lokalnej bazy danych i stracisz kopie. Żeby usunąć całkowicie impreze, musisz wejść na aplikacje panelu administratora. '
                                modalBtnGreen='Usuń' 
                                modalBtnRed='Anuluj'
                                alertSuccessContent='Zawody zostały usunięte.'
                                alertDisplay={true}
                                eventId={e.id}
                                fetchEvents={props.fetchEvents}
                                displayBigAlert="Pomyślnie usunięto bieg. Za chwile zostanie odświeżona strona."
                            />
                            </TDate>
                        </tr>
                      )
                    })
                    : 
                    <tr >
                        <TDate colSpan={props.theader.length}>Nie znaleziono żadnych pomiarów.</TDate>
                    </tr>}
            </Tbody>
        </Table>
    )
}

