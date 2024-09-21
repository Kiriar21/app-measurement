import Table from '../../../../Tables/Table/Table'
import Thead from '../../../../Tables/Thead/Thead'
import THeader from '../../../../Tables/THeader/THeader'
import Tbody from '../../../../Tables/Tbody/Tbody'
import TDate from '../../../../Tables/TDate/TDate'
import ModalBasic from '../../../../Modals/ModalBasic/ModalBasic'
import React, {useRef} from 'react'

export default function TableBody(props){
    const modalRefs = useRef([]);
    
    const renderSortIcon = (field) => {
        if (props.sortField.field === field) {
            return props.sortField.order === 'asc' ? '🔼' : '🔽';
        }
        return ''; 
    };

    return (
        <Table>
            <Thead>
                <tr>
                    {props.theader.map((th, index) => {
                        const isSortable = !['counter','edit', 'delete'].includes(th.field);
                        return (
                            <THeader 
                                key={index} 
                                onClick={isSortable ? () => props.handleSort(th.field) : null}
                                style={isSortable ? { cursor: 'pointer' } : {}}
                                title={`${th.label} ${renderSortIcon(th.field)}`}
                            />
                        );
                    })}
                </tr>
            </Thead>
            <Tbody>
                    { props.tbody.length > 0 ?
                        props.tbody.map( (row, index) => {
                        modalRefs.current[index] = modalRefs.current[index] || React.createRef();
                        return (
                            <tr key={index}>
                                <TDate>{row.counter}</TDate>
                                <TDate>{row.number}</TDate>
                                <TDate>{row.competitor}</TDate>
                                <TDate>{row.gender}</TDate>
                                <TDate>{row.age}</TDate>
                                <TDate>{row.date_of_birth}</TDate>
                                <TDate>{row.classification}</TDate>
                                <TDate>{row.category}</TDate>
                                <TDate>{row.country}</TDate>
                                <TDate>{row.club}</TDate>
                                <TDate>{row.status}</TDate>
                                <TDate>{row.location}</TDate>
                                <TDate>
                                    <ModalBasic 
                                        ref={modalRefs.current[index]}
                                        btnModalTitle='Edytuj'
                                        bgColor='blue'
                                        modalTitle='Edytowanie Zawodnika' 
                                        modalBtnGreen='Zapisz zmiany' 
                                        modalBtnRed='Anuluj'
                                        modalBody={props.modalBody}
                                        onClick={() => props.updateCompetitor(row.number, modalRefs.current[index])}
                                        ownFunctions={true}
                                        onShow={() => props.fetchCompetitorDetails(row.number)}
                                    />
                                </TDate>
                                <TDate>
                                    <ModalBasic 
                                        ref={props.deleteModalRef}
                                        btnModalTitle='Usuń' 
                                        bgColor='red'
                                        modalTitle='Usuwanie Zawodnika' 
                                        modalBody='Czy na pewno chcesz usunąć wybranego zawodnika?'
                                        modalBtnGreen='Usuń' 
                                        modalBtnRed='Anuluj'
                                        onClick={() => props.deleteParticipant(row.number)}
                                        ownFunctions={true}
                                    />
                                </TDate>
                            </tr>
                        )
                        })
                        :
                        <tr >
                        <TDate colSpan={props.theader.length}>{props.status}</TDate>
                        </tr>
                         }
            </Tbody>
        </Table>
    )
}

